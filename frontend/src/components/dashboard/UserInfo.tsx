"use client";
import { User } from "../../types";

export default function UserInfo({ user }: { user: User }) {
  return (
    <div className="absolute right-8 top-6 bg-gray-800/80 border border-gray-700 rounded-2xl shadow-lg p-4 flex items-center gap-4 backdrop-blur-md">
      <div className="w-10 h-10 rounded-full bg-blue-700 flex items-center justify-center text-lg font-bold">
        {user.username?.[0].toUpperCase() || "U"}
      </div>
      <div className="flex flex-col text-sm">
        <span className="font-semibold text-white">{`Your username: ${user.username}`}</span>
        <span className="text-gray-400">{`Your address: ${user.aaAddress.slice(
          0,
          6
        )}...${user.aaAddress.slice(-4)}`}</span>
      </div>
      {user.aaAddress && (
        <button
          onClick={() => navigator.clipboard.writeText(user.aaAddress)}
          className="ml-3 bg-blue-700 hover:bg-blue-800 px-3 py-1.5 rounded-lg text-xs font-medium transition cursor-pointer"
          title="Copy full address"
        >
          Copy Address
        </button>
      )}
    </div>
  );
}
