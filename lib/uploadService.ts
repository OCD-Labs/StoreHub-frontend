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

export const uploadImagesToCloudinary = async (imageURIs: string[]) => {
  const imageUrls = [];

  for (const imageURI of imageURIs) {
    const imageUrl = await uploadToCloudinary(imageURI); // Call function for each image
    imageUrls.push(imageUrl); // Collect each uploaded URL
  }

  return imageUrls;
};
