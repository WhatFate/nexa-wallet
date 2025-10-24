"use client";
import {
  handleAmountChange,
  handleAmountWheel,
  handleAmountKeyDown,
} from "@/lib/amountHandlers";
import { swap } from "@/lib/nexaAccountActions";
import { useState } from "react";

type SwapPanelProps = {
  symbol: string;
  tokenIn: string;
  onBack: () => void;
};

export default function SwapPanel({ symbol, tokenIn, onBack }: SwapPanelProps) {
  const [txStatus, setTxStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");
  const [tokenOut, setTokenOut] = useState("");
  const [amountIn, setAmountIn] = useState("");

  const isProcessing = txStatus === "sending";
  const isValid = amountIn && parseFloat(amountIn) > 0;
  const handleSwap = async () => {
    try {
      setTxStatus("sending");
      await swap(tokenIn, tokenOut, amountIn);
      setTxStatus("success");
      setAmountIn("");
    } catch (err) {
      console.error(err);
      setTxStatus("error");
    } finally {
      setTimeout(() => setTxStatus("idle"), 3000);
    }
  };

  return (
    <div className="flex flex-col gap-3">
      {txStatus !== "idle" && (
        <div
          className={`px-4 py-2 rounded-lg text-white font-semibold transition-all ${
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

      <h2 className="text-2xl font-bold text-center mb-2">Swap {symbol}</h2>

      <label className="text-gray-300 text-sm font-semibold">
        Token to Swap
      </label>
      <select
        value={tokenOut}
        onChange={(e) => setTokenOut(e.target.value)}
        className="p-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238">USDC</option>
        <option value="0xfFf9976782d46CC05630D1f6eBAb18b2324d6B14">WETH</option>
        <option value="">ETH</option>
      </select>

      <label className="text-gray-300 text-sm font-semibold">
        Amount {symbol} to swap
      </label>
      <input
        type="text"
        value={amountIn}
        onChange={(e) => handleAmountChange(e.target.value, setAmountIn)}
        onWheel={(e) => handleAmountWheel(e, amountIn, setAmountIn)}
        onKeyDown={(e) => handleAmountKeyDown(e, amountIn, setAmountIn)}
        placeholder="0.0"
        inputMode="decimal"
        className="p-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <div className="flex justify-between gap-4 mt-4">
        <button
          onClick={onBack}
          className="flex-1 bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg text-white font-semibold transition"
        >
          Back
        </button>
        <button
          onClick={handleSwap}
          disabled={!isValid || isProcessing}
          className="flex-1 bg-blue-700 hover:bg-blue-800 px-4 py-2 rounded-lg text-white font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isProcessing ? "Processing..." : "Confirm Swap"}
        </button>
      </div>
    </div>
  );
}
