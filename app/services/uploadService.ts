const fileTypes: string[] = ['PNG', 'JPEG', 'GIF', 'WEBP', 'JPG']
const PRESET_KEY: string = 'storehub-app'
const CLOUD_NAME: string = 'duxnx9n5t'

export const handleImageUpload = async (
  file: File,
): Promise<void | ImageData> => {
  const URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/auto/upload`
  const formData = new FormData()

  formData.append('file', file)
  formData.append('upload_preset', PRESET_KEY)
  // debugger
  const ImageData = await fetch(URL, {
    method: 'POST',
    body: formData,
  })
    .then((response) => response.json())
    .then((data: ImageData) => {
      console.log(data, 'imagedata')
      return data
    })
    .catch((err) => console.log(err))
    .finally()
  return ImageData
}
