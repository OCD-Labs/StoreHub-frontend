import { useState, FC } from "react";
import { handleImageUpload } from "@app/services/uploadService";

export interface UpdateImageProp {
  updateImage: (url: string) => void;
}

const AddImageUpload: FC<UpdateImageProp> = ({
  updateImage,
}: UpdateImageProp) => {
  const [image, setImage] = useState<any>(null);

  //image upload code
  const handleImageChange = (event: any) => {
    const file: File = event.target.files[0];

    if (file) {
      setImage(file);
    }
    uploadItemImage(file);
  };

  const uploadItemImage = async (file: File) => {
    //@ts-ignore
    await handleImageUpload(file).then((data: void | ImageData) => {
      if (data) {
        // @ts-ignore
        console.log(data.fileUrl, "item image");
        // @ts-ignore
        updateImage(data.fileUrl);
      }
    });
  };

  return (
    <div>
      {image ? (
        <div>
          <img
            alt="not found"
            width={"80px"}
            src={URL.createObjectURL(image)}
          />
          <br />
        </div>
      ) : (
        <label
          htmlFor="dropzone-file"
          className="flex flex-col items-center justify-center w-[80px] h-[80px] border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <div className="text-xs text-black p-4">upload image</div>
          </div>
          <input
            id="dropzone-file"
            type="file"
            className="hidden"
            onChange={handleImageChange}
          />
        </label>
      )}
    </div>
  );
};

export default AddImageUpload;
