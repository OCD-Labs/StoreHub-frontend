import openai from "@lib/openapi";

import { type NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  const data = await req.json();

  if (!data || !data.text) {
    return Response.json(
      { message: "retry" },
      {
        status: 400,
      }
    );
  }
  // query openai using a free model
  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: "You are a helpful assistant." },
      {
        role: "user",
        content: data.text,
      },
    ],
  });

  console.log("---------------------");
  console.log(completion, "completion");
  console.log("---------------------");

  if (completion) {
    return Response.json(
      { message: completion },
      {
        status: 200,
      }
    );
  }

  return Response.json(
    { message: "couldnt generate description" },
    {
      status: 400,
    }
  );
}
