// SPDX-License-Identifier: MIT
pragma solidity =0.6.6;

import "../MoonbaPair.sol";

contract ERC20 is MoonbaPair {
    constructor(uint256 _totalSupply) public {
        _mint(msg.sender, _totalSupply);
    }
}
