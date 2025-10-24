"use client";
import TokenModal from "./TokenModal/TokenModal";
import { Token } from "../../types";
import { useState } from "react";

interface TokenCardProps {
  token: Token;
  activeMenu: string | null;
  setActiveMenu: (name: string | null) => void;
}
export default function TokenCard({
  token,
  activeMenu,
  setActiveMenu,
}: TokenCardProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const menuVisible = activeMenu === token.name;

  return (
    <>
      <div
        onClick={() => setModalOpen(true)}
        className="relative p-6 bg-gray-800 rounded-2xl shadow-lg hover:bg-gray-700 transition-all cursor-pointer"
      >
        <button
          onClick={(e) => {
            e.stopPropagation();
            setActiveMenu(menuVisible ? null : token.name);
          }}
          className="absolute top-2 right-2 w-6 h-6 bg-gray-700 rounded-full flex items-center justify-center text-xs font-bold hover:bg-gray-600 cursor-pointer"
        >
          ...
        </button>

        {menuVisible && token.address && (
          <div className="absolute top-8 right-2 bg-gray-900 border border-gray-700 rounded-lg shadow-lg flex flex-col py-1 z-50">
            <button
              onClick={(e) => {
                e.stopPropagation();
                console.log("Hide", token.name);
                setActiveMenu(null);
              }}
              className="px-3 py-1 text-sm hover:bg-gray-700 transition-all"
            >
              Hide {token.name}
            </button>
          </div>
        )}

        <h3 className="text-xl font-bold mb-2">{token.name}</h3>
        <p className="text-gray-300 text-lg">{token.balance}</p>
        <p className="text-gray-500 text-sm">{token.price}</p>
      </div>

      <TokenModal
        tokenName={token.name}
        symbol={token.symbol}
        balance={token.balance}
        price={token.price}
        tokenAddress={token.address || ""}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </>
  );
}
