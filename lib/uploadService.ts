export const uploadToCloudinary = async (imageURI: string) => {
  const res = await fetch("/api/upload", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      application: "application/json",
    },
    body: JSON.stringify({ imageURI }),
  });
  const img = await res.json();
  console.log(img, "img");

  const imageURL = img.fileUrl;
  return imageURL;
};
