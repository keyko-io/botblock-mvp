// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "../node_modules/@openzeppelin/contracts/token/ERC721/IERC721.sol";

interface INvmNFT721 is IERC721{
    function mint(address to, uint256 tokenId, uint256 expirationBlock) external;

    function setNFTMetadata(uint256 tokenId, string memory nftURI ) external;

    function setTokenRoyalty(uint256 tokenId, address receiver, uint256 royaltyAmount) external;
    
}