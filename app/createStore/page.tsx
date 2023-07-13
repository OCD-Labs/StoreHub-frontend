'use client'
import { log } from 'console'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
// @ts-nocheck
import { useState, useEffect, useContext } from 'react'
import { getSession } from '@components/util/session'
import { BASE_URL, CONTRACT_ADDRESS } from '@components/util/config'
import { userWallet } from '@app/StoreManager'

const CreateStore = () => {
  const { wallet } = userWallet.getState()
  const searchParams = useSearchParams()
  const router = useRouter()
  const [session, setSession] = useState<Session>()
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    store_account_id: '',
    profile_image_url:
      'https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250',
    category: '',
  })
  const storeData = {
    store_id: formData.store_account_id,
    user_id: session ? session.user.user_id : '',
  }
  console.log(storeData, 'storeData')
  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e: any) => {
    e.preventDefault()
    console.log(formData, 'formData')
  debugger
    createNewStore()
  }
  console.log(session, 'session')

  useEffect(() => {
    let transactionHashes = searchParams.get('transactionHashes')
    if (transactionHashes) {
      router.push('/userStores')
    }
  })

  // Generate time options
  const timeOptions: JSX.Element[] = []
  for (let hour = 0; hour < 24; hour++) {
    for (let minute = 0; minute < 60; minute += 15) {
      const time = `${hour
        .toString()
        .padStart(2, '0')}:${minute.toString().padStart(2, '0')}`
      timeOptions.push(
        <option key={time} value={time}>
          {time}
        </option>,
      )
    }
  }

  const createNewStore = () => {
    formData.store_account_id = `${formData.store_account_id}.v2-storehub.testnet`

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
          .then((response) => response.json())
          .then((data: StoreResponse) => {
            // TODO: Store data in Context or Redux

            wallet
              .callMethod({
                contractId: CONTRACT_ADDRESS,
                method: 'create_store',
                args: { store_id: formData.store_account_id },
              })
              .then((data) => {
                console.log(data)
              })
              .catch((error) => console.log(error))
          })
      } catch (error) {
        console.log(error)
      }
    }
  }

  useEffect(() => {
    let session = getSession()
    setSession(session)
  }, [3])

  return (
    <main>
      <form className="text-dark">
        <p className="text-[20px] font-bold text-black">Create Store</p>

        <div className="md:flex md:justify-between">
          <div className="">
            <div className="flex flex-col my-4">
              <div className="border-4 border-dashed p-16 w-fit flex flex-col justify-center items-center rounded-[38px] mx-auto md:mx-0 md:ml-4">
                <img
                  src="../../assets/icons/gallery-add.svg"
                  alt="Add gallery"
                />
                <p className="mt-3">Upload Photo</p>
              </div>
              <p className="text-center">JPG, PNG or GIF</p>
            </div>

            <div className="flex justify-around md:justify-between mt-6">
              <button className="rounded-[10px] py-3 border border-black w-[40%]">
                Edit Photo
              </button>
              <button className="rounded-[10px] py-3 text-white bg-[#161616] w-[40%]">
                Delete
              </button>
            </div>
          </div>

          <div className="mt-6 md:mt-0 md:w-[60%]">
            <span className="md:flex gap-3 md:py-4 md:justify-end">
              <label>Store Name</label>
              <input
                name="name"
                onInput={handleChange}
                value={formData.name}
                placeholder="Farmland Groceries Store"
                className="block w-full md:w-[75%] md:gap-[30px] rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 my-2 md:my-0"
              />
            </span>
            <div className="flex justify-between md:justify-end">
              <span className="flex justify-between items-center w-[48%] mr-4 md:py-4 md:justify-end">
                <label className="mr-2 md:mr-4">category</label>
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
              <span className="flex justify-between items-center w-[43%] md:w-[45%] md:py-4 md:justify-end">
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
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Best farmland produces at your door step"
                className="block w-full md:w-[75%] md:gap-[30px] rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 my-2 md:my-0"
              />
            </span>
            <span className="md:flex gap-3 md:py-4 justify-end">
              <label>Add Tags</label>
              <input className="block w-full md:w-[75%] md:gap-[30px] rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 my-2 md:my-0" />
            </span>
          </div>
        </div>

        <div className="p-[20px] md:p-0 mt-6">
          <p className="text-[16px] font-bold text-black">Opening Hours</p>
          <div className="flex">
            <div className="md:flex md:justify-between w-full">
              <div className="flex justify-between items-center gap-5 md:gap-8 md:mr-6 lg:gap-20">
                {/* <!-- Enabled: "bg-indigo-600", Not Enabled: "bg-gray-200" --> */}
                <button
                  type="button"
                  className="bg-gray-200 flex w-8 flex-none cursor-pointer rounded-full p-px ring-1 ring-inset ring-gray-900/5 transition-colors duration-200 ease-in-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  role="switch"
                  aria-checked="false"
                  aria-labelledby="switch-1-label"
                >
                  <span className="sr-only">Agree to policies</span>
                  {/* <!-- Enabled: "translate-x-3.5", Not Enabled: "translate-x-0" --> */}
                  <span
                    aria-hidden="true"
                    className="translate-x-0 h-4 w-4 transform rounded-full bg-white shadow-sm ring-1 ring-gray-900/5 transition duration-200 ease-in-out"
                  ></span>
                </button>

                <p>24/7</p>

                <div className="flex gap-5 md:gap-8 lg:gap-20">
                  <select className="block rounded-md border-0 px-2.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 my-2 md:my-0">
                    {timeOptions}
                  </select>

                  <select className="block rounded-md border-0 px-2.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 my-2 md:my-0">
                    {timeOptions}
                  </select>
                </div>
              </div>

              <div className="flex justify-between items-center gap-5 md:gap-8 lg:gap-20">
                {/* <!-- Enabled: "bg-indigo-600", Not Enabled: "bg-gray-200" --> */}
                <button
                  type="button"
                  className="bg-gray-200 flex w-8 flex-none cursor-pointer rounded-full p-px ring-1 ring-inset ring-gray-900/5 transition-colors duration-200 ease-in-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  role="switch"
                  aria-checked="false"
                  aria-labelledby="switch-1-label"
                >
                  <span className="sr-only">Agree to policies</span>
                  {/* <!-- Enabled: "translate-x-3.5", Not Enabled: "translate-x-0" --> */}
                  <span
                    aria-hidden="true"
                    className="translate-x-0 h-4 w-4 transform rounded-full bg-white shadow-sm ring-1 ring-gray-900/5 transition duration-200 ease-in-out"
                  ></span>
                </button>

                <p>plus weekends</p>

                <div className="flex justify-between gap-5 md:gap-8 lg:gap-20">
                  <select className="block rounded-md border-0 px-2.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 my-2 md:my-0">
                    {timeOptions}
                  </select>

                  <select className="block rounded-md border-0 px-2.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 my-2 md:my-0">
                    {timeOptions}
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center">
          <button
            onClick={handleSubmit}
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
