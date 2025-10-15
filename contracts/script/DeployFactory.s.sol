// SPDX-License-Identifier: MIT
pragma solidity 0.8.28;

import {NexaAccountFactory} from "../src/NexaAccountFactory.sol";
import {Script} from "@forge-std/src/Script.sol";

contract DeployFactory is Script {
    function run() public {
        vm.startBroadcast();
        NexaAccountFactory factory = new NexaAccountFactory();
        vm.stopBroadcast();
    }
}
