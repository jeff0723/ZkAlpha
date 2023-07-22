// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import {MerkleTree, IHasher} from "./MerkleTree.sol";
import {ERC20} from "solmate/tokens/ERC20.sol";
import {Vault} from "./Vault.sol";
import {
    IDepositVerifier,
    IWithdrawVerifier,
    ISwapVerifier,
    IFinalizeVerifier
} from "./IVerifier.sol";

struct ModelOutput {
    uint8 direction;
    uint248 amount;
}

struct ModelInput {
    uint256 chainlinkPrice;
}

contract Relayer is MerkleTree {
    
    ERC20 immutable public TOKEN;
    IDepositVerifier public depositVerifier;
    IWithdrawVerifier public withdrawVerifier;
    ISwapVerifier public swapVerifier;
    IFinalizeVerifier public finalizeVerifier;
    ModelInput public modelInput;
    mapping(bytes => Vault) public vaultMap;

    mapping(bytes32 => bool) public nullifierHashes;
    mapping(bytes32 => bool) public commitments;

    constructor(
        ERC20 _token,
        IDepositVerifier _depositVerifier,
        IWithdrawVerifier _withdrawVerifier,
        ISwapVerifier _swapVerifier,
        IFinalizeVerifier _finalizeVerifier,
        IHasher _hasher,
        uint32 _merkleTreeHeight
    ) MerkleTree(_merkleTreeHeight, _hasher) {
        TOKEN = _token;
        depositVerifier = _depositVerifier;
        withdrawVerifier = _withdrawVerifier;
        swapVerifier = _swapVerifier;
        finalizeVerifier = _finalizeVerifier;
    }

    function deposit() public {

    }

    function withdraw() public {

    }

    function finalize() public {

    }

    function transact(
        bytes calldata _proof,
        bytes32 _nullifier,
        ModelOutput calldata modelOutput
    ) public {
        // uint256[] _publicInputs = new uint256[](4);
        // _publicInputs[0] = roots[0];
        // _publicInputs[1] = uint256(_nullifier);

        // require(
        //     swapVerifier.verify(_publicInputs, _proof),
        //     "Swap Verifier failed"
        // );
    }
}
