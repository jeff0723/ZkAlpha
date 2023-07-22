// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import {ERC20} from "solmate/tokens/ERC20.sol";

contract MockUSDC is ERC20 {
    constructor() ERC20("Mock USDC", "mUSDC", 6) {}
}

contract MockWETH is ERC20 {
    constructor() ERC20("Mock WETH", "mWETH", 18) {}
}