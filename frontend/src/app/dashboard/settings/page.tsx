"use client";

import Sidebar from "@/components/dashboard/Sidebar";
import { AIChat } from "@/components/AIChat";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Settings() {
  const [theme, setTheme] = useState("dark");
  const [loading, setLoading] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const router = useRouter();

  const handleAction = async (msg: string) => {
    setLoading(true);
    await new Promise((res) => setTimeout(res, 300));
    alert(msg);
    setLoading(false);
  };

  const handleLogout = () => {
    setShowLogoutModal(true);
  };

  const confirmLogout = () => {
    setShowLogoutModal(false);
    localStorage.clear();
    router.push("/");
  };

  const cancelLogout = () => {
    setShowLogoutModal(false);
  };

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  const buttonClass =
    "px-4 py-2 rounded-xl text-lg font-semibold shadow-md transition-all hover:scale-105 disabled:opacity-60 disabled:cursor-not-allowed w-full text-left";

  return (
    <main className="min-h-screen w-full flex bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white font-sans overflow-hidden">
      <Sidebar />

      <section className="ml-60 md:ml-64 flex flex-col flex-grow w-full px-8 py-8 relative">
        <div className="text-center mt-10">
          <h2 className="text-4xl font-bold mb-2">Settings</h2>
          <p className="text-gray-400 max-w-md mx-auto">
            Manage your AA wallet, security, appearance, and preferences
          </p>
        </div>

        <div className="space-y-10 w-full max-w-5xl mx-auto mt-10">
          <div className="bg-gray-900/70 border border-gray-800 rounded-3xl shadow-xl p-8">
            <h3 className="text-2xl font-semibold mb-4">Account & Security</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <button
                  onClick={() => handleAction("Change Password")}
                  disabled={loading}
                  className={`${buttonClass} bg-blue-700 hover:bg-blue-800 cursor-pointer`}
                >
                  Change Password
                </button>
                <p className="text-gray-400 text-sm mt-1">
                  Update your account password for login.
                </p>
              </div>
              <div>
                <button
                  onClick={() => handleAction("Toggle 2FA")}
                  disabled={loading}
                  className={`${buttonClass} bg-blue-700 hover:bg-blue-800 cursor-pointer`}
                >
                  Toggle 2FA
                </button>
                <p className="text-gray-400 text-sm mt-1">
                  Enable or disable two-factor authentication for added
                  security.
                </p>
              </div>
              <div>
                <button
                  onClick={() => handleAction("Create New AA Wallet")}
                  disabled={loading}
                  className={`${buttonClass} bg-blue-700 hover:bg-blue-800 cursor-pointer`}
                >
                  Create New AA Wallet
                </button>
                <p className="text-gray-400 text-sm mt-1">
                  Generate a new account abstraction wallet.
                </p>
              </div>
              <div>
                <button
                  onClick={() => handleAction("Recover Wallet")}
                  disabled={loading}
                  className={`${buttonClass} bg-blue-700 hover:bg-blue-800 cursor-pointer`}
                >
                  Recover Wallet
                </button>
                <p className="text-gray-400 text-sm mt-1">
                  Recover your wallet using a seed phrase.
                </p>
              </div>
              <div>
                <button
                  onClick={() => handleAction("Import AA Wallet")}
                  disabled={loading}
                  className={`${buttonClass} bg-blue-700 hover:bg-blue-800 cursor-pointer`}
                >
                  Import AA Wallet
                </button>
                <p className="text-gray-400 text-sm mt-1">
                  Import an existing account abstraction wallet.
                </p>
              </div>
              <div>
                <button
                  onClick={() => handleAction("Switch Active Wallet")}
                  disabled={loading}
                  className={`${buttonClass} bg-blue-700 hover:bg-blue-800 cursor-pointer`}
                >
                  Switch Active Wallet
                </button>
                <p className="text-gray-400 text-sm mt-1">
                  Switch between multiple AA wallets.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gray-900/70 border border-gray-800 rounded-3xl shadow-xl p-8">
            <h3 className="text-2xl font-semibold mb-4">
              Wallet & Transactions
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <button
                  onClick={() => handleAction("View Transaction History")}
                  className={`${buttonClass} bg-blue-500 hover:bg-blue-600 cursor-pointer`}
                >
                  View Transaction History
                </button>
                <p className="text-gray-400 text-sm mt-1">
                  See all your past transactions in one place.
                </p>
              </div>
              <div>
                <button
                  onClick={() => handleAction("Export Wallet / Keys")}
                  className={`${buttonClass} bg-gray-700 hover:bg-gray-800 cursor-pointer`}
                >
                  Export Wallet / Keys
                </button>
                <p className="text-gray-400 text-sm mt-1">
                  Export your wallet keys for backup or migration.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gray-900/70 border border-gray-800 rounded-3xl shadow-xl p-8">
            <h3 className="text-2xl font-semibold mb-4">
              Appearance & Preferences
            </h3>
            <div className="flex flex-wrap gap-4">
              {["dark", "light", "blue"].map((t) => (
                <div key={t}>
                  <button
                    onClick={() => handleThemeChange(t)}
                    className={`${buttonClass} ${
                      theme === t
                        ? "bg-green-500 hover:bg-green-600 cursor-pointer"
                        : "bg-gray-700 hover:bg-gray-800 cursor-pointer"
                    }`}
                  >
                    {t.charAt(0).toUpperCase() + t.slice(1)}
                  </button>
                  <p className="text-gray-400 text-sm mt-1">
                    {`Switch to ${t} theme.`}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gray-900/70 border border-gray-800 rounded-3xl shadow-xl p-8 mt-6">
            <h3 className="text-2xl font-semibold mb-4">Danger Zone</h3>
            <button
              onClick={handleLogout}
              disabled={loading}
              className={`${buttonClass} bg-red-600 hover:bg-red-700 cursor-pointer`}
            >
              Log Out
            </button>
            <p className="text-gray-400 text-sm mt-1">
              Log out from your account securely.
            </p>
          </div>
        </div>
      </section>

      <AIChat />
      {showLogoutModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 w-80 text-center">
            <h2 className="text-xl font-bold mb-4 text-white">
              Are you sure you want to log out?
            </h2>
            <div className="flex justify-around mt-6">
              <button
                onClick={confirmLogout}
                className="px-6 py-2 bg-red-600 hover:bg-red-700 rounded-lg font-semibold"
              >
                Yes
              </button>
              <button
                onClick={cancelLogout}
                className="px-6 py-2 bg-gray-700 hover:bg-gray-800 rounded-lg font-semibold"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
