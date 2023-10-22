// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "../node_modules/@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "./INvmNFT721.sol";

contract NvmNFT721Mock is ERC721, INvmNFT721 {
	constructor() ERC721("MockNvmNFT721", "MOCKNFT") {}
    mapping(uint256 => uint256) public idToExpiration;

	function mint(
		address to,
		uint256 tokenId,
		uint256 expirationBlock
	) external override{
        _mint(to, tokenId);
        idToExpiration[tokenId] = expirationBlock;
    }
}
