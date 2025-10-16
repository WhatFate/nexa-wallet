"use client";
import Link from "next/link";
import { AIChat } from "../../components/AIChat";
import { useState } from "react";

export default function Dashboard() {
  const user = {
    username: "nexa_user.eth",
    accountAddress: "0xA4c7...93B1",
  };

  const [showWalletMenu, setShowWalletMenu] = useState(false);

  return (
    <main className="min-h-screen w-full flex bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white font-sans overflow-hidden">
      <aside className="w-60 md:w-64 h-screen fixed left-0 top-0 flex flex-col justify-between border-r border-gray-800 bg-gray-900/70 backdrop-blur-md">
        <div className="p-6 text-2xl font-bold text-center border-b border-gray-800">
          Nexa Wallet
        </div>

        <nav className="flex flex-col flex-grow justify-evenly items-stretch px-4 py-6 relative">
          <button
            onClick={() => setShowWalletMenu(!showWalletMenu)}
            className="flex items-center justify-center gap-3 py-4 rounded-xl bg-[#1e3a8a] hover:bg-[#2a4dbf] shadow-md hover:shadow-blue-500/40 transition-all text-lg font-medium text-gray-100 w-full"
          >
            <span>Wallet</span>
          </button>

          {showWalletMenu && (
            <div className="absolute left-full top-0 ml-2 bg-gray-800 rounded-xl shadow-lg w-40 flex flex-col py-2 z-50">
              <button className="px-4 py-2 hover:bg-gray-700 transition-all text-left rounded-md">
                Send
              </button>
              <button className="px-4 py-2 hover:bg-gray-700 transition-all text-left rounded-md">
                Receive
              </button>
              <button className="px-4 py-2 hover:bg-gray-700 transition-all text-left rounded-md">
                Swap
              </button>
            </div>
          )}

          {[{ label: "DeFi" }, { label: "History" }, { label: "Settings" }].map(
            (item) => (
              <Link
                key={item.label}
                href="#"
                className="flex items-center justify-center gap-3 py-4 rounded-xl bg-[#1e3a8a] hover:bg-[#2a4dbf] shadow-md hover:shadow-blue-500/40 transition-all text-lg font-medium text-gray-100"
              >
                <span>{item.label}</span>
              </Link>
            )
          )}
        </nav>

        <div className="p-4 text-center text-sm text-gray-500 border-t border-gray-800">
          © 2025 Nexa Wallet
        </div>
      </aside>

      <section className="ml-60 md:ml-64 flex flex-col flex-grow w-full px-8 py-8 relative">
        <div className="absolute right-8 top-6 bg-gray-800/80 border border-gray-700 rounded-2xl shadow-lg p-4 flex items-center gap-4 backdrop-blur-md">
          <div className="w-10 h-10 rounded-full bg-blue-700 flex items-center justify-center text-lg font-bold">
            {user.username[0].toUpperCase()}
          </div>
          <div className="flex flex-col text-sm">
            <span className="font-semibold text-white">{user.username}</span>
            <span className="text-gray-400">{user.accountAddress}</span>
          </div>
          <button className="ml-3 bg-blue-700 hover:bg-blue-800 px-3 py-1.5 rounded-lg text-xs font-medium transition">
            Copy
          </button>
        </div>

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
            <p className="text-sm text-gray-400 mt-2">≈ 4.58 ETH total value</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-gray-800 rounded-2xl shadow-lg hover:bg-gray-700 transition-all">
              <h3 className="text-xl font-bold mb-2 flex items-center justify-between">
                <span>ETH</span>
              </h3>
              <p className="text-gray-300 text-lg">1.25 ETH</p>
              <p className="text-gray-500 text-sm">$3,420.10</p>
            </div>

            <div className="p-6 bg-gray-800 rounded-2xl shadow-lg hover:bg-gray-700 transition-all">
              <h3 className="text-xl font-bold mb-2 flex items-center justify-between">
                <span>USDC</span>
              </h3>
              <p className="text-gray-300 text-lg">5,000 USDC</p>
              <p className="text-gray-500 text-sm">$5,000.00</p>
            </div>

            <div className="p-6 bg-gray-800 rounded-2xl shadow-lg hover:bg-gray-700 transition-all">
              <h3 className="text-xl font-bold mb-2 flex items-center justify-between">
                <span>AVAIL</span>
              </h3>
              <p className="text-gray-300 text-lg">2,000 AVAIL</p>
              <p className="text-gray-500 text-sm">$4,120.13</p>
            </div>
          </div>

          <div className="flex justify-center mt-10">
            <button className="bg-blue-700 hover:bg-blue-800 px-6 py-3 rounded-xl text-lg font-semibold shadow-md hover:shadow-blue-500/40 transition-all">
              + Add Token
            </button>
          </div>
        </div>
      </section>

      <AIChat />
    </main>
  );
}
