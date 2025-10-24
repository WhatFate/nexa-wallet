"use client";
import { AIChat } from "@/components/AIChat";
import { SidebarLinks } from "@/components/SidebarLinks";
import Link from "next/link";

export default function Home() {
  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white font-sans">
      <div className="text-center mb-10">
        <h1 className="text-5xl font-bold mb-3">Nexa Wallet</h1>
        <p className="text-gray-400 text-lg">
          Smart Wallet powered by AI & Account Abstraction
        </p>
      </div>

      <div className="flex space-x-6">
        <Link href="/login" className="button-log-in cursor-pointer">
          Log in
        </Link>
        <Link href="/signup" className="button-sign-up cursor-pointer">
          Sign up
        </Link>
      </div>

      <footer className="absolute bottom-6 text-gray-500 text-sm">
        Built at ETHOnline 2025
      </footer>

      <SidebarLinks />

      <AIChat />
    </main>
  );
}
