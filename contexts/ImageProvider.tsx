"use client";
import React, { createContext, SetStateAction, useState } from "react";

type ImageContext = {
  imageURI: string;
  setImageURI: React.Dispatch<SetStateAction<string>>;
};

export const ImageContext = createContext<ImageContext>({
  imageURI: "",
  setImageURI: () => {},
});

function ImageProvider({ children }: { children: React.ReactNode }) {
  const [imageURI, setImageURI] = useState("");

  return (
    <ImageContext.Provider value={{ imageURI, setImageURI }}>
      {children}
    </ImageContext.Provider>
  );
}

export default ImageProvider;
