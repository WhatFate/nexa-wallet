"use client";
import { useState } from "react";

export interface Token {
  name: string;
  balance: string;
  price: string;
}

export default function TokenCard({ token }: { token: Token }) {
  const [menuVisible, setMenuVisible] = useState(false);

  return (
    <div className="relative p-6 bg-gray-800 rounded-2xl shadow-lg hover:bg-gray-700 transition-all">
      <button
        onClick={() => setMenuVisible(!menuVisible)}
        className="absolute top-2 right-2 w-6 h-6 bg-gray-700 rounded-full flex items-center justify-center text-xs font-bold hover:bg-gray-600"
      >
        ...
      </button>

      {menuVisible && (
        <div className="absolute top-8 right-2 bg-gray-900 border border-gray-700 rounded-lg shadow-lg flex flex-col py-1 z-50">
          <button className="px-3 py-1 text-sm hover:bg-gray-700 transition-all">
            Edit
          </button>
          <button className="px-3 py-1 text-sm hover:bg-gray-700 transition-all">
            Delete
          </button>
        </div>
      )}

      <h3 className="text-xl font-bold mb-2">{token.name}</h3>
      <p className="text-gray-300 text-lg">{token.balance}</p>
      <p className="text-gray-500 text-sm">{token.price}</p>
    </div>
  );
}
