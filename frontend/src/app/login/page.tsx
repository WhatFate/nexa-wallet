"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { AIChat } from "@/components/AIChat";
import { SidebarLinks } from "@/components/SidebarLinks";
import { createEOAWallet } from "@/lib/wallet";

export default function LogIn() {
  const [username, setusername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleLogIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    if (!username || !password) {
      setMessage("Please fill in all fields.");
      return;
    }

    setLoading(true);

    try {
      const checkRes = await fetch(
        "http://127.0.0.1:8001/flask/api/user/check-username",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username }),
        }
      );
      const checkData = await checkRes.json();

      if (!checkData.exists) {
        setMessage("Account does not exist.");
        return;
      }

      const eoaWallet = await createEOAWallet(username, password);
      const eoaAddress = eoaWallet.address;

      const loginRes = await fetch(
        "http://127.0.0.1:8001/flask/api/user/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, eoaAddress }),
        }
      );
      const loginData = await loginRes.json();

      if (!loginData.success) {
        setMessage("Wrong username or password.");
        return;
      }

      localStorage.setItem("aaAddress", loginData.aaAddress);
      localStorage.setItem("username", username);
      localStorage.setItem("eoaAddress", eoaAddress);
      localStorage.setItem("eoaPrivateKey", eoaWallet.privateKey);

      router.push("/dashboard/wallet");
    } catch (err) {
      console.error("Login error:", err);
      setMessage("Failed to log in. Please try again.");
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
            <label className="block text-gray-300 text-sm mb-1">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setusername(e.target.value)}
              placeholder="Enter your username"
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

      <SidebarLinks />

      <AIChat />
    </main>
  );
}
