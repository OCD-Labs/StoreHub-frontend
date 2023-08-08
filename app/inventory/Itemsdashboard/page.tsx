'use client'
import { useSearchParams } from 'next/navigation'

import '../../../styles/inventory.css'
import { userWallet } from '@app/StoreManager'
import ProductItem from '@components/stores/productitem'
import AddItemModal from '@components/stores/create-store/addItemModal'
import { getSession } from '@components/util/session'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { BASE_URL } from '@components/util/config'
import { ToastContainer, toast } from 'react-toastify'
import { Key, Suspense, useEffect, useState } from 'react'
import { modalstore } from '@app/StoreManager/modalstore'
import { GetStoreItems } from '@app/apis/Inventory'
import { GET_OPTIONS } from '@app/apis'

import 'react-toastify/dist/ReactToastify.css'

const Inventory = () => {
  const isOpen = modalstore((state) => state.isOpen)
  const toggleModal = modalstore((state) => state.toggleModal)
  const ID = '123PDWD'
  const [storeItems, setStoreItems] = useState<any>([])
  const [session, setSession] = useState<UserData | null>()

  const [loading, setloading] = useState<boolean>(true)

  const userID: string | null = useSearchParams().get('user')

  const id: string | null = useSearchParams().get('id')
  const token: string | null = useSearchParams().get('token')

  const setAddItemStatus = (data: string) => {
    if (data !== 'error') {
      toast('Store item added successfully!')
    } else {
      toast.error('Error while adding item. Try again')
    }
  }

  const getStoreData = async () => {
    try {
      fetch(BASE_URL + `/users/${userID}/stores/${id}/items`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
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

  const readyItems = async () => {}

  useEffect(() => {
    readyItems().then(() => {
      getStoreData()
    })
  }, [3])

  debugger

  return (
    <Suspense>
      <main className="w-full mb-6">
        <div
          className={`modal ${
            isOpen ? 'animate-animatefadeIn is-open' : 'animate-animatefadeOut'
          } lg:px-[] ${isOpen ? 'is-open' : ''}`}
        >
          <div className="modal-content w-[90%] md:w-[60%]">
            <div className="flex justify-between items-center lg:px-20px">
              <h2 className="text-lg font-bold text-black">Add Item</h2>
              <span
                onClick={toggleModal}
                className="text-lg cursor-pointer p-2"
              >
                X
              </span>
            </div>
            <AddItemModal
              id={id}
              userID={userID}
              addItemStatus={setAddItemStatus}
              setIsModalOpen={toggleModal}
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
                  <option>Sort by</option>
                  <option>Price</option>
                  <option>Category</option>
                  <option>Status</option>
                </select>
                {/* <select className="block py-2 rounded-md border-0 px-1 md:px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 md:my-0">
                <option>Option 1</option>
                <option>Option 2</option>
                <option>Option 3</option>
                <option>Option 4</option>
              </select> */}
                <button
                  onClick={toggleModal}
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
                <Skeleton count={10} />
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
    </Suspense>
  )
}

export default Inventory
