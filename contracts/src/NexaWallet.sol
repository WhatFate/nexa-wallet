// SPDX-License-Identifier: MIT
pragma solidity 0.8.30;

import {IEntryPoint} from "@account-abstraction/contracts/interfaces/IEntryPoint.sol";
import {BaseAccount} from "@account-abstraction/contracts/core/BaseAccount.sol";
import {ECDSA} from "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import {PackedUserOperation} from "@account-abstraction/contracts/interfaces/PackedUserOperation.sol";
import {SIG_VALIDATION_FAILED, SIG_VALIDATION_SUCCESS} from "@account-abstraction/contracts/core/Helpers.sol";

contract NexaWallet is BaseAccount {
    address public owner;
    IEntryPoint private immutable i_entryPoint;

    constructor(address entryPoint) {
        i_entryPoint = IEntryPoint(entryPoint);
    }

    function initialize(address _owner) external {
        require(owner == address(0), "Already initialized");
        owner = _owner;
    }

    function entryPoint() public view override returns (IEntryPoint) {
        return i_entryPoint;
    }

    function _validateSignature(
        PackedUserOperation calldata userOp,
        bytes32 userOpHash
    ) internal virtual override returns (uint256 validationData) {
        if (owner != ECDSA.recover(userOpHash, userOp.signature))
            return SIG_VALIDATION_FAILED;
        return SIG_VALIDATION_SUCCESS;
    }

    receive() external payable {}
}
