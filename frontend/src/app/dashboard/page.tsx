"use client";
import { useState, useEffect } from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import UserInfo from "@/components/dashboard/UserInfo";
import TokenCard from "@/components/dashboard/TokenCard";
import { useBalances } from "@/hooks/useBalances";
import { User } from "@/types";
import { AIChat } from "@/components/AIChat";
import { getTokenInfo } from "@/lib/token";
import { Token } from "@/types/index";
import { getAllPythPrices } from "@/lib/getPythPrice";

export default function Dashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [tokenNames, setTokenNames] = useState<Record<string, string>>({});
  const [tokenPrices, setTokenPrices] = useState<Record<string, number>>({});
  const tokenAddresses = {
    USDC: "0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238",
    WETH: "0xfFf9976782d46CC05630D1f6eBAb18b2324d6B14",
  };
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  useEffect(() => {
    const username = localStorage.getItem("username") || "Unknown";
    const aaAddress = localStorage.getItem("aaAddress") || "0x0000...";
    setUser({ username, aaAddress });
  }, []);

  const { balances, loading, fetchAllBalances } = useBalances(user?.aaAddress);

  useEffect(() => {
    async function fetchTokenNames() {
      const names: Record<string, string> = {};
      for (const [key, addr] of Object.entries(tokenAddresses)) {
        const info = await getTokenInfo(addr);
        names[key] = info.name;
      }
      setTokenNames(names);
    }
    fetchTokenNames();
  }, []);

  const fetchTokenPrices = async () => {
    try {
      const prices = await getAllPythPrices();
      setTokenPrices(prices);
    } catch (err) {
      console.error("Failed to fetch token prices:", err);
    }
  };

  useEffect(() => {
    fetchTokenPrices();
  }, []);

  const getTotalPortfolioValue = () => {
    if (!balances || !tokenPrices) return 0;
    let totalUsd = 0;

    if (balances.eth && tokenPrices.ETH)
      totalUsd += balances.eth * tokenPrices.ETH;

    if (balances.usdc && tokenPrices.USDC)
      totalUsd += balances.usdc * tokenPrices.USDC;

    if (balances.weth && tokenPrices.WETH)
      totalUsd += balances.weth * tokenPrices.WETH;

    return totalUsd;
  };

  const getTotalPortfolioValueInEth = () => {
    if (!balances || !tokenPrices) return 0;
    let totalUsd = getTotalPortfolioValue();

    const totalEth = totalUsd / tokenPrices.ETH;

    return totalEth;
  };

  if (!user)
    return <div className="text-white text-center mt-20">Loading...</div>;

  const tokens: Token[] = [
    {
      name: "Ethereum",
      balance: balances ? `${balances.eth.toFixed(4)} ETH` : "Loading...",
      price: tokenPrices.ETH ? `$${tokenPrices.ETH.toFixed(2)}` : "Loading...",
    },
    {
      name: tokenNames.USDC || "USDC",
      balance: balances ? `${balances.usdc.toFixed(2)} USDC` : "Loading...",
      price: tokenPrices.USDC
        ? `$${tokenPrices.USDC.toFixed(2)}`
        : "Loading...",
    },
    {
      name: tokenNames.WETH || "WETH",
      balance: balances ? `${balances.weth.toFixed(2)} WETH` : "Loading...",
      price: tokenPrices.WETH
        ? `$${tokenPrices.WETH.toFixed(2)}`
        : "Loading...",
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
            <p className="text-5xl font-extrabold text-white">
              ${getTotalPortfolioValue().toFixed(2)}
            </p>
            <p className="text-sm text-gray-400 mt-2">
              ≈ {getTotalPortfolioValueInEth().toFixed(4) || 0} ETH total value
            </p>
          </div>

          <div className="flex justify-end mb-6">
            <button
              onClick={async () => {
                await fetchAllBalances();
                await fetchTokenPrices();
                getTotalPortfolioValue();
                getTotalPortfolioValueInEth();
              }}
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
              <TokenCard
                key={token.name}
                token={token}
                activeMenu={activeMenu}
                setActiveMenu={setActiveMenu}
              />
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
