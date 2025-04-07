import { pizzas } from "@/data/pizzas";
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json(pizzas);
}
