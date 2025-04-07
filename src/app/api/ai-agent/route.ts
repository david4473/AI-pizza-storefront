import { NextRequest } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  baseURL: "https://api.deepseek.com",
  apiKey: process.env.AI_API_KEY,
});

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { message } = body;

  try {
    const stream = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content:
            "You are a Pizza AI assistant. You help users with everything related to pizza, including choosing toppings, finding pizza places, and giving pizza recommendations based on the available pizza.",
        },
        { role: "user", content: message },
      ],
      model: "deepseek-chat",
      stream: true,
    });

    const encoder = new TextEncoder();

    const readable = new ReadableStream({
      async start(controller) {
        for await (const chunk of stream) {
          const content = chunk.choices?.[0]?.delta?.content;
          if (content) {
            controller.enqueue(encoder.encode(content));
          }
        }
        controller.close();
      },
    });

    return new Response(readable, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Transfer-Encoding": "chunked",
      },
    });
  } catch (error) {
    console.log("Chat error: " + error);
  }
}
