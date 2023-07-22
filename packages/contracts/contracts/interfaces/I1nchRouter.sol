// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "../libraries/SafeERC20.sol";
import "../libraries/UniERC20.sol";

interface IGenericRouter {
    using UniERC20 for IERC20;
    using SafeERC20 for IERC20;

    struct SwapDescription {
        IERC20 srcToken;
        IERC20 dstToken;
        address payable srcReceiver;
        address payable dstReceiver;
        uint256 amount;
        uint256 minReturnAmount;
        uint256 flags;
    }
      function swap(
        IAggregationExecutor executor,
        SwapDescription calldata desc,
        bytes calldata permit,
        bytes calldata data
    )
        external
        payable
        returns (
            uint256 returnAmount,
            uint256 spentAmount
        )
}