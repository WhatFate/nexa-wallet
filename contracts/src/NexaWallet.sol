// SPDX-License-Identifier: MIT
pragma solidity 0.8.30;

import {IAccount} from "@account-abstraction/contracts/interfaces/IAccount.sol";
import {IEntryPoint} from "@account-abstraction/contracts/interfaces/IEntryPoint.sol";
import {SimpleAccount} from "@account-abstraction/contracts/accounts/SimpleAccount.sol";

contract NexaWallet is IAccount, SimpleAccount {
    IEntryPoint private immutable i_entryPoint;

    constructor(address _entryPoint) SimpleAccount(IEntryPoint(_entryPoint)) {
        i_entryPoint = IEntryPoint(_entryPoint);
    }

    function version() public pure returns (string memory) {
        return "Nexa Wallet V1.0";
    }

    function getEntryPoint() public view returns (address) {
        return address(i_entryPoint);
    }
}
