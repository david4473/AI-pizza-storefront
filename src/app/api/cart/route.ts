import { NextResponse } from "next/server";
import { pizzas } from "@/data/pizzas";
import { item } from "@/types";

// Simulating a database with an in-memory store
const cartItems: { userId: string; items: item[] }[] = [];

// Helper to get a user's cart
function getUserCart(userId: string) {
  const userCart = cartItems.find((cart) => cart.userId === userId);
  if (!userCart) {
    const newCart = { userId, items: [] };
    cartItems.push(newCart);
    return newCart;
  }
  return userCart;
}

// GET - Get cart items
export async function GET(request: Request) {
  const userId = "user-123"; // Simulating a user ID

  // Simulate server delay
  await new Promise((resolve) => setTimeout(resolve, 300));

  const cart = getUserCart(userId);

  // Fetch full pizza details for each item in cart
  const itemsWithDetails = cart.items.map((item) => {
    const pizzaDetails = pizzas.find((p) => p.id === item.id);
    return {
      ...pizzaDetails,
      quantity: item.quantity,
    };
  });

  return NextResponse.json({ items: itemsWithDetails });
}

// POST - Add item to cart
export async function POST(request: Request) {
  const userId = "user-123"; // Simulating a user ID
  const data = await request.json();
  const { id } = data;

  // Simulate server delay
  await new Promise((resolve) => setTimeout(resolve, 300));

  // Find the pizza in our "database"
  const pizzaToAdd = pizzas.find((p) => p.id === id);
  if (!pizzaToAdd) {
    return NextResponse.json({ error: "Pizza not found" }, { status: 404 });
  }

  const cart = getUserCart(userId);

  // Check if item already exists in cart
  const existingItemIndex = cart.items.findIndex((item) => item.id === id);

  if (existingItemIndex >= 0) {
    // Increment quantity if item exists
    cart.items[existingItemIndex].quantity += 1;
  } else {
    // Add new item with quantity 1
    cart.items.push({ id, quantity: 1 });
  }

  // Return updated cart with full details
  const itemsWithDetails = cart.items.map((item) => {
    const pizzaDetails = pizzas.find((p) => p.id === item.id);
    return {
      ...pizzaDetails,
      quantity: item.quantity,
    };
  });

  return NextResponse.json({ items: itemsWithDetails });
}

// PUT /api/cart/:id - Update item quantity
export async function PUT(request: Request) {
  const userId = "user-123";
  const data = await request.json();
  const { id, quantity } = data;

  // Simulate server delay
  await new Promise((resolve) => setTimeout(resolve, 300));

  const cart = getUserCart(userId);

  if (quantity <= 0) {
    // Remove item if quantity is 0 or negative
    cart.items = cart.items.filter((item) => item.id !== id);
  } else {
    // Update quantity
    const itemIndex = cart.items.findIndex((item) => item.id === id);
    if (itemIndex >= 0) {
      cart.items[itemIndex].quantity = quantity;
    } else {
      return NextResponse.json(
        { error: "Item not found in cart" },
        { status: 404 }
      );
    }
  }

  // Return updated cart with full details
  const itemsWithDetails = cart.items.map((item) => {
    const pizzaDetails = pizzas.find((p) => p.id === item.id);
    return {
      ...pizzaDetails,
      quantity: item.quantity,
    };
  });

  return NextResponse.json({ items: itemsWithDetails });
}

// DELETE /api/cart/:id - Remove item from cart
export async function DELETE(request: Request) {
  const userId = "user-123";
  const url = new URL(request.url);
  const id = url.searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "Item ID is required" }, { status: 400 });
  }

  // Simulate server delay
  await new Promise((resolve) => setTimeout(resolve, 300));

  const cart = getUserCart(userId);

  // Remove item from cart
  cart.items = cart.items.filter((item) => item.id !== id);

  // Return updated cart with full details
  const itemsWithDetails = cart.items.map((item) => {
    const pizzaDetails = pizzas.find((p) => p.id === item.id);
    return {
      ...pizzaDetails,
      quantity: item.quantity,
    };
  });

  return NextResponse.json({ items: itemsWithDetails });
}
