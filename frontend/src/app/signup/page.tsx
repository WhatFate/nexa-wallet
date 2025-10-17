"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { AIChat } from "../../components/AIChat";
import { SidebarLinks } from "../../components/SidebarLinks";
import { createEOAWallet } from "../../lib/wallet";
import { deployAccountAbstraction } from "../../lib/factory";
import { getEntryPoint } from "@/lib/test/rpcBackend";

export default function SignUp() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      if (!username || !password || !confirmPassword) {
        setMessage("Please fill in all fields.");
        setLoading(false);
        return;
      }
      if (password !== confirmPassword) {
        setMessage("Passwords do not match.");
        setLoading(false);
        return;
      }

      const checkRes = await fetch(
        "http://127.0.0.1:5000/api/user/check-username",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username: username }),
        }
      );
      const checkData = await checkRes.json();
      if (checkData.exists) {
        setMessage("Username already exists. Choose another one.");
        setLoading(false);
        return;
      }

      const eoaWallet = await createEOAWallet(username, password);
      localStorage.setItem("eoaAddress", eoaWallet.address);
      localStorage.setItem("eoaPrivateKey", eoaWallet.privateKey);

      const entryPointAddress = await getEntryPoint();
      const { aaAddress } = await deployAccountAbstraction(
        eoaWallet.address,
        entryPointAddress
      );
      localStorage.setItem("aaAddress", aaAddress);
      localStorage.setItem("username", username);

      const registerRes = await fetch(
        "http://127.0.0.1:5000/api/user/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: username,
            eoaAddress: eoaWallet.address,
            aaAddress: aaAddress,
          }),
        }
      );

      if (!registerRes.ok) {
        const errData = await registerRes.json();
        setMessage(errData.error || "Failed to register user on backend");
        setLoading(false);
        return;
      }

      router.push("/dashboard");
    } catch (err) {
      console.error("Error in SignUp:", err);
      setMessage("Failed to create wallets. Check console.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white font-sans px-6">
      <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-2xl p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-6">
          Create Your Nexa Wallet
        </h2>

        <form onSubmit={handleSignUp} className="space-y-4">
          <div>
            <label className="block text-gray-300 text-sm mb-1">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="e.g. mywallet123"
              className="w-full bg-white/20 text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-gray-300 text-sm mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="w-full bg-white/20 text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-gray-300 text-sm mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Repeat password"
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
            {loading ? "Creating Wallet..." : "Sign Up"}
          </button>
        </form>

        {message && (
          <p className="text-center text-sm mt-4 text-gray-300">{message}</p>
        )}

        <div className="text-center mt-6 text-gray-400 text-sm">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-blue-400 hover:text-blue-300 underline transition"
          >
            Log in
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
