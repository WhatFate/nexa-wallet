// SPDX-License-Identifier: MIT
pragma solidity 0.8.30;

import {NexaWallet} from "../src/NexaWallet.sol";
import {Script} from "@forge-std/src/Script.sol";

contract DeployNexaWallet is Script {
    address public entryPointSepolia =
        0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789;

    function run() public {
        vm.startBroadcast();
        new NexaWallet(entryPointSepolia);
        vm.stopBroadcast();
    }
}
