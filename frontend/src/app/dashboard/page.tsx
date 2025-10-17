"use client";
import { useState, useEffect } from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import UserInfo from "@/components/dashboard/UserInfo";
import TokenCard, { Token } from "@/components/dashboard/TokenCard";
import { useBalances } from "@/hooks/useBalances";
import { User } from "@/types";
import { AIChat } from "@/components/AIChat";

export default function Dashboard() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const username = localStorage.getItem("username") || "Unknown";
    const aaAddress = localStorage.getItem("aaAddress") || "0x0000...";
    setUser({ username, aaAddress });
  }, []);

  const { balances, loading, fetchAllBalances } = useBalances(user?.aaAddress);

  if (!user)
    return <div className="text-white text-center mt-20">Loading...</div>;

  const tokens: Token[] = [
    {
      name: "Ethereum",
      balance: balances ? `${balances.eth.toFixed(4)} ETH` : "Loading...",
      price: "$3,420.10",
    },
    {
      name: "USDC",
      balance: balances ? `${balances.usdc.toFixed(2)} USDC` : "Loading...",
      price: "$5,000.00",
    },
    {
      name: "WETH",
      balance: balances ? `${balances.weth.toFixed(2)} WETH` : "Loading...",
      price: "$4,120.13",
    },
  ];

  return (
    <main className="min-h-screen w-full flex bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white font-sans overflow-hidden">
      <Sidebar />
      <section className="ml-60 md:ml-64 flex flex-col flex-grow w-full px-8 py-8 relative">
        <UserInfo user={user} />

        <div className="text-center mt-20">
          <h2 className="text-4xl font-bold mb-3">Your Portfolio</h2>
          <p className="text-gray-400 max-w-md mx-auto">
            View your token balances and overall portfolio value in one place.
          </p>
        </div>

        <div className="bg-gray-900/70 border border-gray-800 rounded-3xl shadow-xl p-10 w-full max-w-5xl mx-auto mt-10">
          <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 p-8 rounded-3xl shadow-lg text-center mb-8">
            <h3 className="text-xl text-gray-300 mb-2">Total Balance</h3>
            <p className="text-5xl font-extrabold text-white">$12,540.23</p>
            <p className="text-sm text-gray-400 mt-2">
              ≈ {balances?.eth.toFixed(4) || 0} ETH total value
            </p>
          </div>

          <div className="flex justify-end mb-6">
            <button
              onClick={fetchAllBalances}
              disabled={loading}
              className={`text-sm px-4 py-2 rounded-lg ${
                loading
                  ? "bg-gray-600 cursor-not-allowed"
                  : "bg-blue-700 hover:bg-blue-800"
              } transition`}
            >
              {loading ? "Refreshing..." : "Refresh All"}
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {tokens.map((token) => (
              <TokenCard key={token.name} token={token} />
            ))}
          </div>

          <div className="flex justify-center mt-10">
            <button className="bg-blue-700 hover:bg-blue-800 px-6 py-3 rounded-xl text-lg font-semibold shadow-md hover:shadow-blue-500/40 transition-all cursor-pointer">
              + Add Token
            </button>
          </div>
        </div>
      </section>

      <AIChat />
    </main>
  );
}
