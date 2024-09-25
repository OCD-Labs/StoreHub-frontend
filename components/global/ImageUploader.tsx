import React, { FC } from "react";
import { useState, useCallback } from "react";
// import { FileUploader } from "react-drag-drop-files";
// import { AdvancedImage } from "@cloudinary/react";
// import { Cloudinary } from "@cloudinary/url-gen";
// import { fill } from "@cloudinary/url-gen/actions/resize";
// import { handleImageUpload } from "@app/services/uploadService";
// import { validateFile } from "@app/services/uploadService";
// import { Button } from "@components/ui/Button";
// import { Label } from "@/components/ui/Label";
import { Upload, X } from "lucide-react";

export default function ImageUploader() {
  const [storeImage, setStoreImage] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  console.log(storeImage)

  const handleImageUpload = (file: File) => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setStoreImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragEnter = useCallback(
    (e: React.DragEvent<HTMLLabelElement>) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(true);
    },
    []
  );

  const handleDragLeave = useCallback(
    (e: React.DragEvent<HTMLLabelElement>) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);
    },
    []
  );

  const handleDragOver = useCallback((e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback((e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    handleImageUpload(file);
  }, []);

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
      </div>
    </div>
  );
}

// export interface handleImageProp {
//   onUpdateImage: (value: any) => void;
// }

// const ImageUploader: FC<handleImageProp> = ({
//   onUpdateImage,
// }: handleImageProp) => {

// const handleChange = (event: any) => {
//   const file: File = event.target.files[0];
//   try {
//     validateFile(file);
//     UploadImage(file);
//     if (file) {
//       setSelectedImage(file);
//       setError("");
//     }
//   } catch (error) {
//     setError(error + "");
//   }
// };
// const UploadImage = async (file: File) => {
//   console.log(await handleImageUpload(file), file);

//   await handleImageUpload(file)
//     .then((data) => {
//       onUpdateImage(data);
//     })
//     .catch((err) => {
//       throw new Error(err);
//     });
// };

// <div className="w-[100%] md:w-[45%] mt-5">
//   <div>
//     <div>
//       <div className="flex items-center justify-center w-full">
//         {selectedImage ? (
//           <div>
//             <img
//               alt="not found"
//               width={"250px"}
//               src={URL.createObjectURL(selectedImage)}
//             />
//             <br />
//           </div>
//         ) : (
//           <label
//             htmlFor="dropzone-file"
//             className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:bg-gray-200 hover:bg-gray-100 dark:border-gray-400 dark:hover:border-gray-400 dark:hover:bg-gray-600"
//           >
//             <div className="flex flex-col items-center justify-center pt-5 pb-6">
//               <svg
//                 className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
//                 aria-hidden="true"
//                 xmlns="http://www.w3.org/2000/svg"
//                 fill="none"
//                 viewBox="0 0 20 16"
//               >
//                 <path
//                   stroke="currentColor"
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth="2"
//                   d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
//                 />
//               </svg>
//               <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
//                 <span className="font-semibold">Click to upload</span> or
//                 drag and drop
//               </p>
//               <p className="text-xs text-gray-500 dark:text-gray-400">
//                 SVG, PNG, JPG or GIF (MAX. 800x400px)
//               </p>
//             </div>
//             <input
//               id="dropzone-file"
//               type="file"
//               className="hidden"
//               onChange={handleChange}
//             />
//           </label>
//         )}
//       </div>
//       {error ? <div className="text-red-400">{error}</div> : ""}
//       <div className="flex justify-around md:justify-between mt-6">

//         {/* <button>Edit Photo</button> */}
//         <input
//           id="dropzone-file"
//           type="file"
//           className="hidden"
//           onChange={handleChange}
//         />
//         <label
//           className="flex justify-center rounded-[10px] py-2 border border-black w-[40%] hover:bg-slate-200 cursor-pointer"
//           htmlFor="dropzone-file"
//         >
//           Edit Photo
//         </label>
//         <Button
//           variant="default"
//           onClick={() => setSelectedImage(null)}
//           className="rounded-[10px] py-3 text-white bg-[#161616] w-[40%]"
//         >
//           Delete
//         </Button>
//         {/* <button
//           onClick={() => setSelectedImage(null)}
//           className="rounded-[10px] py-3 text-white bg-[#161616] w-[40%]"
//         >
//           Delete
//         </button> */}
//       </div>
//     </div>

//     <br />
//     <br />
//   </div>
// </div>
//   );
// };

// export default ImageUploader;
