import { pizzas } from "@/data/pizzas";
import { tool } from "ai";
import { z } from "zod";

const pizzariaTool = tool({
  description: "Get all pizzas from the database",
  parameters: z.object({
    message: z
      .string()
      .describe("The message to get the get all pizza based on"),
  }),
  execute: async () => {
    return pizzas;
  },
});

export default async function getTools() {
  return {
    pizzariaTool,
  };
}
