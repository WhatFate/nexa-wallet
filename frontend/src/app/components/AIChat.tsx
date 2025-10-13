"use client";
import { useState } from "react";

export const AIChat = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
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
              💬 Soon, you'll be able to ask the AI Agent any questions about
              Nexa Wallet. The agent's answers will be based on the project's
              official documentation.
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
  );
};
