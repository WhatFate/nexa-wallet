"use client";
import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="w-60 md:w-64 h-screen fixed left-0 top-0 flex flex-col justify-between border-r border-gray-800 bg-gray-900/70 backdrop-blur-md">
      <div className="p-6 text-2xl font-bold text-center border-b border-gray-800">
        Nexa Wallet
      </div>
      <nav className="flex flex-col flex-grow justify-evenly items-stretch px-4 py-6 relative">
        <Link
          href="/dashboard/wallet"
          className="flex items-center justify-center gap-3 py-4 rounded-xl bg-[#1e3a8a] hover:bg-[#2a4dbf] shadow-md hover:shadow-blue-500/40 transition-all text-lg font-medium text-gray-100"
        >
          Wallet
        </Link>
        <Link
          href="#"
          className="flex items-center justify-center gap-3 py-4 rounded-xl bg-[#1e3a8a] hover:bg-[#2a4dbf] shadow-md hover:shadow-blue-500/40 transition-all text-lg font-medium text-gray-100"
        >
          DeFi
        </Link>
        <Link
          href="/dashboard/history"
          className="flex items-center justify-center gap-3 py-4 rounded-xl bg-[#1e3a8a] hover:bg-[#2a4dbf] shadow-md hover:shadow-blue-500/40 transition-all text-lg font-medium text-gray-100"
        >
          History
        </Link>
        <Link
          href="/dashboard/settings"
          className="flex items-center justify-center gap-3 py-4 rounded-xl bg-[#1e3a8a] hover:bg-[#2a4dbf] shadow-md hover:shadow-blue-500/40 transition-all text-lg font-medium text-gray-100"
        >
          Settings
        </Link>
      </nav>

      <div className="p-4 text-center text-sm text-gray-500 border-t border-gray-800">
        © 2025 Nexa Wallet
      </div>
    </aside>
  );
}
