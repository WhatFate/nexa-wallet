"use client";

import { useState, useEffect } from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import { AIChat } from "@/components/AIChat";

interface Transaction {
  hash: string;
  type: string;
  amount: number;
  token: string;
  date: string;
  status: "Success" | "Pending" | "Failed";
}

export default function History() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const dummyData: Transaction[] = [
      {
        hash: "0xabc123",
        type: "Swap",
        amount: 0.5,
        token: "ETH → USDC",
        date: "2025-10-22 14:30",
        status: "Success",
      },
      {
        hash: "0xdef456",
        type: "Transfer",
        amount: 100,
        token: "USDC",
        date: "2025-10-21 18:10",
        status: "Pending",
      },
      {
        hash: "0xghi789",
        type: "Transfer",
        amount: 2,
        token: "ETH",
        date: "2025-10-20 12:45",
        status: "Failed",
      },
    ];
    setTransactions(dummyData);
  }, []);

  const refreshHistory = async () => {
    setLoading(true);
    await new Promise((res) => setTimeout(res, 1000));
    setLoading(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Success":
        return "bg-green-500";
      case "Pending":
        return "bg-yellow-500";
      case "Failed":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <main className="min-h-screen w-full flex bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white font-sans overflow-hidden">
      <Sidebar />

      <section className="ml-60 md:ml-64 flex flex-col flex-grow w-full px-8 py-8 relative">
        <div className="text-center mt-10">
          <h2 className="text-4xl font-bold mb-2">Transaction History</h2>
          <p className="text-gray-400 max-w-md mx-auto">
            View all your transactions from your Nexa Wallet account in one
            place.
          </p>
        </div>

        <div className="bg-gray-900/70 border border-gray-800 rounded-3xl shadow-xl p-8 w-full max-w-5xl mx-auto mt-10">
          <div className="flex justify-end mb-6">
            <button
              onClick={refreshHistory}
              disabled={loading}
              className={`text-sm px-4 py-2 rounded-lg ${
                loading
                  ? "bg-gray-600 cursor-not-allowed"
                  : "bg-blue-700 hover:bg-blue-800"
              } transition`}
            >
              {loading ? "Refreshing..." : "Refresh History"}
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {transactions.map((tx) => (
              <div
                key={tx.hash}
                className="bg-gray-800/70 p-6 rounded-2xl shadow-md hover:shadow-blue-500/40 transition"
              >
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-semibold text-lg">{tx.type}</h3>
                  <span
                    className={`text-sm px-2 py-1 rounded-full ${getStatusColor(
                      tx.status
                    )}`}
                  >
                    {tx.status}
                  </span>
                </div>
                <p className="text-gray-300 mb-1">Token: {tx.token}</p>
                <p className="text-gray-300 mb-1">Amount: {tx.amount}</p>
                <p className="text-gray-400 text-sm">Hash: {tx.hash}</p>
                <p className="text-gray-400 text-sm">Date: {tx.date}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <AIChat />
    </main>
  );
}
