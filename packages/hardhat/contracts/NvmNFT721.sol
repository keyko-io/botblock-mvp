// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;


import "../node_modules/@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "../node_modules/@openzeppelin/contracts/access/Ownable.sol";

import "./INvmNFT721.sol";

contract NvmNFT721 is INvmNFT721, ERC721 {

    uint256 expirationBlock;
	address owner;

	 modifier onlyOwner() {
        require(
            msg.sender == owner,
            "Only the marketplace owner can call this function"
        );
        _;
    }


    constructor(address _botblockMarket)  ERC721("NFT721SubscriptionUpgradeable", "NVMSub"){
		owner = _botblockMarket;
	}
    function mint(address to, uint256 tokenId, uint256 _expirationBlock) external onlyOwner  {
        expirationBlock = _expirationBlock;
        _mint(to, tokenId);
    }
}
