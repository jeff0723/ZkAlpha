// SPDX-License-Identifier: AGPL-3.0-only
pragma solidity >=0.8.0;

import {ERC20} from "solmate/tokens/ERC20.sol";
import {ERC4626} from "solmate/mixins/ERC4626.sol";
import {SafeTransferLib} from "solmate/utils/SafeTransferLib.sol";
import {FixedPointMathLib} from "solmate/utils/FixedPointMathLib.sol";

/// @notice Minimal ERC4626 tokenized Vault implementation.
/// @author Solmate (https://github.com/transmissions11/solmate/blob/main/src/mixins/ERC4626.sol)
contract Vault is ERC4626 {
    using SafeTransferLib for ERC20;
    using FixedPointMathLib for uint256;

    /*//////////////////////////////////////////////////////////////
                            EVENTS and Errors
    //////////////////////////////////////////////////////////////*/

    event StrategistWithdraw(
        address indexed relayer,
        address indexed strategist,
        uint blocknumber,
        uint blocktime
    );

    error NotStrategist();

    error VaultClosedNoDeposit();

    error VaultClosedNoWithdrawal();

    error VaultOpen();

    error WrongStatus();

    /*//////////////////////////////////////////////////////////////
                               IMMUTABLES
    //////////////////////////////////////////////////////////////*/

    address public immutable strategist;

    address public immutable relayer;

    uint public immutable openDuration;

    uint public strategyDuration;

    uint public withdrawalDuration;

    uint public currentBlockTime;

    VaultStatus status;

    /**
     * Stage 1 = can deposit, can withdraw, strageist cannot withdraw
     * Stage 2 = cannot deposit, cannot withdraw, strategist can withdraw
     * Stage 3 = cannot deposit, can withdraw, strategist cannot withdraw
     */
    enum VaultStatus {
        Stage1,
        Stage2,
        Stage3
    }

    constructor(
        ERC20 _asset,
        string memory _name,
        string memory _symbol,
        address _strategist,
        address _relayer,
        uint _openDuration,
        uint _strategyDuration,
        uint _withdrawalDuration
    ) ERC4626(_asset, _name, _symbol) {
        strategist = _strategist;
        status = VaultStatus.Stage1;
        relayer = _relayer;
        currentBlockTime = block.timestamp;
        openDuration = _openDuration;
        strategyDuration = _strategyDuration;
        withdrawalDuration = _withdrawalDuration;
    }

    /*//////////////////////////////////////////////////////////////
                        DEPOSIT/WITHDRAWAL LOGIC
    //////////////////////////////////////////////////////////////*/

    function deposit(
        uint256 assets,
        address receiver
    ) public override returns (uint256 shares) {
        if (status != VaultStatus.Stage1) {
            revert VaultClosedNoDeposit();
        }
        // Check for rounding error since we round down in previewDeposit.
        require((shares = previewDeposit(assets)) != 0, "ZERO_SHARES");

        // Need to transfer before minting or ERC777s could reenter.
        asset.safeTransferFrom(msg.sender, address(this), assets);

        _mint(receiver, shares);

        emit Deposit(msg.sender, receiver, assets, shares);

        afterDeposit(assets, shares);
    }

    function withdraw(
        uint256 assets,
        address receiver,
        address owner
    ) public override returns (uint256 shares) {
        if (status != VaultStatus.Stage1 || status != VaultStatus.Stage1) {
            revert VaultClosedNoWithdrawal();
        }
        shares = previewWithdraw(assets); // No need to check for rounding error, previewWithdraw rounds up.

        if (msg.sender != owner) {
            uint256 allowed = allowance[owner][msg.sender]; // Saves gas for limited approvals.

            if (allowed != type(uint256).max)
                allowance[owner][msg.sender] = allowed - shares;
        }

        beforeWithdraw(assets, shares);

        _burn(owner, shares);

        emit Withdraw(msg.sender, receiver, owner, assets, shares);

        asset.safeTransfer(receiver, assets);
    }

    function redeem(
        uint256 shares,
        address receiver,
        address owner
    ) public override returns (uint256 assets) {
        if (status != VaultStatus.Stage1 || status != VaultStatus.Stage1) {
            revert VaultClosedNoWithdrawal();
        }

        if (msg.sender != owner) {
            uint256 allowed = allowance[owner][msg.sender]; // Saves gas for limited approvals.

            if (allowed != type(uint256).max)
                allowance[owner][msg.sender] = allowed - shares;
        }

        // Check for rounding error since we round down in previewRedeem.
        require((assets = previewRedeem(shares)) != 0, "ZERO_ASSETS");

        beforeWithdraw(assets, shares);

        _burn(owner, shares);

        emit Withdraw(msg.sender, receiver, owner, assets, shares);

        asset.safeTransfer(receiver, assets);
    }

    function withdrawStrategist() public {
        if (msg.sender != strategist) {
            revert NotStrategist();
        }
        if (status != VaultStatus.Stage2) {
            revert VaultOpen();
        }
        emit StrategistWithdraw(
            relayer,
            msg.sender,
            block.number,
            block.timestamp
        );

        asset.safeTransfer(relayer, address(this).balance);
    }

    /*//////////////////////////////////////////////////////////////
                            ACCOUNTING LOGIC
    //////////////////////////////////////////////////////////////*/

    /// !!! pls review
    function totalAssets() public view override returns (uint256) {
        return address(this).balance;
    }

    /*//////////////////////////////////////////////////////////////
                           Status Transition
    //////////////////////////////////////////////////////////////*/

    function closeVault() public {
        if (msg.sender != strategist) {
            revert NotStrategist();
        }
        if (block.timestamp < currentBlockTime + openDuration) {
            revert VaultOpen();
        }

        if (status != VaultStatus.Stage1) {
            revert WrongStatus();
        }

        status = VaultStatus.Stage2;
        currentBlockTime = block.timestamp;
    }

    function terminateStrategy() public {
        if (msg.sender != strategist) {
            revert NotStrategist();
        }
        if (block.timestamp < currentBlockTime + strategyDuration) {
            revert WrongStatus();
        }
        if (status != VaultStatus.Stage2) {
            revert WrongStatus();
        }

        status = VaultStatus.Stage3;
        currentBlockTime = block.timestamp;
    }

    function openVault() public {
        if (msg.sender != strategist) {
            revert NotStrategist();
        }
        if (block.timestamp < currentBlockTime + withdrawalDuration) {
            revert WrongStatus();
        }
        if (status != VaultStatus.Stage3) {
            revert WrongStatus();
        }

        status = VaultStatus.Stage1;
        currentBlockTime = block.timestamp;
    }

    /*//////////////////////////////////////////////////////////////
                          INTERNAL HOOKS LOGIC
    //////////////////////////////////////////////////////////////*/

    // function beforeWithdraw(uint256 assets, uint256 shares) internal virtual {}

    // function afterDeposit(uint256 assets, uint256 shares) internal virtual {}
}
