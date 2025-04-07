"use client";

import type { Pizza, CartContextType, CartItem } from "@/types";
import {
  createContext,
  useContext,
  useState,
  type ReactNode,
  useEffect,
} from "react";

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Calculate total items and subtotal
  const totalItems = items.reduce((total, item) => total + item.quantity, 0);
  const subtotal = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // Fetch cart from server on mount
  useEffect(() => {
    fetchCart();
  }, []);

  // Fetch cart items from server
  const fetchCart = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch("/api/cart");

      if (!response.ok) {
        throw new Error("Failed to fetch cart");
      }

      const data = await response.json();

      setItems(data.items);
    } catch (err) {
      console.error("Error fetching cart:", err);
      setError("Failed to load your cart. Please try again.");

      // Fallback to localStorage if server fetch fails
      const savedCart = localStorage.getItem("pizzaCart");
      if (savedCart) {
        try {
          setItems(JSON.parse(savedCart));
        } catch (e) {
          console.error("Failed to parse saved cart", e);
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Save cart to localStorage as backup
  useEffect(() => {
    localStorage.setItem("pizzaCart", JSON.stringify(items));
  }, [items]);

  // Add item to cart
  const addItem = async (item: Pizza) => {
    console.log("this ran");

    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch("/api/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: item.id }),
      });

      if (!response.ok) {
        throw new Error("Failed to add item to cart");
      }

      const data = await response.json();
      setItems(data.items);

      // Open cart when adding items
      setIsOpen(true);
    } catch (err) {
      console.error("Error adding item to cart:", err);
      setError("Failed to add item to cart. Please try again.");

      // Fallback: update client-side state if server request fails
      setItems((prevItems) => {
        const existingItem = prevItems.find((i) => i.id === item.id);

        if (existingItem) {
          return prevItems.map((i) =>
            i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
          );
        } else {
          return [...prevItems, { ...item, quantity: 1 }];
        }
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Remove item from cart
  const removeItem = async (itemId: string) => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch(`/api/cart?id=${itemId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to remove item from cart");
      }

      const data = await response.json();
      setItems(data.items);
    } catch (err) {
      console.error("Error removing item from cart:", err);
      setError("Failed to remove item. Please try again.");

      // Fallback: update client-side state if server request fails
      setItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
    } finally {
      setIsLoading(false);
    }
  };

  // Update item quantity
  const updateQuantity = async (itemId: string, quantity: number) => {
    try {
      setIsLoading(true);
      setError(null);

      if (quantity <= 0) {
        await removeItem(itemId);
        return;
      }

      const response = await fetch("/api/cart", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: itemId, quantity }),
      });

      if (!response.ok) {
        throw new Error("Failed to update item quantity");
      }

      const data = await response.json();
      setItems(data.items);
    } catch (err) {
      console.error("Error updating item quantity:", err);
      setError("Failed to update quantity. Please try again.");

      // Fallback: update client-side state if server request fails
      if (quantity <= 0) {
        setItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
      } else {
        setItems((prevItems) =>
          prevItems.map((item) =>
            item.id === itemId ? { ...item, quantity } : item
          )
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Clear cart
  const clearCart = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch("/api/cart/clear", {
        method: "POST",
      });

      if (!response.ok) {
        throw new Error("Failed to clear cart");
      }

      setItems([]);
    } catch (err) {
      console.error("Error clearing cart:", err);
      setError("Failed to clear cart. Please try again.");

      // Fallback: clear client-side state if server request fails
      setItems([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Cart open/close functions
  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);
  const toggleCart = () => setIsOpen((prev) => !prev);

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        isOpen,
        openCart,
        closeCart,
        toggleCart,
        totalItems,
        subtotal,
        isLoading,
        error,
        fetchCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
