// SPDX-License-Identifier: MIT
pragma solidity 0.8.30;

import {NexaWallet} from "../src/NexaWallet.sol";
import {Test} from "@forge-std/src/Test.sol";

contract NexaWalletTest is Test {
    NexaWallet nexaWallet;
    address public entryPointSepolia =
        0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789;

    function setUp() public {
        nexaWallet = new NexaWallet(entryPointSepolia);
    }
}
