const fileTypes: string[] = ["png", "jpeg", "gif", "webp", "jpg"];
const PRESET_KEY: string = "storehub-app";
const CLOUD_NAME: string = "duxnx9n5t";

export const handleImageUpload = async (file: File): Promise<void | string> => {
  const URL = `${process.env.NEXT_PUBLIC_BASE_URL}/api/upload`;
  const formData = new FormData();
  formData.append("file", file);
  debugger;
  try {
    const ImageData = await fetch(URL, {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data: string) => {
        console.log(data, "imagedata");
        return data;
      })
      .catch((err) => console.log(err))
      .finally();
    return ImageData;
  } catch (error) {
    console.log(error);
  }
};

export const validateFile = (file: File) => {
  const FILE_MAX_SIZE = 1024 * 1024 * 1; // 2 mb

  if (file.size > FILE_MAX_SIZE) {
    throw Error("The image is too large.");
  }
  const fileType = file.type.split("/");
  console.log(fileTypes.includes(fileType[1]), fileType[1], "includes?");

  if (fileType[0] !== "image" || !fileTypes.includes(fileType[1])) {
    console.log("invalid file type");

    throw new TypeError("Invalid file type");
  } else if (file.size > FILE_MAX_SIZE) {
    throw Error("The image is too large.");
  } else {
    console.log("valid");
  }
};
