// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

interface IDepositVerifier {
    function verify(
        uint256[3] calldata _publicInputs,
        bytes calldata _proof
    ) external view returns (bool);
}

interface IWithdrawVerifier {
    function verify(
        uint256[3] calldata _publicInputs,
        bytes calldata _proof
    ) external view returns (bool);
}

interface ISwapVerifier {
    function verify(
        uint256[4] calldata _publicInputs,
        bytes calldata _proof
    ) external view returns (bool);
}

interface IFinalizeVerifier {
    function verify(
        uint256[3] calldata _publicInputs,
        bytes calldata _proof
    ) external view returns (bool);
}
