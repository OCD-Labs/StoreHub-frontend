import inference from "@lib/openapi";

import { type NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  const input = await req.json();
  console.log(input, "input");
  let message = "";
  if (!input || !input.text) {
    return Response.json(
      { message: "retry" },
      {
        status: 400,
      }
    );
  }

  for await (const chunk of inference.chatCompletionStream({
    model: "microsoft/Phi-3-mini-4k-instruct",
    messages: [
      {
        role: "user",
        content:
          "write a very short description for my ecommerce store named kenedy, but limit to 50 words and the description should be a complete sentence",
      },
    ],
    max_tokens: 500,
  })) {
    console.log(chunk.choices[0]?.delta?.content);
    message = message + chunk.choices[0]?.delta?.content;
  }

  return Response.json(
    { message: message },
    {
      status: 200,
    }
  );
}
