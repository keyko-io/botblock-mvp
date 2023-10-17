// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "../node_modules/@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "../node_modules/@openzeppelin/contracts/access/Ownable.sol";

contract TestToken is ERC20, Ownable {
    constructor() ERC20("TestToken", "TEST") {}

    function mint(address account, uint256 amount) external onlyOwner {
        _mint(account, amount);
    }

    function getBalance(address account) external view returns (uint256) {
        return balanceOf(account);
    }
}