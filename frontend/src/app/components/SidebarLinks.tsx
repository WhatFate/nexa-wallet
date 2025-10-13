"use client";
import Link from "next/link";

export const SidebarLinks = () => {
  return (
    <div className="absolute top-180 left-6 flex flex-col space-y-4">
      <Link
        href="/faq"
        className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-xl shadow-md text-center transform transition duration-300 hover:scale-105 cursor-pointer"
      >
        FAQ
      </Link>
      <Link
        href="/docs"
        className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-xl shadow-md text-center transform transition duration-300 hover:scale-105 cursor-pointer"
      >
        Docs
      </Link>
      <a
        href="https://github.com/WhatFate/nexa-wallet"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-xl shadow-md text-center transform transition duration-300 hover:scale-105 cursor-pointer"
      >
        GitHub
      </a>
    </div>
  );
};
