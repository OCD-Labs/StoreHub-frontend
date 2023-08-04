'use client'
import { useRouter } from 'next/navigation'
import { useSearchParams } from 'next/navigation'
import { Key, useEffect, useState } from 'react'
import { getSession } from '@components/util/session'
import '../../styles/inventory.css'
import StoreItem from '@components/stores/StoreItem'
import { User } from '@app/StoreManager/userstore'
import ProductItem from '@components/stores/productitem'
import AddItemModal from '@components/stores/create-store/addItemModal'
import AppLoader from '@components/global/AppLoader'
import { BASE_URL } from '@components/util/config'
import { ToastContainer, toast } from 'react-toastify'
import Image from 'next/image'
import Link from 'next/link'
import Home from '@public/assets/icons/Inventory/home.svg'
import Products from '@public/assets/icons/Inventory/products.svg'
import Sales from '@public/assets/icons/Inventory/cart-sale.svg'
import Orders from '@public/assets/icons/Inventory/orders.svg'
import settings from '@public/assets/icons/Inventory/settings.svg'
import 'react-toastify/dist/ReactToastify.css'

const Inventory = ({ children }: { children: React.ReactNode }) => {
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
          setStoreItems(data ? data : [])
          setloading(false)
        })
    } catch (error) {
      console.log(error, 'error from call')
    }
  }
  console.log(storeItems, 'storeitemszzz')

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
    <main className="mb-6">
      <p className="text-[20px] font-bold text-black">{name}</p>
      <span className="flex my-4">
        <p>Store ID : {id} </p>
        <span className="ml-4">
          <p>Verified</p>
        </span>
      </span>
      <div className="md:flex md:gap-14">
        <section className="flex flex-wrap gap-5 justify-between md:justify-start md:flex-col md:gap-5 mb-6 md:py-6">
          <Link
            className="flex mb-4"
            href={{
              pathname: '/inventory/orders',
              query: {
                id: id,
                name: name,
                token: token,
                user: userID,
              },
            }}
          >
            {' '}
            <Image src={Home} alt="Dashboard" width={20} height={20} />{' '}
            <span className="ml-4">Home</span>
          </Link>

          <Link
            className="flex mb-4"
            href={{
              pathname: '/inventory/Itemsdashboard',
              query: {
                id: id,
                name: name,
                token: token,
                user: userID,
              },
            }}
          >
            <Image src={Products} alt="user" width={20} height={20} />
            <span className="ml-4 whitespace-nowrap">Products Inventory</span>
          </Link>

          <Link
            className="flex mb-4"
            href={{
              pathname: '/inventory/orders',
              query: {
                id: id,
                name: name,
                token: token,
                user: userID,
              },
            }}
          >
            {' '}
            <Image src={Sales} alt="Dashboard" width={20} height={20} />{' '}
            <span className="ml-4 whitespace-nowrap">Sales Management</span>
          </Link>
          <Link
            className="flex mb-4"
            href={{
              pathname: '/inventory/orders',
              query: {
                id: id,
                name: name,
                token: token,
                user: userID,
              },
            }}
          >
            {' '}
            <Image src={Orders} alt="Dashboard" width={20} height={20} />{' '}
            <span className="ml-4 whitespace-nowrap">Order Management</span>
          </Link>
          <Link
            className="flex mb-4"
            href={{
              pathname: '/inventory/orders',
              query: {
                id: id,
                name: name,
                token: token,
                user: userID,
              },
            }}
          >
            {' '}
            <Image src={settings} alt="Dashboard" width={20} height={20} />{' '}
            <span className="ml-4 whitespace-nowrap">Settings</span>
          </Link>
        </section>
        <ToastContainer />
        <div className="w-full border-l-2 pl-4">{children}</div>
      </div>
    </main>
  )
}

export default Inventory
