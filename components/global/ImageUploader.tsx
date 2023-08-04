import React, { FC } from 'react'
import { useState } from 'react'
import { FileUploader } from 'react-drag-drop-files'
import { AdvancedImage } from '@cloudinary/react'
import { Cloudinary } from '@cloudinary/url-gen'
import { fill } from '@cloudinary/url-gen/actions/resize'
import { handleImageUpload } from '@app/services/uploadService'

export interface UploadImageProp {
  onUpdateImage: (value: void | ImageData) => void
}

const ImageUploader: FC<UploadImageProp> = ({
  onUpdateImage,
}: UploadImageProp) => {
  const [selectedImage, setSelectedImage] = useState<any>(null)

  const handleChange = (event: any) => {
    const file: File = event.target.files[0]
    UploadImage(file)
    if (file) {
      setSelectedImage(file)
    }
  }
  const UploadImage = async (file: File) => {
    await handleImageUpload(file)
      .then((data) => {
        onUpdateImage(data)
      })
      .catch((err) => console.log(err))
  }
  return (
    <div className="w-[40%]">
      <div>
        <div>
          <div className="flex items-center justify-center w-full">
            {selectedImage ? (
              <div>
                <img
                  alt="not found"
                  width={'250px'}
                  src={URL.createObjectURL(selectedImage)}
                />
                <br />
              </div>
            ) : (
              <label
                htmlFor="dropzone-file"
                className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg
                    className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 16"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                    />
                  </svg>
                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-semibold">Click to upload</span> or
                    drag and drop
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    SVG, PNG, JPG or GIF (MAX. 800x400px)
                  </p>
                </div>
                <input
                  id="dropzone-file"
                  type="file"
                  className="hidden"
                  onChange={handleChange}
                />
              </label>
            )}
          </div>

          <div className="flex justify-around md:justify-between mt-6">
            {/* <button>Edit Photo</button> */}
            <input
              id="dropzone-file"
              type="file"
              className="hidden"
              onChange={handleChange}
            />
            <label
              className="flex justify-center m-auto rounded-[10px] py-3 border border-black w-[40%]"
              htmlFor="dropzone-file"
            >
              Edit Photo
            </label>
            <button
              onClick={() => setSelectedImage(null)}
              className="rounded-[10px] py-3 text-white bg-[#161616] w-[40%]"
            >
              Delete
            </button>
          </div>
        </div>

        <br />
        <br />
      </div>
    </div>
  )
}

export default ImageUploader
