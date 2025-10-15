"use client";
import Link from "next/link";
import { useState } from "react";
import { AIChat } from "../../components/AIChat";
import { SidebarLinks } from "../../components/SidebarLinks";

export default function LogIn() {
  const [walletName, setWalletName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleLogIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    if (!walletName || !password) {
      setMessage("Please fill in all fields.");
      return;
    }

    setLoading(true);
    try {
      await new Promise((r) => setTimeout(r, 1500));
      setMessage(`✅ Welcome back, "${walletName}"!`);
    } catch (err) {
      console.error(err);
      setMessage("❌ Failed to log in. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white font-sans px-6">
      <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-2xl p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-6">
          Log In to Nexa Wallet
        </h2>

        <form onSubmit={handleLogIn} className="space-y-4">
          <div>
            <label className="block text-gray-300 text-sm mb-1">
              Wallet Name
            </label>
            <input
              type="text"
              value={walletName}
              onChange={(e) => setWalletName(e.target.value)}
              placeholder="Enter your wallet name"
              className="w-full bg-white/20 text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-gray-300 text-sm mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full bg-white/20 text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 rounded-lg text-white font-semibold transition ${
              loading
                ? "bg-blue-500/60 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? "Logging In..." : "Log In"}
          </button>
        </form>

        {message && (
          <p className="text-center text-sm mt-4 text-gray-300">{message}</p>
        )}

        <div className="text-center mt-6 text-gray-400 text-sm">
          Don’t have an account?{" "}
          <Link
            href="/signup"
            className="text-blue-400 hover:text-blue-300 underline transition"
          >
            Create one
          </Link>
        </div>
      </div>

      <footer className="absolute bottom-6 right-6 text-gray-500 text-sm">
        Built at ETHOnline 2025
      </footer>

      <SidebarLinks />

      <AIChat />
    </main>
  );
}
