"use client";
import Link from "next/link";
import { useState } from "react";

export default function LogIn() {
  const [walletName, setWalletName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isOpen, setIsOpen] = useState(false);

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
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white font-sans px-6">
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

      <footer className="absolute bottom-6 text-gray-500 text-sm">
        Built at ETHOnline 2025
      </footer>

      <div className="absolute bottom-24 right-6 flex flex-col items-end space-y-2">
        {!isOpen && (
          <button
            onClick={() => setIsOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full shadow-lg cursor-pointer"
          >
            AI Chat
          </button>
        )}

        {isOpen && (
          <div className="w-80 h-96 bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-lg p-4 flex flex-col justify-between mt-2 relative">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-3 right-3 text-white hover:text-gray-300 font-bold text-lg"
            >
              ✕
            </button>

            <div className="font-semibold text-white text-center mb-2">
              AI Agent
            </div>
            <div className="flex-1 overflow-y-auto text-gray-200 text-sm p-2 rounded-lg">
              <p className="text-gray-400 text-center mt-20">
                👋 Chat will be available soon...
              </p>
            </div>
            <div className="mt-3 flex">
              <input
                type="text"
                placeholder="Type a message..."
                disabled
                className="flex-1 bg-white/20 text-white rounded-l-lg px-1 py-2 focus:outline-none"
              />
              <button
                disabled
                className="bg-blue-500/70 px-3 py-2 rounded-r-lg text-white cursor-not-allowed"
              >
                Send
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
