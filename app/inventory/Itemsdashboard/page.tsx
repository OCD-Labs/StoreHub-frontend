'use client'
import { useRouter } from 'next/navigation'
import { useSearchParams } from 'next/navigation'
import { Key, useEffect, useState } from 'react'
import { getSession } from '@components/util/session'
import '../../../styles/inventory.css'
import StoreItem from '@components/stores/StoreItem'
import { User } from '@app/StoreManager/userstore'
import ProductItem from '@components/stores/productitem'
import AddItemModal from '@components/stores/create-store/addItemModal'
import AppLoader from '@components/global/AppLoader'
import { BASE_URL } from '@components/util/config'
import { ToastContainer, toast } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css'
const Inventory = () => {
  const ID = '123PDWD'
  const [storeItems, setStoreItems] = useState<any>([])
  const [session, setSession] = useState<Session>()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [loading, setloading] = useState<boolean>(true)
  const token = useSearchParams().get('token')
  const userID = useSearchParams().get('user')

  const setAddItemStatus = (data: string) => {
    if (data !== 'error') {
      toast('Store item added successfully')
    } else {
      toast.error('Error while adding item. Try again')
    }
  }

  const getStoreItemsOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  }

  const addStoreItemsOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  }
  // const searchParams = useSearchParams()
  const getStoreData = async () => {
    try {
      fetch(
        BASE_URL + `/users/${userID}/stores/${id}/items`,
        getStoreItemsOptions,
      )
        .then((response) => response.json())
        .then((data) => {
          console.log(data, 'store items')
          setStoreItems(data ? data.data.result.items : [])
          setloading(false)
        })
    } catch (error) {
      console.log(error, 'error from call')
    }
  }
  const id = useSearchParams().get('id')
  const name = useSearchParams().get('name')

  console.log(session, 'session')

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
  const readyItems = async () => {
    let session = getSession()
    setSession(session)
  }

  useEffect(() => {
    readyItems().then(() => {
      getStoreData()
    })
  }, [storeItems.length])

  return (
    <main className="w-full mb-6">
      <div
        className={`modal ${
          isModalOpen
            ? 'animate-animatefadeIn is-open'
            : 'animate-animatefadeOut'
        } lg:px-[] ${isModalOpen ? 'is-open' : ''}`}
      >
        <div className="modal-content w-[90%] md:w-[60%]">
          <div className="flex justify-between items-center lg:px-20px">
            <h2 className="text-lg font-bold text-black">Add Item</h2>
            <span
              onClick={() => setIsModalOpen(!isModalOpen)}
              className="text-lg cursor-pointer p-2"
            >
              X
            </span>
          </div>
          <AddItemModal
            BASE_URL={BASE_URL}
            id={id}
            userID={userID}
            session={session}
            addItemStatus={setAddItemStatus}
            setIsModalOpen={setIsModalOpen}
            addStoreItemsOptions={addStoreItemsOptions}
            setStoreItems={setStoreItems}
          />
        </div>
      </div>

      <div className="md:flex md:gap-5">
  
        <ToastContainer />
        <section className="md:flex-1">
          <div className="md:flex-1 flex justify-between items-center sticky top-0 bg-white py-4">
            <p className="text-[18px] font-bold text-black mr-6">Products</p>
            <div className="flex gap-3 md:gap-5">
              <select className="block py-2 rounded-md border-0 px-1 md:px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm md:my-0">
                <option>Option 1</option>
                <option>Option 2</option>
                <option>Option 3</option>
                <option>Option 4</option>
              </select>
              <select className="block py-2 rounded-md border-0 px-1 md:px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 md:my-0">
                <option>Option 1</option>
                <option>Option 2</option>
                <option>Option 3</option>
                <option>Option 4</option>
              </select>
              <button
                onClick={() => {
                  setIsModalOpen(!isModalOpen)
                }}
                className="block py-2 rounded-md border-0 px-1 md:px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 md:my-0"
              >
                Add Items
              </button>
            </div>
          </div>

          <div className="border py-4 px-2 md:p-6 flex flex-col overflow-x-scroll scroll-smooth ">
            <section className="flex justify-between pb-2 flex-0-0-auto scroll-snap-align-start min-w-[500px]">
              <p className="md:w-[30%] w-[15em] mr-4">Product Name</p>
              <p className="md:w-[15%] w-[90px] mr-6 md:mr-0">Category</p>
              <p className="md:w-[15%] w-[90px]">ID</p>
              <p className="md:w-[15%] w-[90px]">Quatity</p>
              <p className="md:w-[15%] w-[90px]">Price</p>
              <p className="md:w-[15%] w-[90px]">Staus</p>
            </section>
            <hr />
            {loading ? (
              <AppLoader />
            ) : storeItems?.length < 1 ? (
              <p>No items found. Add an item</p>
            ) : (
              storeItems?.map((product: any, key: Key | null | undefined) => (
                <ProductItem key={key} product={product} />
              ))
            )}
          </div>
        </section>
      </div>
    </main>
  )
}

export default Inventory
