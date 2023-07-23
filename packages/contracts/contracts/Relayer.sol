// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import {MerkleTree, IHasher} from "./MerkleTree.sol";
import {ERC20} from "solmate/tokens/ERC20.sol";
import {Vault, IRelayer} from "./Vault.sol";
import {IDepositVerifier, IWithdrawVerifier, ISwapVerifier, IFinalizeVerifier} from "./IVerifier.sol";
import {IGenericRouter, IAggregationExecutor, SwapDescription} from "./interfaces/I1nchRouter.sol";
import {IERC20} from "./libraries/UniERC20.sol";

enum NodeStatus {
    EMPTY,
    TRANSACTED,
    NULLIFIED
}

enum SwapDirection {
    A2B,
    B2A
}

struct ModelOutput {
    SwapDirection direction;
    uint248 amount;
}

struct ModelInput {
    uint256 chainlinkPrice;
}

struct TxResult {
    SwapDirection direction;
    uint120 amountA;
    uint120 amountB;
}

contract Relayer is IRelayer, MerkleTree {
    
    ERC20 immutable public TOKEN_A;
    ERC20 immutable public TOKEN_B;
    IDepositVerifier public depositVerifier;
    IWithdrawVerifier public withdrawVerifier;
    ISwapVerifier public swapVerifier;
    IFinalizeVerifier public finalizeVerifier;
    IGenericRouter public genericRouter;
    IAggregationExecutor public genericExecutor;
    ModelInput public modelInput;
    mapping(bytes32 => NodeStatus) public nodeStatusPool;
    mapping(bytes32 => TxResult) public transactionResults;

    event UploadModel(
        address indexed relayer,
        address indexed trader,
        address vault,
        bytes32 modelCommitment
    );

    constructor(
        ERC20 _tokenA,
        ERC20 _tokenB,
        IDepositVerifier _depositVerifier,
        IWithdrawVerifier _withdrawVerifier,
        ISwapVerifier _swapVerifier,
        IFinalizeVerifier _finalizeVerifier,
        IHasher _hasher,
        IGenericRouter _genericRouter,
        IAggregationExecutor _genericExecutor
    ) MerkleTree(8, _hasher) {
        TOKEN_A = _tokenA;
        TOKEN_B = _tokenB;
        depositVerifier = _depositVerifier;
        withdrawVerifier = _withdrawVerifier;
        swapVerifier = _swapVerifier;
        finalizeVerifier = _finalizeVerifier;
        genericRouter = _genericRouter;
        genericExecutor = _genericExecutor;
    }

    function deposit(
        bytes32 _cNode,
        uint256 _balanceA,
        uint256 _balanceB,
        address _vault,
        bytes calldata _proof
    ) public override returns (uint32) {
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
    ) public override {
        uint256[5] memory _publicInputs;
        _publicInputs[0] = uint256(root);
        _publicInputs[1] = uint256(_nullifier);
        _publicInputs[2] = uint256(_balanceA);
        _publicInputs[3] = uint256(_balanceB);
        _publicInputs[4] = uint256(uint160(_vault));
        require(msg.sender == _vault, "not trader");
        require(
            nodeStatusPool[_nullifier] == NodeStatus.TRANSACTED,
            "transact: invalid node state"
        );
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
        bytes calldata _proof,
        bytes calldata _1inchV5Data
    ) public {
        uint256[4] memory _publicInputs;
        _publicInputs[0] = uint256(MerkleTree.root);
        _publicInputs[1] = uint256(_nullifier);
        _publicInputs[2] = modelInput.chainlinkPrice;
        _publicInputs[3] = uint256(bytes32(abi.encodePacked(modelOutput.direction, modelOutput.amount)));
        require(
            nodeStatusPool[_nullifier] == NodeStatus.EMPTY,
            "transact: invalid node state"
        );
        require(
            swapVerifier.verify(_publicInputs, _proof),
            "transact: verify failed"
        );
        
        transactionResults[_nullifier] = _transact(modelOutput, _1inchV5Data);
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
            nodeStatusPool[_nullifier] == NodeStatus.TRANSACTED,
            "transact: invalid node state"
        );
        require(
            finalizeVerifier.verify(_publicInputs, _proof),
            "finalize: verify failed"
        );
        
        MerkleTree._insert(_cNode2);
        delete transactionResults[_nullifier];
        nodeStatusPool[_nullifier] = NodeStatus.NULLIFIED;
    }

    function uploadModel(bytes32 _cModel) public returns(Vault) {
        Vault vault = new Vault(IRelayer(address(this)), msg.sender, _cModel);
        emit UploadModel(address(this), msg.sender, address(vault), _cModel);
        return vault;
    }

    function _transact(
        ModelOutput calldata _mOutput,
        bytes calldata _1inchV5Data
    ) private returns(TxResult memory txResult) {
        SwapDescription memory _desc;
        if (_mOutput.direction == SwapDirection.A2B) {
            _desc.srcToken = IERC20(address(TOKEN_A));
            _desc.dstToken = IERC20(address(TOKEN_B));
        } else {
            _desc.srcToken = IERC20(address(TOKEN_B));
            _desc.dstToken = IERC20(address(TOKEN_A));            
        }
        _desc.srcReceiver = payable(address(this));
        _desc.dstReceiver = payable(address(this));
        _desc.amount = _mOutput.amount;
        _desc.minReturnAmount = 0;
        _desc.flags = 4;

        (uint256 returnAmount, uint256 spentAmount) = genericRouter.swap(
            genericExecutor, _desc, abi.encodePacked(), _1inchV5Data
        );
        txResult.direction = _mOutput.direction;
        if (_mOutput.direction == SwapDirection.A2B) {
            txResult.amountA = uint120(spentAmount);
            txResult.amountB = uint120(returnAmount);
        } else {
            txResult.amountB = uint120(spentAmount);
            txResult.amountA = uint120(returnAmount); 
        }
    }
}
