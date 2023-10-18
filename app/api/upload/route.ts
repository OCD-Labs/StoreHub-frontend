import { v2 as cloudinary } from "cloudinary";
import { NextRequest } from "next/server";
import { NextApiRequest } from "next";
import { authOptions } from "../auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { validateFile } from "@app/services/uploadService";

// Store environment variables in your .env.local file
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  secure: true,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const config = {
  api: {
    bodyParser: false,
  },
};

async function convertFile(file: File) {
  const FileBuffer = await new Response(file).arrayBuffer(); //fil array buffer
  var base64 = btoa(
    new Uint8Array(FileBuffer).reduce(
      (data, byte) => data + String.fromCharCode(byte),
      ""
    )
  );
  const dataURI = "data:" + file.type + ";base64," + base64;
  return dataURI;
}

export async function POST(req: NextRequest, res: Response) {
  try {
    // const session = await getServerSession(authOptions);
    // console.log(session, "session");
    // if (!session)
    //   return new Response("Unauthorized access detected", { status: 401 });
    const formData = await req.formData();
    const file = formData.get("file") as File;
    validateFile(file);
    const imageData = await convertFile(file);
    const res = await cloudinary.uploader.upload(imageData);

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
