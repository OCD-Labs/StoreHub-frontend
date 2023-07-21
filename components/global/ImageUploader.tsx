import React from 'react'
import { useState } from 'react'
import { FileUploader } from 'react-drag-drop-files'
import { AdvancedImage } from '@cloudinary/react'
import { Cloudinary } from '@cloudinary/url-gen'
import { fill } from '@cloudinary/url-gen/actions/resize'

const ImageUploader = ({ onUpdateImage }: any) => {
  const [selectedImage, setSelectedImage] = useState<any>(null)
  const [imageData, setImageData] = useState<any>()
  const fileTypes: string[] = ['PNG', 'JPEG', 'GIF', 'WEBP', 'JPG']
  const preset_key = 'storehub-app'
  const cloud_name = 'duxnx9n5t'

  const handleChange = (event: any) => {
    const file = event.target.files[0]
    handleImageUpload(file)
    if (file) {
      setSelectedImage(file)
    }
  }
  const handleImageUpload = (file: any) => {
    const url = `https://api.cloudinary.com/v1_1/${cloud_name}/auto/upload`
    const formData = new FormData()
    formData.append('file', file)
    formData.append('upload_preset', preset_key)
    debugger
    fetch(url, {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())

      .then((data) => {
        onUpdateImage(data)
        setImageData((data: any) => {
          return data
        })

        console.log(data, 'imagedata')
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
            <button className="rounded-[10px] py-3 border border-black w-[40%]">
              Edit Photo
            </button>
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
