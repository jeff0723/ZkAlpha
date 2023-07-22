// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import {MerkleTree, IHasher} from "./MerkleTree.sol";
import {ERC20} from "solmate/tokens/ERC20.sol";
import {Vault} from "./Vault.sol";
import {IDepositVerifier, IWithdrawVerifier, ISwapVerifier, IFinalizeVerifier} from "./IVerifier.sol";

struct ModelOutput {
    uint8 direction;
    uint248 amount;
}

struct ModelInput {
    uint256 chainlinkPrice;
}

enum NodeStatus {
    EMPTY,
    TRANSACTED,
    NULLIFIED
}

struct TxResult {
    uint8 direction;
    uint120 amountA;
    uint120 amountB;
}

contract Relayer is MerkleTree {
    
    ERC20 immutable public TOKEN_A;
    ERC20 immutable public TOKEN_B;
    IDepositVerifier public depositVerifier;
    IWithdrawVerifier public withdrawVerifier;
    ISwapVerifier public swapVerifier;
    IFinalizeVerifier public finalizeVerifier;
    ModelInput public modelInput;
    mapping(bytes32 => NodeStatus) public nodeStatusPool;
    mapping(bytes32 => TxResult) public transactionResults;

    constructor(
        ERC20 _tokenA,
        ERC20 _tokenB,
        IDepositVerifier _depositVerifier,
        IWithdrawVerifier _withdrawVerifier,
        ISwapVerifier _swapVerifier,
        IFinalizeVerifier _finalizeVerifier,
        IHasher _hasher
    ) MerkleTree(32, _hasher) {
        TOKEN_A = _tokenA;
        TOKEN_B = _tokenB;
        depositVerifier = _depositVerifier;
        withdrawVerifier = _withdrawVerifier;
        swapVerifier = _swapVerifier;
        finalizeVerifier = _finalizeVerifier;
    }

    function deposit(
        bytes32 _cNode,
        uint256 _balanceA,
        uint256 _balanceB,
        address _vault,
        bytes calldata _proof
    ) public returns (uint32) {
        uint256[5] memory _publicInputs;
        _publicInputs[0] = uint256(_cNode);
        _publicInputs[1] = uint256(Vault(_vault).cModel());
        _publicInputs[2] = uint256(_balanceA);
        _publicInputs[3] = uint256(_balanceB);
        _publicInputs[4] = uint256(uint160(_vault));
        require(msg.sender == _vault, "not trader");
        require(
            depositVerifier.verify(_publicInputs, _proof),
            "deposit: verify failed"
        );

        TOKEN_A.transferFrom(_vault, address(this), _balanceA);
        TOKEN_B.transferFrom(_vault, address(this), _balanceB);

        return MerkleTree._insert(_cNode);
    }

    function withdraw(
        bytes32 _nullifier,
        uint256 _balanceA,
        uint256 _balanceB,
        address _vault,
        bytes calldata _proof
    ) public {
        uint256[5] memory _publicInputs;
        _publicInputs[0] = uint256(root);
        _publicInputs[1] = uint256(_nullifier);
        _publicInputs[2] = uint256(_balanceA);
        _publicInputs[3] = uint256(_balanceB);
        _publicInputs[4] = uint256(uint160(_vault));
        require(msg.sender == _vault, "not trader");
        require(
            withdrawVerifier.verify(_publicInputs, _proof),
            "withdraw: verify failed"
        );

        TOKEN_A.transferFrom(address(this), _vault, _balanceA);
        TOKEN_B.transferFrom(address(this), _vault, _balanceB);

        nodeStatusPool[_nullifier] = NodeStatus.NULLIFIED;
    }

    function transact(
        bytes32 _nullifier,
        ModelOutput calldata modelOutput,
        bytes calldata _proof
    ) public {
        uint256[4] memory _publicInputs;
        _publicInputs[0] = uint256(MerkleTree.root);
        _publicInputs[1] = uint256(_nullifier);
        _publicInputs[2] = modelInput.chainlinkPrice;
        _publicInputs[3] = uint256(bytes32(abi.encodePacked(modelOutput.direction, modelOutput.amount)));
        require(
            swapVerifier.verify(_publicInputs, _proof),
            "transact: verify failed"
        );

        // TODO transactionResults[_nullifier] = _transact(modelOutput);
        transactionResults[_nullifier] = TxResult(0, 0, 0);
        nodeStatusPool[_nullifier] = NodeStatus.TRANSACTED;
    }

    function finalize(
        bytes32 _nullifier,
        bytes32 _cNode2,
        bytes calldata _proof
    ) public {
        uint256[3] memory _publicInputs;
        _publicInputs[0] = uint256(MerkleTree.root);
        _publicInputs[1] = uint256(_nullifier);
        _publicInputs[2] = uint256(_cNode2);
        require(
            finalizeVerifier.verify(_publicInputs, _proof),
            "finalize: verify failed"
        );
        
        MerkleTree._insert(_cNode2);
        delete transactionResults[_nullifier];
        nodeStatusPool[_nullifier] = NodeStatus.NULLIFIED;
    }
}
