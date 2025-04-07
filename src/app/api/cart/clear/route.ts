import { NextResponse } from "next/server";
import { item } from "@/types";

// Simulating a database with an in-memory store
// This references the same variable as in the main cart route
const cartItems: { userId: string; items: item[] }[] = [];

// POST /api/cart/clear - Clear the cart
export async function POST(request: Request) {
  const userId = "user-123"; // Simulating a user ID

  // Simulate server delay
  await new Promise((resolve) => setTimeout(resolve, 300));

  // Find user's cart and clear it
  const cartIndex = cartItems.findIndex((cart) => cart.userId === userId);
  if (cartIndex >= 0) {
    cartItems[cartIndex].items = [];
  } else {
    cartItems.push({ userId, items: [] });
  }

  return NextResponse.json({ items: [] });
}
