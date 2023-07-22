// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import {IHasher} from "../MerkleTree.sol";


contract MockHasher is IHasher {
    function hash(uint256 xL, uint256 xR) external override pure returns (uint256 xO) {
        return xL / 17 * 7 + xR / 37 * 17;
    }
}