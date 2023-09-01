import { Dispatch, SetStateAction, useState } from 'react'
import AddImageUpload from './addImageUpload'
import { SubmitHandler, useForm } from 'react-hook-form'
import { BASE_URL } from '@components/util/config'
import { ModalOptions, modalstore } from '@app/StoreManager/modalstore'
import useProfile from '@app/hooks/useProfile'

interface PropsInterface {
  userID: string | null
  id: string | null
  addItemStatus: any
  options: ModalOptions
}

const AddItemModal: React.FC<PropsInterface> = ({
  userID,
  id,
  addItemStatus,
  options,
}) => {
  type FormData = {
    name: string
    description: string
    price: string
    image_urls: string[]
    cover_img_url: string
    category: string
    discount_percentage: string
    supply_quantity: number
  }
  const [images, setImages] = useState<string[]>([])
  const updateImage = (imgurl: string) => {
    images.push(imgurl)
    console.log(images)
  }
  const [formData, setFormData] = useState<any>({
    name: '',
    description: '',
    price: '',
    image_urls: [
      'https://res.cloudinary.com/duxnx9n5t/image/upload/v1689930570/bh8ys2dnwq7ttaxs3gpz.jpg',
    ],
    cover_img_url: 'string',
    category: 'Fashion',
    discount_percentage: '',
    supply_quantity: 1,
  })

  const toggleModal = modalstore((state) => state.toggleModal)
  const user: Session | undefined = useProfile().getSession()
  console.log(user, 'user oo')

  const addStoreProducts = async () => {
    debugger

    const itemData = {
      name: formData.name,
      description: formData.description,
      price: formData.price,
      image_urls: images,
      cover_img_url: 'string',
      category: formData.category,
      discount_percentage: formData.discount_percentage,
      supply_quantity: parseInt(formData.supply_quantity),
      status: 'VISIBLE',
    }
    const method = options.title == 'update store' ? 'PATCH' : 'POST'
    debugger
    try {
      fetch(options.url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user ? user.access_token : ''}`,
        },
        body: JSON.stringify(itemData),
      })
        .then((response) => {
          console.log(response.clone().json())

          return response.json()
        })
        .then((data: any) => {
          addItemStatus(data?.status, options.title)
          console.log(data, 'store items')
        })
    } catch (error) {
      console.log(error, 'error from call')
      addItemStatus('error')
    }
  }

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLTextAreaElement>,
  ): void => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
    console.log(formData, 'formData')
  }

  const handleFormSubmit: SubmitHandler<IFormInputs> = () => {
    // e.preventDefault();
    // debugger;
    toggleModal(options)
    addStoreProducts()
  }

  //form validation
  interface IFormInputs {
    name: string
    description: string
    price: string
    image_urls: string[]
    category: string
    discount_percentage: string
    supply_quantity: number
  }

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IFormInputs>()

  return (
    <>
      <div className="z-30">
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <div className="mt-6 md:mt-0 lg:w-[90%]">
            <span className="lg:flex lg:justify-end gap-3 md:py-4">
              <label>Item Name</label>
              <div className="lg:w-[75%] w-full">
                <input
                  {...register('name', {
                    required: 'Store name is required',
                    minLength: {
                      value: 3,
                      message: 'Store name must be at least 3 characters',
                    },
                    maxLength: {
                      value: 50,
                      message: 'Store name cannot exceed 50 characters',
                    },
                  })}
                  name="name"
                  onChange={handleChange}
                  value={formData.name}
                  placeholder="Wrist watch"
                  className="focus:border-blue block w-full md:gap-[30px] rounded-md border-1 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 my-2 lg:my-0"
                />
                <span>
                  {errors.name && (
                    <p className="text-red-500 mb-2">{errors.name.message}</p>
                  )}
                </span>
              </div>
            </span>
            <span className="lg:flex gap-3 lg:py-4 lg:justify-end">
              <label>Description</label>
              <div className="w-full lg:w-[75%]">
                <textarea
                  {...register('description', {
                    required: 'Description is required',
                    minLength: {
                      value: 10,
                      message: 'Description must be at least 10 characters',
                    },
                    maxLength: {
                      value: 200,
                      message: 'Description cannot exceed 200 characters',
                    },
                  })}
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Best farmland produces at your door step"
                  className="block w-full md:gap-[30px] rounded-md border-1 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 my-2 lg:my-0"
                />
                <span>
                  {errors.description && (
                    <p className="text-red-500 mb-2">
                      {errors.description.message}
                    </p>
                  )}
                </span>
              </div>
            </span>
            <span className="lg:flex gap-3 md:py-4 md:justify-end md:items-center">
              <label>Price</label>
              <div className="lg:w-[75%] w-full">
                <input
                  {...register('price', {
                    required: 'Store name is required',
                    minLength: {
                      value: 3,
                      message: 'Store name must be at least 3 characters',
                    },
                    maxLength: {
                      value: 50,
                      message: 'Store name cannot exceed 50 characters',
                    },
                  })}
                  name="price"
                  onChange={handleChange}
                  value={formData.price}
                  placeholder="Farmland Groceries Store"
                  className="focus:border-blue block w-full md:gap-[30px] rounded-md border-1 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 my-2 lg:my-0"
                />
                <span>
                  {errors.name && (
                    <p className="text-red-500 mb-2">{errors.name.message}</p>
                  )}
                </span>
              </div>
            </span>
            <span className="flex flex-col md:items-center md:py-4">
              <label className="mr-2 md:mr-4">Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="rounded-md border-1 px-2.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 my-2 lg:my-0"
              >
                <option>Fashion</option>
                <option>Books</option>
                <option>Electronics</option>
                <option>Apparels</option>
                <option>Food & Fruits</option>
              </select>
            </span>
            <span className="lg:flex gap-3 md:py-4 lg:justify-end lg:items-center">
              <label>Discount</label>
              <div className="lg:w-[75%] w-full">
                <input
                  //   {...register("discount_percentage", {
                  //     required: "Store name is required",
                  //     minLength: {
                  //       value: 3,
                  //       message: "Store name must be at least 3 characters",
                  //     },
                  //     maxLength: {
                  //       value: 50,
                  //       message: "Store name cannot exceed 50 characters",
                  //     },
                  //   })}
                  name="discount_percentage"
                  onChange={handleChange}
                  value={formData.discount_percentage}
                  placeholder="Farmland Groceries Store"
                  className="focus:border-blue block w-full md:gap-[30px] rounded-md border-1 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 my-2 lg:my-0"
                />
                <span>
                  {errors.name && (
                    <p className="text-red-500 mb-2">{errors.name.message}</p>
                  )}
                </span>
              </div>
            </span>
            <span className="lg:flex gap-3 lg:py-4 lg:justify-end lg:items-center">
              <label>Supply Quatntity</label>
              <div className="lg:w-[75%] w-full">
                <input
                  //   {...register("name", {
                  //     required: "Store name is required",
                  //     minLength: {
                  //       value: 3,
                  //       message: "Store name must be at least 3 characters",
                  //     },
                  //     maxLength: {
                  //       value: 50,
                  //       message: "Store name cannot exceed 50 characters",
                  //     },
                  //   })}
                  name="supply_quantity"
                  onChange={handleChange}
                  type="number"
                  min={1}
                  value={parseInt(formData.supply_quantity)}
                  placeholder="Farmland Groceries Store"
                  className="focus:border-blue block w-full md:gap-[30px] rounded-md border-1 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 my-2 lg:my-0"
                />
                <span>
                  {errors.name && (
                    <p className="text-red-500 mb-2">{errors.name.message}</p>
                  )}
                </span>
              </div>
            </span>

            <span className="flex lg:flex gap-3 lg:py-4 lg:justify-center justify-center items-center lg:items-center">
              <div>Product Images</div>
              <AddImageUpload updateImage={updateImage} />
              <AddImageUpload updateImage={updateImage} />
              <AddImageUpload updateImage={updateImage} />
            </span>
          </div>
          <div className="flex justify-center items-center">
            <button
              onClick={handleSubmit(handleFormSubmit)}
              className="rounded-[10px] py-4 text-white bg-[#161616] text-lg w-full sm:w-3/4 sm:mx-auto my-6 sm:my-12"
            >
              {options.title}
            </button>
          </div>
        </form>
      </div>
    </>
  )
}

export default AddItemModal
