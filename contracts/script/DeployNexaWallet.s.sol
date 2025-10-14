// SPDX-License-Identifier: MIT
pragma solidity 0.8.28;

import {NexaWallet} from "../src/NexaWallet.sol";
import {Script} from "@forge-std/src/Script.sol";

contract DeployNexaWallet is Script {
    address public entryPointSepolia =
        0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789;
    address public uniswapRouter = 0x3A9D48AB9751398BbFa63ad67599Bb04e4BdF98b;

    function run() public {
        vm.startBroadcast();
        // new NexaWallet(entryPointSepolia, uniswapRouter, );
        vm.stopBroadcast();
    }
}
