// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MonadInvadersPipelineChest is ERC721URIStorage, Ownable {
    uint256 public tokenCounter;
    string public baseTokenURI;

   constructor(string memory _baseTokenURI) 
        ERC721("Monad Invaders Pipeline Chest", "1NFT") 
        Ownable(msg.sender)  
    {
        tokenCounter = 0;
        baseTokenURI = _baseTokenURI;
    }

    function mint(uint256 amount) public {
        require(amount > 0, "You must mint at least 1 NFT.");

        for (uint256 i = 0; i < amount; i++) {
            uint256 newTokenId = tokenCounter;
            _safeMint(msg.sender, newTokenId);
            _setTokenURI(newTokenId, baseTokenURI);
            tokenCounter++;
        }
    }

    function setBaseTokenURI(string memory _baseTokenURI) external onlyOwner {
        baseTokenURI = _baseTokenURI;
    }
}
