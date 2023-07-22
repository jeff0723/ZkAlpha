// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import {MerkleTreeWithHistory, IHasher} from "./MerkleTreeWithHistory.sol";
import {ERC20} from "solmate/tokens/ERC20.sol";
import {Verifier} from "./Verifier.sol";
import {Vault} from "./Vault.sol";

contract Relayer is MerkleTreeWithHistory {
    ERC20 public immutable TOKEN;
    Verifier public verifier;
    mapping(bytes => Vault) public vaultMap;

    mapping(bytes32 => bool) public nullifierHashes;
    mapping(bytes32 => bool) public commitments;

    constructor(
        ERC20 _token,
        Verifier _verifier,
        IHasher _hasher,
        uint32 _merkleTreeHeight
    ) MerkleTreeWithHistory(_merkleTreeHeight, _hasher) {
        TOKEN = _token;
        verifier = _verifier;
    }

    /*//////////////////////////////////////////////////////////////
                               Depositing 
    //////////////////////////////////////////////////////////////*/

    function deposit(bytes32 _commitment) external payable nonReentrant {
        require(!commitments[_commitment], "The commitment has been submitted");

        uint32 insertedIndex = _insert(_commitment);
        commitments[_commitment] = true;
        _processDeposit();

        emit Deposit(_commitment, insertedIndex, block.timestamp);
    }

    /*//////////////////////////////////////////////////////////////
                            EVENTS and Errors
    //////////////////////////////////////////////////////////////*/

    /*//////////////////////////////////////////////////////////////
                            EVENTS and Errors
    //////////////////////////////////////////////////////////////*/

    /*//////////////////////////////////////////////////////////////
                            EVENTS and Errors
    //////////////////////////////////////////////////////////////*/
}
