// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import {SafeERC20} from "../libraries/SafeERC20.sol";
import {UniERC20, IERC20} from "../libraries/UniERC20.sol";

struct SwapDescription {
    IERC20 srcToken;
    IERC20 dstToken;
    address payable srcReceiver;
    address payable dstReceiver;
    uint256 amount;
    uint256 minReturnAmount;
    uint256 flags;
}

interface IAggregationExecutor { 
    /// @notice propagates information about original msg.sender and executes arbitrary data 
    function execute(address msgSender) external payable;  // 0x4b64e492 
}

interface IGenericRouter {

    function swap(
        IAggregationExecutor executor,
        SwapDescription calldata desc,
        bytes calldata permit,
        bytes calldata data
    ) external payable returns (uint256 returnAmount, uint256 spentAmount);
}