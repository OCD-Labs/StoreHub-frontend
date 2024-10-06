import { type NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  const { name, category } = await req.json();
  console.log(name, category, "name");
  if (!name || !category) {
    return Response.json(
      { message: "provide a name or category" },
      {
        status: 400,
      }
    );
  }

  const prompt = `A ${category} store named ${name} with a modern design`;
  const url = `https://api-inference.huggingface.co/models/black-forest-labs/FLUX.1-dev`;
  const headers = {
    Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
  };
  const response = await fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify({ inputs: prompt }),
  });

  if (!response.ok) {
    return Response.json(
      { message: "Failed to generate image" },
      {
        status: 500,
      }
    );
  }

  const data = await response.blob();
  let dataUri;
  await data.arrayBuffer().then(async (arrayBuffer) => {
    const buffer = Buffer.from(arrayBuffer);

    // Convert Buffer to Base64
    const base64Image = buffer.toString("base64");

    // Construct the Data URI
    dataUri = `data:${data.type};base64,${base64Image}`;

    console.log(dataUri); // This will print the Data URI
  });
  console.log(dataUri, "uri");

  return Response.json(
    { image: dataUri },
    {
      status: 200,
    }
  );
}
