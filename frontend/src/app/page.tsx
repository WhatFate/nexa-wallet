"use client";

import { useState } from "react";

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white font-sans">
      <div className="text-center mb-10">
        <h1 className="text-5xl font-bold mb-3">Nexa Wallet</h1>
        <p className="text-gray-400 text-lg">
          Smart Wallet powered by AI & Account Abstraction
        </p>
      </div>

      <div className="flex space-x-6">
        <button className="button-log-in cursor-pointer">Log in</button>
        <button className="button-sign-up cursor-pointer">Sign up</button>
      </div>

      <footer className="absolute bottom-6 right-6 text-gray-500 text-sm">
        Built at ETHOnline 2025
      </footer>

      <div className="absolute top-180 left-6 flex flex-col space-y-4">
        <a
          href="#faq"
          className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-xl shadow-md text-center transform transition duration-300 hover:scale-105 cursor-pointer"
        >
          FAQ
        </a>
        <a
          href="#docs"
          className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-xl shadow-md text-center transform transition duration-300 hover:scale-105 cursor-pointer"
        >
          Docs
        </a>
        <a
          href="https://github.com/WhatFate/nexa-wallet"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-xl shadow-md text-center transform transition duration-300 hover:scale-105 cursor-pointer"
        >
          GitHub
        </a>
      </div>

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
