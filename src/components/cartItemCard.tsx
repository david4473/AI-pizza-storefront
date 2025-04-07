"use client";

import { type CartItem } from "@/types";
import { X, Plus, Minus, Loader2 } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function CartItemCard({
  item,
  onRemove,
  onUpdateQuantity,
  isLoading,
}: {
  item: CartItem;
  onRemove: () => void;
  onUpdateQuantity: (quantity: number) => void;
  isLoading: boolean;
}) {
  return (
    <motion.div
      className="flex gap-3 p-3 border rounded-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, height: 0, marginTop: 0 }}
      transition={{ duration: 0.2 }}
    >
      {/* Pizza image */}
      <div className="relative w-20 h-20 rounded-md overflow-hidden flex-shrink-0">
        <Image
          src={item.image || "/placeholder.svg"}
          alt={item.name}
          fill
          className="object-cover"
        />
      </div>

      {/* Content */}
      <div className="flex-1">
        <div className="flex justify-between">
          <h4 className="font-medium text-amber-900">{item.name}</h4>
          <button
            onClick={onRemove}
            className="text-gray-400 hover:text-red-500"
            disabled={isLoading}
          >
            <X size={16} />
          </button>
        </div>

        <div className="text-sm text-gray-500 mb-2">
          ${item.price.toFixed(2)} each
        </div>

        {/* Quantity controls */}
        <div className="flex justify-between items-center">
          <div className="flex items-center border rounded-md">
            <button
              className="px-2 py-1 text-gray-500 hover:text-amber-600 disabled:opacity-50"
              onClick={() => onUpdateQuantity(item.quantity - 1)}
              disabled={isLoading}
            >
              <Minus size={14} />
            </button>
            <span className="px-2 py-1 text-sm">
              {isLoading ? (
                <Loader2 size={14} className="animate-spin" />
              ) : (
                item.quantity
              )}
            </span>
            <button
              className="px-2 py-1 text-gray-500 hover:text-amber-600 disabled:opacity-50"
              onClick={() => onUpdateQuantity(item.quantity + 1)}
              disabled={isLoading}
            >
              <Plus size={14} />
            </button>
          </div>

          <div className="font-medium">
            ${(item.price * item.quantity).toFixed(2)}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
