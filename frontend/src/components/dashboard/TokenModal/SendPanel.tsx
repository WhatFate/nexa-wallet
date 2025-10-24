"use client";
import { useState } from "react";
import { sendERC20, sendEther } from "@/lib/nexaAccountActions";
import { validateAddress, validateAmount } from "@/lib/validations";
import {
  handleAmountChange,
  handleAmountWheel,
  handleAmountKeyDown,
} from "@/lib/amountHandlers";

type SendPanelProps = {
  tokenName: string;
  tokenAddress?: string;
  balance: string;
  onBack: () => void;
};

export default function SendPanel({
  tokenName,
  tokenAddress,
  balance,
  onBack,
}: SendPanelProps) {
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [txStatus, setTxStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");

  const isValid =
    recipient &&
    validateAddress(recipient) &&
    amount &&
    parseFloat(amount) > 0 &&
    validateAmount(amount, balance);

  const handleSend = async () => {
    try {
      setTxStatus("sending");
      if (!recipient || !amount) return;

      if (!tokenAddress) {
        await sendEther(recipient, amount);
      } else {
        await sendERC20(recipient, amount, tokenAddress);
      }

      setTxStatus("success");
      setRecipient("");
      setAmount("");
      setTimeout(() => onBack(), 1000);
    } catch (err) {
      console.error(err);
      setTxStatus("error");
    } finally {
      setTimeout(() => setTxStatus("idle"), 3000);
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <h2 className="text-2xl font-bold text-center mb-2">Send {tokenName}</h2>

      <label className="text-gray-300 text-sm font-semibold">Recipient</label>
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

      <label className="text-gray-300 text-sm font-semibold">Amount</label>
      <input
        type="text"
        value={amount}
        onChange={(e) => handleAmountChange(e.target.value, setAmount)}
        onWheel={(e) => handleAmountWheel(e, amount, setAmount)}
        onKeyDown={(e) => handleAmountKeyDown(e, amount, setAmount)}
        placeholder="0.0"
        inputMode="decimal"
        className={`p-2 rounded-lg bg-gray-800 text-white border ${
          amount && !validateAmount(amount, balance)
            ? "border-red-500 focus:ring-red-500"
            : "border-gray-700 focus:ring-blue-500"
        } focus:outline-none focus:ring-2`}
      />
      {amount && !validateAmount(amount, balance) && (
        <p className="text-red-400 text-sm">
          Insufficient balance. You only have {balance}
        </p>
      )}

      <div className="flex justify-between gap-4 mt-4">
        <button
          onClick={onBack}
          className="flex-1 bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg text-white font-semibold transition"
        >
          Back
        </button>
        <button
          onClick={handleSend}
          disabled={!isValid || txStatus === "sending"}
          className="flex-1 bg-blue-700 hover:bg-blue-800 px-4 py-2 rounded-lg text-white font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {txStatus === "sending" ? "Processing..." : "Confirm Send"}
        </button>
      </div>

      {txStatus === "success" && (
        <p className="text-green-500 text-center mt-2">
          Transaction completed!
        </p>
      )}
      {txStatus === "error" && (
        <p className="text-red-500 text-center mt-2">Transaction failed!</p>
      )}
    </div>
  );
}
