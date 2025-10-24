"use client";
import { FC, useState, useEffect } from "react";
import { ethers } from "ethers";
import ReceiveQR from "@/components/dashboard/ReceiveQR";
import {
  sendERC20,
  sendEther,
  swapEthToWeth,
  swap,
} from "@/lib/nexaAccountActions";
import { TokenModalProps } from "@/types";
import {
  handleAmountChange,
  handleAmountWheel,
  handleAmountKeyDown,
} from "@/lib/amountHandlers";
import {
  validateAddress,
  validateAmount,
  validateNumericInput,
} from "@/lib/validations";

const TokenModal: FC<TokenModalProps> = ({
  tokenName,
  symbol,
  balance,
  price,
  tokenAddress,
  isOpen,
  onClose,
}) => {
  const [isSendMode, setIsSendMode] = useState(false);
  const [isSwapMode, setIsSwapMode] = useState(false);
  const [isReceiveMode, setIsReceiveMode] = useState(false);
  const [tokenIn, setTokenIn] = useState("");
  const [tokenOut, setTokenOut] = useState("");
  const [amountSwap, setAmountSwap] = useState("");
  const [recipient, setRecipient] = useState("");
  const [amountSend, setAmountSend] = useState("");
  const [selectedToken, setSelectedToken] = useState(tokenAddress);
  const [txStatus, setTxStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");

  const [aaAddress, setAaAddress] = useState<string>("");

  useEffect(() => {
    const aaAddress = localStorage.getItem("aaAddress") || "0x0000...";
    setAaAddress(aaAddress);
    setSelectedToken(tokenAddress);
  }, [tokenAddress]);

  if (!isOpen) return null;

  const isSendFormValid =
    recipient &&
    validateAddress(recipient) &&
    amountSend &&
    parseFloat(amountSend) > 0 &&
    !isNaN(Number(amountSend)) &&
    validateAmount(amountSend, balance);

  const handleSend = async () => {
    try {
      setTxStatus("sending");
      if (!recipient || !amountSend) return;

      if (!tokenAddress) {
        await sendEther(recipient, amountSend);
      } else {
        await sendERC20(recipient, amountSend, tokenAddress);
      }

      setTxStatus("success");
      setIsSendMode(false);
      setRecipient("");
      setAmountSend("");
    } catch (err) {
      console.error(err);
      setTxStatus("error");
    } finally {
      setTimeout(() => setTxStatus("idle"), 3000);
    }
  };

  const handleSwap = async () => {
    try {
      setTxStatus("sending");
      console.log(`Swapping ${amountSend} of ${selectedToken}`);
      setTxStatus("success");
      setIsSwapMode(false);
      setAmountSend("");
    } catch (err) {
      console.error(err);
      setTxStatus("error");
    } finally {
      setTimeout(() => setTxStatus("idle"), 3000);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-gray-900 rounded-2xl shadow-xl p-8 w-[420px] relative flex flex-col gap-6">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center bg-gray-700 rounded-full hover:bg-red-600 text-white font-bold text-lg transition-all shadow-md"
          title="Close"
        >
          ✕
        </button>

        {txStatus !== "idle" && (
          <div
            className={`absolute -top-10 left-1/2 -translate-x-1/2 px-4 py-2 rounded-lg text-white font-semibold shadow-md transition-all ${
              txStatus === "sending"
                ? "bg-blue-600 animate-pulse"
                : txStatus === "success"
                ? "bg-green-600"
                : "bg-red-600"
            }`}
          >
            {txStatus === "sending" && "Processing..."}
            {txStatus === "success" && "Transaction completed!"}
            {txStatus === "error" && "Transaction failed!"}
          </div>
        )}

        {isReceiveMode ? (
          <>
            <div className="flex flex-col items-center gap-4 mt-4">
              <ReceiveQR address={aaAddress} />
            </div>

            <button
              onClick={() => setIsReceiveMode(false)}
              className="mt-6 bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg text-white font-semibold transition"
            >
              Back
            </button>
          </>
        ) : isSwapMode ? (
          <>
            <h2 className="text-2xl font-bold text-center mb-2">
              Swap {symbol}
            </h2>
            <div className="flex flex-col gap-3">
              <label className="text-gray-300 text-sm font-semibold">
                Token to Swap
              </label>
              <select
                value={selectedToken}
                onChange={(e) => setSelectedToken(e.target.value)}
                className="p-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238">
                  USDC
                </option>
                <option value="0xfFf9976782d46CC05630D1f6eBAb18b2324d6B14">
                  WETH
                </option>
                <option value="">ETH</option>
              </select>

              <label className="text-gray-300 text-sm font-semibold">
                Amount {symbol} to swap
              </label>
              <input
                type="text"
                value={amountSend}
                onChange={(e) =>
                  handleAmountChange(e.target.value, setAmountSend)
                }
                onWheel={(e) => handleAmountWheel(e, amountSend, setAmountSend)}
                onKeyDown={(e) =>
                  handleAmountKeyDown(e, amountSend, setAmountSend)
                }
                placeholder="0.0"
                inputMode="decimal"
                className="p-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex justify-between gap-4 mt-4">
              <button
                onClick={() => setIsSwapMode(false)}
                className="flex-1 bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg text-white font-semibold transition"
              >
                Back
              </button>
              <button
                onClick={handleSwap}
                disabled={
                  !amountSend ||
                  parseFloat(amountSend) <= 0 ||
                  txStatus === "sending"
                }
                className="flex-1 bg-blue-700 hover:bg-blue-800 px-4 py-2 rounded-lg text-white font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Confirm Swap
              </button>
            </div>
          </>
        ) : isSendMode ? (
          <>
            <h2 className="text-2xl font-bold text-center mb-2">
              Send {tokenName}
            </h2>
            <div className="flex flex-col gap-3">
              <label className="text-gray-300 text-sm font-semibold">
                Recipient Address
              </label>
              <input
                type="text"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                placeholder="0x..."
                className={`p-2 rounded-lg bg-gray-800 text-white border ${
                  recipient && !validateAddress(recipient)
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-700 focus:ring-blue-500"
                } focus:outline-none focus:ring-2`}
              />
              {recipient && !validateAddress(recipient) && (
                <p className="text-red-400 text-sm">Invalid Ethereum address</p>
              )}

              <label className="text-gray-300 text-sm font-semibold">
                Amount
              </label>
              <input
                type="text"
                value={amountSend}
                onChange={(e) =>
                  handleAmountChange(e.target.value, setAmountSend)
                }
                onWheel={(e) => handleAmountWheel(e, amountSend, setAmountSend)}
                onKeyDown={(e) =>
                  handleAmountKeyDown(e, amountSend, setAmountSend)
                }
                placeholder="0.0"
                inputMode="decimal"
                className={`p-2 rounded-lg bg-gray-800 text-white border ${
                  amountSend && !validateAmount(amountSend, balance)
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-700 focus:ring-blue-500"
                } focus:outline-none focus:ring-2`}
              />
              {amountSend && !validateAmount(amountSend, balance) && (
                <p className="text-red-400 text-sm">
                  Insufficient balance. You only have {balance}
                </p>
              )}
            </div>

            <div className="flex justify-between gap-4 mt-4">
              <button
                onClick={() => setIsSendMode(false)}
                className="flex-1 bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg text-white font-semibold transition"
              >
                Back
              </button>
              <button
                onClick={handleSend}
                disabled={!isSendFormValid || txStatus === "sending"}
                className="flex-1 bg-blue-700 hover:bg-blue-800 px-4 py-2 rounded-lg text-white font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {txStatus === "sending" ? "Processing..." : "Confirm Send"}
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="text-center">
              <h2 className="text-3xl font-bold">{tokenName}</h2>
              <p className="text-gray-400 mt-1 text-lg">Price: {price}</p>
            </div>

            <div className="flex justify-between gap-4">
              <button
                onClick={() => setIsSendMode(true)}
                className="flex-1 bg-blue-700 hover:bg-blue-800 px-4 py-2 rounded-lg text-white font-semibold transition"
              >
                Send
              </button>
              <button
                onClick={() => setIsSwapMode(true)}
                className="flex-1 bg-blue-700 hover:bg-blue-800 px-4 py-2 rounded-lg text-white font-semibold transition"
              >
                Swap
              </button>
              <button
                onClick={() => setIsReceiveMode(true)}
                className="flex-1 bg-blue-700 hover:bg-blue-800 px-4 py-2 rounded-lg text-white font-semibold transition"
              >
                Receive
              </button>
            </div>

            <div className="flex flex-col gap-4">
              <div className="bg-gray-800 rounded-lg p-3">
                <p className="text-gray-400 font-semibold mb-1">Your Balance</p>
                <p className="text-white">{balance}</p>
              </div>

              <div className="bg-gray-800 rounded-lg p-3">
                <p className="text-gray-400 font-semibold mb-1">
                  Token Details
                </p>
                <p className="text-white">Network: Ethereum Sepolia</p>
              </div>

              <div className="bg-gray-800 rounded-lg p-3">
                <p className="text-gray-400 font-semibold mb-1">
                  Your Activity
                </p>
                <p className="text-white">
                  Recent transactions will appear here
                </p>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default TokenModal;
