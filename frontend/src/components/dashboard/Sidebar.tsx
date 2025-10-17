"use client";
import Link from "next/link";
import { useState } from "react";

export default function Sidebar() {
  const [showWalletMenu, setShowWalletMenu] = useState(false);

  return (
    <aside className="w-60 md:w-64 h-screen fixed left-0 top-0 flex flex-col justify-between border-r border-gray-800 bg-gray-900/70 backdrop-blur-md">
      <div className="p-6 text-2xl font-bold text-center border-b border-gray-800">
        Nexa Wallet
      </div>
      <nav className="flex flex-col flex-grow justify-evenly items-stretch px-4 py-6 relative">
        <button
          onClick={() => setShowWalletMenu(!showWalletMenu)}
          className="flex items-center justify-center gap-3 py-4 rounded-xl bg-[#1e3a8a] hover:bg-[#2a4dbf] shadow-md hover:shadow-blue-500/40 transition-all text-lg font-medium text-gray-100 w-full cursor-pointer"
        >
          Wallet
        </button>

        {showWalletMenu && (
          <div className="absolute left-full top-25 ml-2 bg-gray-800 rounded-xl shadow-lg w-40 flex flex-col py-2 z-50">
            {["Send", "Receive", "Swap"].map((action) => (
              <button
                key={action}
                className="px-4 py-2 hover:bg-gray-700 transition-all text-left rounded-md cursor-pointer"
              >
                {action}
              </button>
            ))}
          </div>
        )}

        {["DeFi", "History", "Settings"].map((item) => (
          <Link
            key={item}
            href="#"
            className="flex items-center justify-center gap-3 py-4 rounded-xl bg-[#1e3a8a] hover:bg-[#2a4dbf] shadow-md hover:shadow-blue-500/40 transition-all text-lg font-medium text-gray-100"
          >
            {item}
          </Link>
        ))}
      </nav>

      <div className="p-4 text-center text-sm text-gray-500 border-t border-gray-800">
        © 2025 Nexa Wallet
      </div>
    </aside>
  );
}
