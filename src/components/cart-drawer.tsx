"use client";

import { useCart } from "@/context/cart-context";
import { Button } from "@/components/ui/button";
import { X, ShoppingBag, Trash2, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import CartItemCard from "./cartItemCard";

export default function CartDrawer() {
  const {
    items,
    isOpen,
    closeCart,
    removeItem,
    updateQuantity,
    clearCart,
    subtotal,
    totalItems,
    isLoading,
    error,
    fetchCart,
  } = useCart();

  console.log(items);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <motion.div
        className="fixed inset-0 bg-black/50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={closeCart}
      />

      {/* Cart drawer */}
      <motion.div
        className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-xl flex flex-col"
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
      >
        {/* Header */}
        <div className="p-4 border-b flex items-center justify-between bg-amber-50">
          <div className="flex items-center gap-2">
            <ShoppingBag className="text-amber-600" size={20} />
            <h3 className="font-medium text-amber-900">
              Your Cart ({totalItems})
            </h3>
          </div>
          <button
            onClick={closeCart}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={20} />
          </button>
        </div>

        {/* Loading state */}
        {isLoading && (
          <div className="flex-1 flex items-center justify-center">
            <div className="flex flex-col items-center text-amber-600">
              <Loader2 className="h-8 w-8 animate-spin mb-2" />
              <p>Loading your cart...</p>
            </div>
          </div>
        )}

        {/* Error state */}
        {error && !isLoading && (
          <div className="flex-1 flex items-center justify-center p-4">
            <div className="bg-red-50 text-red-600 p-4 rounded-lg text-center">
              <p className="mb-2">{error}</p>
              <Button
                variant="outline"
                className="border-red-200 text-red-600 hover:bg-red-50"
                onClick={fetchCart}
              >
                Try Again
              </Button>
            </div>
          </div>
        )}

        {/* Cart items */}
        {!isLoading && !error && (
          <div className="flex-1 overflow-y-auto p-4">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-gray-500 space-y-4">
                <ShoppingBag size={64} className="text-amber-200" />
                <p>Your cart is empty</p>
                <Button
                  variant="outline"
                  className="mt-2 border-amber-200 text-amber-600"
                  onClick={closeCart}
                >
                  Continue Shopping
                </Button>
              </div>
            ) : (
              <AnimatePresence>
                <div className="space-y-4">
                  {items.map((item) => (
                    <CartItemCard
                      key={item.id}
                      item={item}
                      onRemove={() => removeItem(item.id)}
                      onUpdateQuantity={(quantity) =>
                        updateQuantity(item.id, quantity)
                      }
                      isLoading={isLoading}
                    />
                  ))}
                </div>
              </AnimatePresence>
            )}
          </div>
        )}

        {/* Footer with totals and checkout */}
        {!isLoading && !error && items.length > 0 && (
          <div className="border-t p-4 space-y-4">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Subtotal:</span>
              <span className="font-medium">${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Delivery:</span>
              <span className="font-medium">$3.99</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Tax:</span>
              <span className="font-medium">
                ${(subtotal * 0.08).toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between font-bold text-lg border-t pt-2">
              <span>Total:</span>
              <span>${(subtotal + 3.99 + subtotal * 0.08).toFixed(2)}</span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <Button
                variant="outline"
                className="border-amber-200 text-amber-600 hover:bg-amber-50"
                onClick={clearCart}
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loader2 size={16} className="mr-2 animate-spin" />
                ) : (
                  <Trash2 size={16} className="mr-2" />
                )}
                Clear Cart
              </Button>
              <Button
                className="bg-amber-600 hover:bg-amber-700 text-white"
                disabled={isLoading}
              >
                Checkout
              </Button>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
