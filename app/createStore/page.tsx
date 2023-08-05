'use client'
import { log } from 'console'
import { useForm } from 'react-hook-form'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation'
import { ToastContainer, toast } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css'
import Link from 'next/link'
// @ts-nocheck
import { useState, useEffect, useRef, useContext } from 'react'
import { getSession } from '@components/util/session'
import { BASE_URL, CONTRACT_ADDRESS } from '@components/util/config'
import { userWallet } from '@app/StoreManager'
import ImageUploader from '@components/global/ImageUploader'

const CreateStore = () => {
  const { wallet } = userWallet.getState()
  const searchParams = useSearchParams()
  const router = useRouter()
  const [imageData, setImageData] = useState<any>()
  const [session, setSession] = useState<Session>()
  const [inputTag, setTagInput] = useState<string>('')

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    store_account_id: '',
    profile_image_url: '',
    category: 'fashion',
  })

  interface StoreDataInterface {
    store_id: string
    user_id: string | number
  }

  const storeData: StoreDataInterface = {
    store_id: formData.store_account_id,
    user_id: session ? session.user.user_id : '',
  }
  console.log(formData, 'storeData')
  const handleChange = (e: any) => {
    formData.profile_image_url = imageData?.secure_url
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const onSubmit = (): void => {
    console.log(formData, 'formData')
    debugger
    createNewStore()
  }
  console.log(session, 'session')

  // set Image data
  const handleImageData = (data: ImageData) => {
    setImageData(data)
    console.log(data, 'image data at store')
  }
  console.log(imageData?.secure_url, 'image data at')

  //crete new store
  const createNewStore = (): void => {
    formData.store_account_id = `${formData.store_account_id}.v2-storehub.testnet`
    debugger
    if (session) {
      try {
        localStorage.setItem('storeData', JSON.stringify(storeData))
        fetch(
          BASE_URL + `/users/${session ? session.user.user_id : ''}/stores`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${session ? session.access_token : ''}`,
            },
            body: JSON.stringify(formData),
          },
        )
          .then((response) => {
            return response.json()
          })
          .then((data: StoreResponse) => {
            // TODO: Store data in Context or Redux
            console.log(data)
            if (data?.status !== 'error') {
              toast('Successfully created your store!')
              setTimeout(() => {
                router.push(
                  `/inventory?id=${data.data.result.store.id}&name=${data.data.result.store.name}&token=${session?.access_token}&user=${session?.user.user_id}`,
                )
              }, 2000)
            } else {
              toast('failed to create your store. Try again!')
            }
            debugger
            wallet
              .callMethod({
                contractId: CONTRACT_ADDRESS,
                method: 'create_store',
                args: { store_id: formData.store_account_id },
              })
              .then((data: any) => {
                console.log(data)
              })
              .catch((error: any) => console.log(error))
          })
      } catch (error) {
        console.log(error)
      }
    }
  }

  useEffect(() => {
    let session = getSession()
    setSession(session)
  }, [])

  //handle form validation

  interface IFormInputs {
    name: string
    category: string
    description: string
  }

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IFormInputs>()

  // handle add tag
  const [tags, setTags] = useState<string[]>([])
  const inputRef = useRef<HTMLInputElement>(null)

  const handleAddTagDivClick = (): void => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }

  const removeTag = (tag: string): void => {
    const updatedTags = tags.filter((t) => t !== tag)
    setTags(updatedTags)
  }

  const addTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === ' ' && tags.length < 6) {
      let tag = e.currentTarget.value.replace(/\$+/g, ' ').trim()
      if (tag.length > 1 && !tags.includes(tag)) {
        tag.split(',').forEach((tag) => {
          setTags([...tags, tag])
          console.log(tags)
          setTagInput('')
        })
      }
    }
  }

  //rendering list of tags
  const renderedItems = tags?.map((tag: string) => {
    return (
      <li
        key={tag}
        className="text-black flex justify-between items-center bg-blue py-[5px] pl-[10px] pr-[8px] my-[4px] mx-[5px] rounded-[5px]"
      >
        {tag}
        <img
          className="h-4 w-4 bg-[rgba (192, 225, 233, 0)] rounded ml-2 cursor-pointer"
          src="../../assets/icons/x.svg"
          alt="remove tag"
          onClick={() => removeTag(tag)}
        />
      </li>
    )
  })

  return (
    <main>
      <ToastContainer />
      <form className="text-dark" onSubmit={handleSubmit(onSubmit)}>
        <p className="text-[20px] font-bold text-black">Create Store</p>

        <div className="md:flex md:justify-between">
          <ImageUploader onUpdateImage={handleImageData} />

          <div className="mt-6 md:mt-0 md:w-[60%]">
            <span className="md:flex gap-3 md:py-4 md:justify-end md:items-center">
              <label>Store Name</label>
              <div className="md:w-[75%] w-full">
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
                  onInput={handleChange}
                  value={formData.name}
                  placeholder="Farmland Groceries Store"
                  className="focus:border-blue block w-full md:gap-[30px] rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 my-2 md:my-0"
                />
                <span>
                  {errors.name && (
                    <p className="text-red-500 mb-2">{errors.name.message}</p>
                  )}
                </span>
              </div>
            </span>

            <div className="flex justify-between md:justify-end">
              <span className="flex flex-col md:flex-row md:items-center w-[45%] md:w-[48%] mr-4 md:py-4 md:justify-end">
                <label className="mr-2 md:mr-4">Category</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="md:w-[55%] lg:w-[57%] block rounded-md border-0 px-2.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 my-2 md:my-0"
                >
                  <option>Fashion</option>
                  <option>Books</option>
                  <option>Electronics</option>
                  <option>Apparels</option>
                  <option>Food & Fruits</option>
                </select>
              </span>
              <span className="flex flex-col md:flex-row md:items-center w-[45%] sm:w-[43%] md:w-[45%] md:py-4 md:justify-end mb-0">
                <label className="mr-2 md:mr-4">Store Account ID</label>
                <input
                  name="store_account_id"
                  value={formData.store_account_id}
                  onChange={handleChange}
                  placeholder="farm-land"
                  className="md:w-[55%] lg:w-[57%] block rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 my-2 md:my-0"
                ></input>
              </span>
            </div>
            <span className="md:flex gap-3"></span>

            <span className="md:flex gap-3 md:py-4 md:justify-end">
              <label>Description</label>
              <div className="w-full md:w-[75%]">
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
                  className="block w-full md:gap-[30px] rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 my-2 md:my-0"
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

            <span className="md:flex gap-3 md:py-4 justify-end">
              <label>Add Tags</label>
              <div className="md:w-[75%]">
                <div
                  onClick={handleAddTagDivClick}
                  className="flex w-full  md:gap-[30px] rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 my-2 md:mt-0 md:mb-2"
                >
                  <ul className="flex flex-wrap">
                    {tags.length === 0 && inputTag.length === 0 && (
                      <p className="absolute mt-[0.65rem] md:mt-[0.5rem] text-gray-400">
                        Press space after each word to add a tag
                      </p>
                    )}{' '}
                    {renderedItems}
                    <input
                      onKeyUp={addTag}
                      type="text"
                      className={`outline-none py-2 flex flex-1 text-base ${
                        tags.length >= 6 ? 'hidden' : 'block'
                      }`}
                      onChange={(e) => setTagInput(e.target.value)}
                      value={inputTag.toLocaleLowerCase()}
                      ref={inputRef}
                    />
                  </ul>
                </div>
                {tags.includes(inputTag) && (
                  <p className="text-red-500">
                    {inputTag.toLocaleUpperCase()} already exists
                  </p>
                )}
                {tags.length >= 6 && (
                  <p className="text-yellow-500">
                    Maximum tag limit reached (6)
                  </p>
                )}
              </div>
            </span>
          </div>
        </div>

        <div className="flex justify-center items-center">
          <button
            onClick={handleSubmit(onSubmit)}
            className="rounded-[10px] py-4 text-white bg-[#161616] text-lg w-full sm:w-3/4 sm:mx-auto my-6 sm:my-12"
          >
            Create Store
          </button>
        </div>
      </form>
    </main>
  )
}

export default CreateStore
