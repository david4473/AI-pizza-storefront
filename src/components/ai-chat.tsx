"use client";

import { Bot, X, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";

export default function AIChat({ onClose }: { onClose: () => void }) {
  const [query, setQuery] = useState("");
  const [conversation, setConversation] = useState<
    { type: "user" | "ai"; message: string }[]
  >([
    {
      type: "ai",
      message:
        "Hi there! I'm Pizzaria's AI assistant. Ask me anything about our menu, ingredients, or special offers!",
    },
  ]);

  const [isLoading, setIsLoading] = useState(false);
  const messageContainerRef = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop =
        messageContainerRef.current.scrollHeight;
    }
  }, [conversation]);

  const handleSend = async () => {
    if (!query.trim()) return;

    const currentQuery = query;
    setQuery("");

    setConversation((prev) => [
      ...prev,
      { type: "user", message: currentQuery },
    ]);
    setIsLoading(true);

    const res = await fetch("/api/ai-agent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: currentQuery }),
    });

    const reader = res.body?.getReader();
    const decoder = new TextDecoder("utf-8");
    let aiMessage = "";

    setConversation((prev) => [...prev, { type: "ai", message: "" }]);

    if (reader) {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        aiMessage += chunk;

        // Update the last AI message in the conversation
        setConversation((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = { type: "ai", message: aiMessage };
          return updated;
        });
      }
    }

    setIsLoading(false);
    setQuery("");
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md flex flex-col h-[500px] max-h-[90vh]">
        {/* Header */}
        <div className="p-4 border-b flex items-center justify-between bg-amber-50 rounded-t-lg">
          <div className="flex items-center gap-2">
            <Bot className="text-amber-600" size={20} />
            <h3 className="font-medium text-amber-900">
              Pizzaria AI Assistant
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={20} />
          </button>
        </div>

        {/* Conversation */}
        <div
          ref={messageContainerRef}
          className="flex-1 overflow-y-auto p-4 space-y-4"
        >
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
                    : "bg-[#d8d8d8] text-gray-800 rounded-tl-none"
                }`}
              >
                <ReactMarkdown>{item.message}</ReactMarkdown>
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
