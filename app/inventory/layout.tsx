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
  const token = useSearchParams().get('token')
  const userID = useSearchParams().get('user')
  const id = useSearchParams().get('id')
  const name = useSearchParams().get('name')

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
