"use client";

import { useState } from "react";
import { askAIBackend } from "@/lib/api";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export const AIChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const answer = await askAIBackend(userMessage.content);
      const aiMessage: Message = { role: "assistant", content: answer };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error("AI Chat error:", error);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Error contacting AI backend." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="absolute bottom-24 right-6 flex flex-col items-end space-y-2">
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full shadow-lg cursor-pointer transition-all"
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

          <div className="flex-1 overflow-y-auto space-y-2 text-sm p-2 rounded-lg scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-transparent">
            {messages.length === 0 ? (
              <p className="text-gray-400 text-center mt-20">
                Ask the AI anything about Nexa Wallet. Answers are based on
                project documentation.
              </p>
            ) : (
              messages.map((msg, i) => (
                <div
                  key={i}
                  className={`px-3 py-2 rounded-lg ${
                    msg.role === "user"
                      ? "bg-blue-600 text-white self-end ml-10"
                      : "bg-gray-700 text-gray-100 self-start mr-10"
                  }`}
                >
                  {msg.content}
                </div>
              ))
            )}
            {loading && (
              <p className="text-gray-400 text-center animate-pulse">
                Thinking...
              </p>
            )}
          </div>

          <div className="mt-3 flex">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Type your question..."
              className="flex-1 bg-white/20 text-white rounded-l-lg px-2 py-2 focus:outline-none"
              disabled={loading}
            />
            <button
              onClick={sendMessage}
              disabled={loading}
              className={`px-3 py-2 rounded-r-lg text-white transition-all ${
                loading
                  ? "bg-blue-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
