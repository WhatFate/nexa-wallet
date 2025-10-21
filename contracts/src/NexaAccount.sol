// SPDX-License-Identifier: MIT
pragma solidity 0.8.28;

import {IEntryPoint} from "@account-abstraction/contracts/interfaces/IEntryPoint.sol";
import {ECDSA} from "@openzeppelin-contracts/contracts/utils/cryptography/ECDSA.sol";
import {PackedUserOperation} from "@account-abstraction/contracts/interfaces/PackedUserOperation.sol";
import {SIG_VALIDATION_FAILED, SIG_VALIDATION_SUCCESS} from "@account-abstraction/contracts/core/Helpers.sol";
import {SafeERC20, IERC20} from "@openzeppelin-contracts/contracts/token/ERC20/utils/SafeERC20.sol";
import {Ownable} from "@openzeppelin-contracts/contracts/access/Ownable.sol";
import {MessageHashUtils} from "@openzeppelin-contracts/contracts/utils/cryptography/MessageHashUtils.sol";

contract NexaAccount is Ownable {
    error NexaAccount__NotCalledByEntryPointOrOwner();
    error NexaAccount__TransactionFailed();
    error NexaAccount__InvalidNonce();

    event ERC20Transfer(address indexed token, address indexed to, uint256 amount);
    event EtherTransfer(address indexed to, uint256 amount, bytes data);

    IEntryPoint private immutable i_entryPoint;
    // address private immutable i_uniswapRouter;

    uint256 private _nonce;

    constructor(address _entryPoint, /*address uniswapRouter ,*/ address owner) Ownable(owner) {
        i_entryPoint = IEntryPoint(_entryPoint);
        // i_uniswapRouter = uniswapRouter;
    }

    modifier onlyEntryPointOrOwner() {
        if (msg.sender != address(i_entryPoint) && msg.sender != owner()) {
            revert NexaAccount__NotCalledByEntryPointOrOwner();
        }
        _;
    }

    receive() external payable {}

    function validateUserOp(PackedUserOperation calldata userOp, bytes32 userOpHash, uint256 missingAccountFunds)
        external
        onlyEntryPointOrOwner
        returns (uint256 validationData)
    {
        validationData = _validateSignature(userOp, userOpHash);
        _checkAndIncrementNonce(userOp.nonce);

        if (missingAccountFunds > 0) {
            (bool success, ) = payable(msg.sender).call{value: missingAccountFunds}("");
            require(success, "Failed to fund EntryPoint");
        }
    }

    function _validateSignature(PackedUserOperation calldata userOp, bytes32 userOpHash)
        internal
        view
        returns (uint256 validationData)
    {
        bytes32 ethSignedMessageHash = MessageHashUtils.toEthSignedMessageHash(userOpHash);
        address signer = ECDSA.recover(ethSignedMessageHash, userOp.signature);
        if (signer != owner()) {
            return SIG_VALIDATION_FAILED;
        }
        return SIG_VALIDATION_SUCCESS;
    }

    // function swap(
    //     address token1,
    //     address token2,
    //     uint256 amount
    // ) external payable onlyEntryPointOrOwner {}

    function transferERC20(
        address target,
        uint256 amount,
        address tokenAddress
    ) external onlyEntryPointOrOwner {
        IERC20 erc20 = IERC20(tokenAddress);
        SafeERC20.safeTransfer(erc20, target, amount);
        emit ERC20Transfer(tokenAddress, target, amount);
    }

    function transferEtherWithCall(
        address target,
        bytes memory callData
    ) external payable onlyEntryPointOrOwner {
        (bool success, bytes memory returnData) = payable(target).call{value: msg.value}(
            callData
        );
        if (!success) {
            revert NexaAccount__TransactionFailed();
        }
        emit EtherTransfer(target, msg.value, returnData);
    }

    function _checkAndIncrementNonce(uint256 checkNonce) internal {
        if (checkNonce != _nonce) {
            revert NexaAccount__InvalidNonce();
        }

        unchecked { _nonce += 1; }
    }

    function getEntryPoint() external view returns (address) {
        return address(i_entryPoint);
    }

    
    function nonce() public view returns (uint256) {
        return _nonce;
    }
}
