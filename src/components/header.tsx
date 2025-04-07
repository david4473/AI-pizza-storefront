"use client";

import Link from "next/link";
import { Phone, Bot, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { useCart } from "@/context/cart-context";
import AIChat from "./ai-chat";

export default function Header() {
  const [showAIChat, setShowAIChat] = useState(false);
  const { toggleCart, totalItems } = useCart();

  useEffect(() => {
    if (showAIChat) {
      // Disable background scrolling when modal is open
      document.body.style.overflow = "hidden";
    } else {
      // Re-enable scrolling when modal is closed
      document.body.style.overflow = "auto";
    }

    // Cleanup when component is unmounted or modal is closed
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showAIChat]);

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
                  PIZZARIA
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

              {/* Cart Button */}
              <button
                onClick={toggleCart}
                className="relative p-2 text-amber-900 hover:text-amber-600"
              >
                <ShoppingCart size={22} />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-amber-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </button>

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
      <div className={`${showAIChat ? "visible" : "invisible"}`}>
        <AIChat onClose={() => setShowAIChat(false)} />
      </div>
    </>
  );
}
