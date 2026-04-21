// SPDX-License-Identifier: MIT
pragma solidity 0.8.22;

import { ERC20 } from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import { IMintBurnVoidReturn } from "../interfaces/IMintBurnVoidReturn.sol";

// @dev THIS IS A MOCK TOKEN FOR TESTING PURPOSES
contract MockERC20MintableBurnable is ERC20, IMintBurnVoidReturn {
    uint8 private immutable _decimals;

    constructor(
        string memory name_,
        string memory symbol_,
        uint8 decimals_,
        uint256 initialSupply
    ) ERC20(name_, symbol_) {
        _decimals = decimals_;

        if (initialSupply > 0) {
            _mint(msg.sender, initialSupply);
        }
    }

    function decimals() public view virtual override returns (uint8) {
        return _decimals;
    }

    function mint(address to, uint256 amount) external override {
        _mint(to, amount);
    }

    function burnFrom(address from, uint256 amount) external override {
        _spendAllowance(from, msg.sender, amount);
        _burn(from, amount);
    }
}
