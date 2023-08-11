'use client'
import { useSearchParams } from 'next/navigation'
import { useState } from 'react'
import '../../styles/inventory.css'
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
  const [activeItem, setActiveItem] = useState<string>('home');

  const handleItmeClick = (item: string): void => {
    setActiveItem(item)
  };
  
  const token = useSearchParams().get('token')
  const userID = useSearchParams().get('user')
  const id = useSearchParams().get('id')
  const name = useSearchParams().get('name')

  return (
    <main className="mb-6">
      <p className="text-[20px] font-bold text-black">{name}</p>
      {/* <span className="flex my-4">
        <p>Store ID : {id} </p>
        <span className="ml-4">
          <p>Verified</p>
        </span>
      </span> */}
      <div className="md:flex md:gap-4">
        <section className="flex gap-5 flex-col mb-6 md:py-6 pr-[10px] sm:pr-[30px] w-fit border-r-2">
          <Link
            onClick={() => handleItmeClick('home')}
            className="flex mb-4 cursor-pointer"
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
            <span className={`${activeItem === 'home' ? 'bg-[#000000] text-white' : ''} ml-2 px-4 w-[170px] md:w-[190px] py-[2px] font-bold rounded-[5px]`}>Home</span>
          </Link>

          <Link
          onClick={() => handleItmeClick('products')}
            className="flex mb-4 cursor-pointer"
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
            <span className={`${activeItem === 'products' ? 'bg-[#000000] text-white' : ''} ml-2 px-4 w-[170px] md:w-[190px] py-[2px] font-bold rounded-[5px]`}>Products Inventory</span>
          </Link>

          <Link
          onClick={() => handleItmeClick('sales')}
            className="flex mb-4 cursor-pointer"
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
            <span className={`${activeItem === 'sales' ? 'bg-[#000000] text-white' : ''} ml-2 px-4 w-[170px] md:w-[190px] py-[2px] font-bold rounded-[5px]`}>Sales Management</span>
          </Link>
          <Link
          onClick={() => handleItmeClick('orders')}
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
            <span className={`${activeItem === 'orders' ? 'bg-[#000000] text-white' : ''} ml-2 px-4 w-[170px] md:w-[190px] py-[2px] font-bold rounded-[5px]`}>Order Management</span>
          </Link>
          <Link
          onClick={() => handleItmeClick('settings')}
            className="flex mb-4 cursor-pointer"
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
            <span className={`${activeItem === 'settings' ? 'bg-[#000000] text-white' : ''} ml-2 px-4 w-[170px] md:w-[190px] py-[2px] font-bold rounded-[5px]`}>Settings</span>
          </Link>
        </section>
        <ToastContainer />
        <div className="w-full pl-2">{children}</div>
      </div>
    </main>
  )
}

export default Inventory
