"use client";
import { FC, useState } from "react";
import { ethers } from "ethers";

interface TokenModalProps {
  tokenName: string;
  balance: string;
  price: string;
  isOpen: boolean;
  onClose: () => void;
}

const TokenModal: FC<TokenModalProps> = ({
  tokenName,
  balance,
  price,
  isOpen,
  onClose,
}) => {
  const [isSendMode, setIsSendMode] = useState(false);
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [txStatus, setTxStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");

  if (!isOpen) return null;

  const handleSend = async () => {
    try {
      setTxStatus("sending");

      console.log(`Sending ${amount} ${tokenName} to ${recipient}`);

      await new Promise((res) => setTimeout(res, 2000));

      setTxStatus("success");
      setIsSendMode(false);
      setRecipient("");
      setAmount("");

      setTimeout(() => setTxStatus("idle"), 3000);
    } catch (err) {
      console.error(err);
      setTxStatus("error");
      setTimeout(() => setTxStatus("idle"), 3000);
    }
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    if (/^[0-9.]*$/.test(value)) {
      const parts = value.split(".");
      if (parts.length > 2) return;
      setAmount(value);
    }
  };

  const handleWheel = (e: React.WheelEvent<HTMLInputElement>) => {
    e.preventDefault();
    const current = parseFloat(amount) || 0;
    const delta = e.deltaY < 0 ? 0.1 : -0.1;
    const newValue = Math.max(0, parseFloat((current + delta).toFixed(1)));
    setAmount(newValue.toString());
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowUp" || e.key === "ArrowDown") {
      e.preventDefault();
      const current = parseFloat(amount) || 0;
      const delta = e.key === "ArrowUp" ? 0.1 : -0.1;
      const newValue = Math.max(0, parseFloat((current + delta).toFixed(1)));
      setAmount(newValue.toString());
    }
  };

  const isValidAddress = (address: string) => ethers.utils.isAddress(address);

  const hasEnoughBalance = parseFloat(balance) >= parseFloat(amount || "0");

  const isFormValid =
    recipient &&
    isValidAddress(recipient) &&
    amount &&
    parseFloat(amount) > 0 &&
    !isNaN(Number(amount)) &&
    hasEnoughBalance;

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-gray-900 rounded-2xl shadow-xl p-8 w-[420px] relative flex flex-col gap-6">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center bg-gray-700 rounded-full hover:bg-red-600 text-white font-bold text-lg transition-all shadow-md"
          title="Close"
        >
          x
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
            {txStatus === "sending" && "Sending transaction..."}
            {txStatus === "success" && "Transaction sent successfully!"}
            {txStatus === "error" && "Transaction failed!"}
          </div>
        )}

        {!isSendMode ? (
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
              <button className="flex-1 bg-green-700 hover:bg-green-800 px-4 py-2 rounded-lg text-white font-semibold transition">
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
        ) : (
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
                  recipient && !isValidAddress(recipient)
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-700 focus:ring-blue-500"
                } focus:outline-none focus:ring-2`}
              />
              {recipient && !isValidAddress(recipient) && (
                <p className="text-red-400 text-sm">Invalid Ethereum address</p>
              )}

              <label className="text-gray-300 text-sm font-semibold">
                Amount
              </label>
              <input
                type="text"
                value={amount}
                onChange={handleAmountChange}
                onWheel={handleWheel}
                onKeyDown={handleKeyDown}
                placeholder="0.0"
                inputMode="decimal"
                className={`p-2 rounded-lg bg-gray-800 text-white border ${
                  amount && !hasEnoughBalance
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-700 focus:ring-blue-500"
                } focus:outline-none focus:ring-2`}
              />
              {amount && !hasEnoughBalance && (
                <p className="text-red-400 text-sm">
                  Insufficient balance. You only have {}
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
                disabled={!isFormValid || txStatus === "sending"}
                className="flex-1 bg-blue-700 hover:bg-blue-800 px-4 py-2 rounded-lg text-white font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {txStatus === "sending" ? "Processing..." : "Confirm Send"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default TokenModal;
