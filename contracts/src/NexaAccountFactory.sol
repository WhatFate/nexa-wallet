// SPDX-License-Identifier: MIT
pragma solidity 0.8.28;

import {NexaAccount} from "./NexaAccount.sol";

contract NexaAccountFactory {
    event AccountCreated(address account, address owner);

    function createAccount(address _entryPoint, address owner) external returns (address) {
        NexaAccount account = new NexaAccount(_entryPoint, owner);
        emit AccountCreated(address(account), owner);
        return address(account);
    }
}