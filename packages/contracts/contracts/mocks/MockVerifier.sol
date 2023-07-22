// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import {
    IDepositVerifier,
    IWithdrawVerifier,
    ISwapVerifier,
    IFinalizeVerifier
} from "../IVerifier.sol";

contract DepositVerifier is IDepositVerifier {
    function verify(
        uint256[5] calldata _publicInputs,
        bytes calldata _proof
    ) override view public returns(bool) {
        return true;
    }
}

contract WithdrawVerifier is IWithdrawVerifier {
    function verify(
        uint256[5] calldata _publicInputs,
        bytes calldata _proof
    ) override view public returns(bool) {
        return true;
    }
}

contract SwapVerifier is ISwapVerifier {
    function verify(
        uint256[4] calldata _publicInputs,
        bytes calldata _proof
    ) override view public returns(bool) {
        return true;
    }
}

contract FinalizeVerifier is IFinalizeVerifier {
    function verify(
        uint256[3] calldata _publicInputs,
        bytes calldata _proof
    ) override view public returns(bool) {
        return true;
    }
}