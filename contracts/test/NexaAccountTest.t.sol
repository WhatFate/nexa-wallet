// SPDX-License-Identifier: MIT
pragma solidity 0.8.28;

import {NexaAccount} from "../src/NexaAccount.sol";
import {Test} from "lib/forge-std/src/Test.sol";

contract NexaAccountTest is Test {
    NexaAccount nexaAccount;
    address public entryPointSepolia =
        0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789;
    address public uniswapRouter = 0x3A9D48AB9751398BbFa63ad67599Bb04e4BdF98b;

    function setUp() public {
        // nexaAccount = new NexaAccount(entryPointSepolia, uniswapRouter);
    }
}
