"use client";
import { FC } from "react";

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
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-gray-900 rounded-2xl shadow-xl p-8 w-96 relative flex flex-col gap-6">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center bg-gray-700 rounded-full hover:bg-red-600 text-white font-bold text-lg transition-all shadow-md"
          title="Close"
        >
          x
        </button>

        <div className="text-center">
          <h2 className="text-3xl font-bold">{tokenName}</h2>
          <p className="text-gray-400 mt-1 text-lg">Price: {price}</p>
        </div>

        <div className="flex justify-between gap-4">
          <button className="flex-1 bg-blue-700 hover:bg-blue-800 px-4 py-2 rounded-lg text-white font-semibold transition">
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
            <p className="text-gray-400 font-semibold mb-1">Token Details</p>
            <p className="text-white">Network: Ethereum Sepolia</p>
          </div>

          <div className="bg-gray-800 rounded-lg p-3">
            <p className="text-gray-400 font-semibold mb-1">Your Activity</p>
            <p className="text-white">Recent transactions will appear here</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TokenModal;
