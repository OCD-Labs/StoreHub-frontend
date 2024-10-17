import { v2 as cloudinary } from "cloudinary";
import { NextRequest } from "next/server";

// Store environment variables in your .env.local file
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  secure: true,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req: NextRequest, res: Response) {
  try {
    const { imageURI } = await req.json();
    console.log(imageURI, "imageURI");

    const res = await cloudinary.uploader.upload(imageURI);

    return new Response(JSON.stringify({ fileUrl: res.secure_url }), {
      status: 200,
    });
  } catch (error) {
    console.error(error, "error");
    return new Response(JSON.stringify({ message: "Server upload error" }), {
      status: 500,
    });
  }
}
