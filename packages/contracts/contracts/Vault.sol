// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;
import {ERC20} from "solmate/tokens/ERC20.sol";
import {Owned} from "solmate/auth/Owned.sol";

interface IRelayer {
    function deposit(
        bytes32 _cNode,
        uint256 _balanceA,
        uint256 _balanceB,
        address _vault,
        bytes calldata _proof
    ) external returns (uint32);

    function withdraw(
        bytes32 _nullifier,
        uint256 _balanceA,
        uint256 _balanceB,
        address _vault,
        bytes calldata _proof
    ) external;

    function TOKEN_A() external returns (ERC20);
    function TOKEN_B() external returns (ERC20);
}

enum VaultState {
    DEPOSIT,
    WAITING,
    WITHDRAW
}

contract Vault is Owned {
    
    IRelayer immutable public relayer;
    bytes32 public cModel;
    mapping(address => uint256) public userWeights;
    uint256 public totalWeights;
    uint256 public afterBalance;
    VaultState public state;

    constructor(
        IRelayer _relayer,
        address _trader,
        bytes32 _cModel
    ) Owned(_trader) {
        relayer = _relayer;
        cModel = _cModel;
        relayer.TOKEN_A().approve(address(relayer), type(uint256).max);
        relayer.TOKEN_B().approve(address(relayer), type(uint256).max);
    }

    modifier requireState(VaultState _state) {
        require(state == _state, "Invalid Vault state");
        _;
    }

    function userDeposit(uint256 amount) public requireState(VaultState.DEPOSIT) {
        relayer.TOKEN_A().transferFrom(msg.sender, address(this), amount);
        userWeights[msg.sender] += amount;
        totalWeights += amount;
    }

    function depositToRelayer(
        bytes32 _cNode,
        bytes calldata _proof
    ) public requireState(VaultState.DEPOSIT) onlyOwner {
        // TODO swap A to B and make 50 50
        uint256 balanceA = relayer.TOKEN_A().balanceOf(address(this));
        uint256 balanceB = relayer.TOKEN_B().balanceOf(address(this));
        relayer.deposit(_cNode, balanceA, balanceB, address(this), _proof);
        state = VaultState.WAITING;
    }

    function withdrawFromRelayer(
        bytes32 _nullifier,
        uint256 _balanceA,
        uint256 _balanceB,
        bytes calldata _proof
    ) public requireState(VaultState.WAITING) onlyOwner {
        relayer.withdraw(_nullifier, _balanceA, _balanceB, address(this), _proof);
        // TODO swap B to A
        afterBalance = relayer.TOKEN_A().balanceOf(address(this));
        state = VaultState.WITHDRAW;
    }

    function userWithdraw(address to) public requireState(VaultState.WITHDRAW) {       
        uint256 amount = afterBalance * userWeights[to] / totalWeights;
        relayer.TOKEN_A().transferFrom(address(this), to, amount);
    }
}