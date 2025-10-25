"use client";

import { useEffect, useRef, useState } from "react";
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
  const [chatSize, setChatSize] = useState({ width: 320, height: 420 });
  const [isResizing, setIsResizing] = useState(false);
  const chatRef = useRef<HTMLDivElement | null>(null);
  const endOfMessagesRef = useRef<HTMLDivElement | null>(null);

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

  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const handleMouseDown = () => setIsResizing(true);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizing) return;
      setChatSize((size) => ({
        width: Math.min(Math.max(280, size.width - e.movementX), 600),
        height: Math.min(Math.max(300, size.height - e.movementY), 700),
      }));
    };
    const handleMouseUp = () => setIsResizing(false);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isResizing]);

  return (
    <div className="fixed bottom-6 right-6 flex flex-col items-end z-50 space-y-2">
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-full shadow-lg transition-all transform hover:scale-105 cursor-pointer"
        >
          AI Chat
        </button>
      )}

      {isOpen && (
        <div
          ref={chatRef}
          style={{
            width: chatSize.width,
            height: chatSize.height,
            transition: isResizing ? "none" : "0.2s ease",
          }}
          className="bg-gray-900/90 backdrop-blur-lg border border-gray-700 rounded-2xl shadow-xl flex flex-col p-4 relative"
        >
          <div
            onMouseDown={handleMouseDown}
            className="absolute top-1 left-1 w-4 h-4 cursor-nwse-resize opacity-70 hover:opacity-100"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M20 4H4M16 8H4M12 12H4"
              />
            </svg>
          </div>

          <div className="flex justify-between items-center mb-3 border-b border-gray-700 pb-2">
            <h2 className="text-white font-semibold">Nexa AI Assistant</h2>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-gray-200 text-xl font-bold cursor-pointer"
            >
              ✕
            </button>
          </div>

          <div className="flex-1 overflow-y-auto pr-1 space-y-2 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent">
            {messages.length === 0 ? (
              <p className="text-gray-400 text-center mt-20">
                Ask the AI anything about Nexa Wallet. Answers are based on the
                official project documentation.
              </p>
            ) : (
              messages.map((msg, i) => (
                <div
                  key={i}
                  className={`px-3 py-2 rounded-lg max-w-[85%] ${
                    msg.role === "user"
                      ? "bg-blue-600 text-white self-end ml-auto"
                      : "bg-gray-700 text-gray-100 self-start"
                  }`}
                >
                  {msg.content}
                </div>
              ))
            )}
            {loading && (
              <p className="text-gray-500 text-center animate-pulse">
                Thinking...
              </p>
            )}
            <div ref={endOfMessagesRef} />
          </div>

          <div className="mt-3 flex items-stretch gap-2 min-h-[40px]">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Type your question..."
              className="flex-1 min-w-0 bg-gray-800 text-white placeholder-gray-500 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
              disabled={loading}
            />
            <button
              onClick={sendMessage}
              disabled={loading}
              className={`px-3 sm:px-4 py-2 rounded-lg font-semibold text-white shrink-0 transition-all ${
                loading
                  ? "bg-blue-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 cursor-pointer"
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
