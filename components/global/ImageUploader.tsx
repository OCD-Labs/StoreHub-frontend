import React, { FC, useState } from "react";

import { Upload, X, Loader } from "lucide-react";
import { useContext } from "react";
import { ImageContext } from "@contexts/ImageProvider";

export default function ImageUploader({
  name,
  category,
}: {
  name: string;
  category: string;
}) {
  const [storeImage, setStoreImage] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const [imageGenerationError, setImageGenerationError] = useState<
    string | null
  >(null);
  const { imageURI, setImageURI } = useContext(ImageContext);

  console.log(storeImage);

  const fileTypes = ["image/jpeg", "image/gif", "image/png", "image/webp"];

  // valid file type
  function validFileType(file: File) {
    return fileTypes.includes(file.type);
  }
  // valid file size
  function validFileSize(file: File) {
    return file.size / 1024 / 1024 < 10;
  }

  const handleImageUpload = (file: File) => {
    console.log(file, "filee");
    if (!validFileType(file)) {
      setImageGenerationError(
        "Please select an image file (jpg, jpeg, png, webp)"
      );
      return;
    }

    if (!validFileSize(file)) {
      setImageGenerationError("Please select an image smaller than 10MB");
      return;
    }
    setImageGenerationError(null);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageURI(reader.result as string);
        setStoreImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragEnter = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    handleImageUpload(file);
  };

  const getImageUrl = async (name: string, category: string): Promise<any> => {
    console.log(name, category, "name");
    if (!name || !category) {
      return new Error("provide a name or category");
    }

    const prompt = `A ${category} store named ${name} with a modern design`;
    const url = `https://api-inference.huggingface.co/models/black-forest-labs/FLUX.1-dev`;
    const headers = {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_HUGGINGFACE_API_KEY}`,
    };
    const response = await fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify({ inputs: prompt }),
    });

    if (!response.ok) {
      return new Error("Failed to generate image");
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

    return { image: dataUri };
  };

  const generateImage = async () => {
    setIsGeneratingImage(true);
    setImageGenerationError(null);
    try {
      // Assuming there's a function to generate an image using an AI model
      const res = getImageUrl(name, category);
      const imageResponse = await res;
      setImageURI(imageResponse.image);
      setStoreImage(imageResponse.image);
    } catch (error) {
      console.log(error, "imageerror");

      setImageGenerationError("Unable to generate image. Please try again.");
    } finally {
      setIsGeneratingImage(false);
    }
  };

  return (
    <div className="w-full lg:w-1/3 md:mb-4 space-y-4">
      <div className="space-y-2">
        <label
          htmlFor="store-image"
          className="block text-sm font-medium text-gray-700"
        >
          Store Image
        </label>
        <div className="flex items-center justify-center w-full">
          <label
            htmlFor="store-image"
            className={`flex flex-col items-center justify-center w-full h-64 border-2 ${
              isDragging ? "border-indigo-600" : "border-gray-300"
            } border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors duration-300`}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            {storeImage ? (
              <div className="relative w-full h-full">
                <img
                  src={storeImage}
                  alt="Store preview"
                  className="w-full h-full object-cover rounded-lg"
                />
                <button
                  type="button"
                  className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                  onClick={() => setStoreImage(null)}
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <Upload className="w-8 h-8 mb-4 text-gray-500" />
                <p className="mb-2 text-sm text-gray-500 text-center">
                  <span className="font-semibold">Click to upload</span> or drag
                  and drop
                </p>
                <p className="text-xs text-gray-500">
                  PNG, JPG or GIF (MAX. 800x400px)
                </p>
              </div>
            )}
            <input
              id="store-image"
              type="file"
              className="hidden"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleImageUpload(file);
              }}
            />
          </label>
        </div>
        {name && category ? (
          <button
            type="button"
            className="w-full py-2 px-4 bg-dark text-white rounded hover:bg-dark/70 transition duration-300"
            onClick={generateImage}
            disabled={isGeneratingImage}
          >
            {isGeneratingImage ? (
              <div className="flex justify-center items-center gap-4">
                {" "}
                <Loader className="animate-spin">
                  <span className="sr-only">Loading...</span>
                </Loader>{" "}
                <span>Generating image...</span>
              </div>
            ) : (
              "Generate Image"
            )}
          </button>
        ) : null}
        {isGeneratingImage && (
          <p className="text-sm text-gray-500 text-center">
            This may take a while to finish :)
          </p>
        )}

        {imageGenerationError && (
          <p className="text-red-500">{imageGenerationError}</p>
        )}
      </div>
    </div>
  );
}
