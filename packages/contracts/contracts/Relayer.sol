// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import {MerkleTreeWithHistory, IHasher} from "./MerkleTreeWithHistory.sol";
import {ERC20} from "solmate/tokens/ERC20.sol";
import {Verifier} from "./Verifier.sol";
import {Vault} from "./Vault.sol";

contract Relayer is MerkleTreeWithHistory {
    
    ERC20 immutable public TOKEN;
    Verifier public verifier;
    mapping(bytes => Vault) public vaultMap;

    constructor(
        ERC20 _token,
        Verifier _verifier,
        IHasher _hasher,
        uint32 _merkleTreeHeight
    ) MerkleTreeWithHistory(_merkleTreeHeight, _hasher) {
        TOKEN = _token;
        verifier = _verifier;
    }
}