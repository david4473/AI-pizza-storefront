"use client";

import Link from "next/link";
import { Phone, Bot, X, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function Header() {
  const [showAIChat, setShowAIChat] = useState(false);

  return (
    <>
      <header className="bg-white border-b border-amber-100 sticky top-0 z-10">
        <div className="container mx-auto max-w-4xl px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo and Brand */}
            <div className="flex items-center">
              <Link href="/" className="flex items-center gap-2">
                <div className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-xl">P</span>
                </div>
                <span className="text-xl font-medium text-amber-900">
                  PIZZA PERFECTION
                </span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-6">
              <Link
                href="/about-us"
                className="text-amber-900 hover:text-amber-600"
              >
                About Us
              </Link>
              <Link
                href="/contact"
                className="text-amber-900 hover:text-amber-600"
              >
                Contact
              </Link>
            </nav>

            {/* Call to Action */}
            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center gap-2 text-amber-900">
                <Phone size={18} />
                <span className="font-medium">555-123-4567</span>
              </div>
              <Button
                className="bg-amber-600 hover:bg-amber-700 text-white flex items-center gap-2"
                onClick={() => setShowAIChat(true)}
              >
                <Bot size={18} />
                Ask Our AI
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* AI Chat Popup */}
      {showAIChat && <AIChat onClose={() => setShowAIChat(false)} />}
    </>
  );
}

function AIChat({ onClose }: { onClose: () => void }) {
  const [query, setQuery] = useState("");
  const [conversation, setConversation] = useState<
    { type: "user" | "ai"; message: string }[]
  >([
    {
      type: "ai",
      message:
        "Hi there! I'm Pizza Perfection's AI assistant. Ask me anything about our menu, ingredients, or special offers!",
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = () => {
    if (!query.trim()) return;

    // Add user message to conversation
    setConversation((prev) => [...prev, { type: "user", message: query }]);

    // Simulate AI response
    setIsLoading(true);
    setTimeout(() => {
      // This is where you would normally call your AI API
      const aiResponses = [
        "Our most popular pizza is the Margherita Supreme with fresh basil and buffalo mozzarella!",
        "Yes, we offer gluten-free crust options for all our pizzas at an additional $2.",
        "Our happy hour is from 3-5pm Tuesday through Friday with 20% off all appetizers!",
        "We use only organic tomatoes and locally sourced ingredients whenever possible.",
        "Our delivery area covers downtown and surrounding neighborhoods within a 5-mile radius.",
      ];
      const randomResponse =
        aiResponses[Math.floor(Math.random() * aiResponses.length)];

      setConversation((prev) => [
        ...prev,
        { type: "ai", message: randomResponse },
      ]);
      setIsLoading(false);
      setQuery("");
    }, 1000);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md flex flex-col h-[500px] max-h-[90vh]">
        {/* Header */}
        <div className="p-4 border-b flex items-center justify-between bg-amber-50 rounded-t-lg">
          <div className="flex items-center gap-2">
            <Bot className="text-amber-600" size={20} />
            <h3 className="font-medium text-amber-900">Pizza AI Assistant</h3>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={20} />
          </button>
        </div>

        {/* Conversation */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {conversation.map((item, index) => (
            <div
              key={index}
              className={`flex ${
                item.type === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[80%] p-3 rounded-lg ${
                  item.type === "user"
                    ? "bg-amber-600 text-white rounded-tr-none"
                    : "bg-gray-100 text-gray-800 rounded-tl-none"
                }`}
              >
                {item.message}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-gray-100 text-gray-800 p-3 rounded-lg rounded-tl-none max-w-[80%]">
                <div className="flex space-x-2">
                  <div
                    className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                    style={{ animationDelay: "0ms" }}
                  ></div>
                  <div
                    className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                    style={{ animationDelay: "150ms" }}
                  ></div>
                  <div
                    className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                    style={{ animationDelay: "300ms" }}
                  ></div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Input */}
        <div className="p-4 border-t">
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Ask about our menu, specials, or ingredients..."
              className="flex-1 border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
            <Button
              onClick={handleSend}
              className="bg-amber-600 hover:bg-amber-700 text-white p-2 rounded-md"
              disabled={isLoading || !query.trim()}
            >
              <Send size={18} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
