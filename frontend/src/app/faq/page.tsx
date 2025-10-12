"use client";

import { useState } from "react";
import Link from "next/link";

type FAQItem = {
  category: string;
  question: string;
  answer: string;
};

export default function FAQ() {
  const allFaqs: FAQItem[] = [
    { category: "AI", question: "How does the AI Agent work?", answer: "" },
    {
      category: "AI",
      question: "Can the AI analyze my transactions?",
      answer: "",
    },
    {
      category: "AI",
      question: "What's the purpose of AI agent?",
      answer: "",
    },
    {
      category: "Account Abstraction",
      question: "What is Account Abstraction?",
      answer: "",
    },
    {
      category: "Account Abstraction",
      question: "How does it simplify wallet usage?",
      answer: "",
    },
    {
      category: "Account Abstraction",
      question: "Is it free to create a wallet??",
      answer: "",
    },
    { category: "General", question: "What is Nexa Wallet?", answer: "" },
    { category: "General", question: "How do I create a wallet?", answer: "" },
  ];

  const categories = ["All", "AI", "Account Abstraction", "General"];
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const filteredFaqs =
    selectedCategory === "All"
      ? allFaqs
      : allFaqs.filter((faq) => faq.category === selectedCategory);

  return (
    <main className="relative min-h-screen flex flex-col items-center justify-start bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white font-sans py-16 px-4">
      <div className="w-full max-w-3xl mb-6">
        <Link
          href="/"
          className="absolute left-6 bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-xl shadow-md transition-transform transform hover:scale-105"
        >
          ← Back to Home
        </Link>
      </div>

      <h1 className="text-5xl font-bold mb-4 text-center">FAQ</h1>
      <p className="text-gray-400 text-lg text-center max-w-2xl mb-6">
        Frequently Asked Questions about Nexa Wallet. Select a category to
        filter questions.
      </p>

      <div className="flex space-x-4 mb-8">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-xl shadow-md transition-transform transform hover:scale-105 ${
              selectedCategory === category
                ? "bg-blue-600 text-white"
                : "bg-gray-700 text-gray-300 hover:bg-gray-600"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="w-full max-w-3xl">
        {filteredFaqs.map((faq, index) => (
          <div
            key={index}
            className="mb-4 border border-gray-700 rounded-xl overflow-hidden shadow-md"
          >
            <button
              onClick={() => toggle(index)}
              className="w-full flex justify-between items-center bg-gray-800 hover:bg-gray-700 px-6 py-4 text-left focus:outline-none"
            >
              <span className="text-lg font-medium">{faq.question}</span>
              <span className="text-xl transform transition-transform duration-300">
                {openIndex === index ? "−" : "+"}
              </span>
            </button>
            <div
              className={`px-6 bg-gray-900 text-gray-300 transition-all duration-300 overflow-hidden ${
                openIndex === index
                  ? "max-h-96 py-4 opacity-100"
                  : "max-h-0 py-0 opacity-0"
              }`}
            >
              {faq.answer || <em>Answer will be added soon...</em>}
            </div>
          </div>
        ))}
        {filteredFaqs.length === 0 && (
          <p className="text-gray-400 text-center mt-6">
            No questions in this category yet.
          </p>
        )}
      </div>
    </main>
  );
}
