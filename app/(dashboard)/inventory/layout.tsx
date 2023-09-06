'use client'
import '@styles/globals.css'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import './styles/inventory.css'
import { ToastContainer, toast } from 'react-toastify'
import Image from 'next/image'
import Link from 'next/link'
import Home from '@public/assets/icons/Inventory/home.svg'
import Products from '@public/assets/icons/Inventory/products.svg'
import Sales from '@public/assets/icons/Inventory/cart-sale.svg'
import Orders from '@public/assets/icons/Inventory/orders.svg'
import settings from '@public/assets/icons/Inventory/settings.svg'
import 'react-toastify/dist/ReactToastify.css'
import { BASE_URL } from '@components/util/config'
import { getSession } from '@components/util/session'
import notification from '../../../public/assets/icons/Notification 2.svg'
import arrow from '../../../public/assets/icons/arrow.svg'
import hambuger from '../../../public/assets/icons/align-justify.svg'
import cancel from '../../../public/assets/icons/x 2.svg'
import duplicate from '@public/assets/icons/Inventory/duplicate.svg'
import Edit from '@public/assets/icons/Inventory/Edit.svg'
import status from '@public/assets/icons/Inventory/status.svg'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../../../components/ui/NavDropdown'
import '@styles/globals.css'



const Inventory = ({ children }: { children: React.ReactNode }) => {
  const [activeItem, setActiveItem] = useState<string>('home')
  const [sideBar, setSideBar] = useState<boolean>(false)

  const handleSideBar = () => {
    setSideBar(!sideBar)
  }

  const handleItmeClick = (item: string): void => {
    setActiveItem(item)
  }
  const userID = useSearchParams().get('user')
  const id = useSearchParams().get('id')
  const name = useSearchParams().get('name')

  interface Store {
    category: string
    id: number
    name: string
    profile_image_url: string
    // Add other properties of a store item as needed
  }



  const [session, setSession] = useState<Session>()

  useEffect(() => {
    const session = getSession()
    setSession(session)
  }, [])
  console.log(`${session ? session.access_token : 'hell0'}`)
  console.log(userID)
  return (
    <html lang="en">
      <body className="max-w-7xl text-sm m-auto sm:px-16 px-6">
        <main className="mb-6">
          <nav className="flex justify-between sticky top-0 border-b py-3 bg-white z-50">
            <p className="text-black font-bold leading-tight text-opacity-30 text-[20px] hidden averagescreen:block">
              StoreHub
            </p>
            {sideBar === false ? (
              <Image
                src={hambuger}
                alt="menu"
                className="averagescreen:hidden"
                onClick={handleSideBar}
              />
            ) : (
              <Image
                src={cancel}
                alt="hide sidebar"
                className="averagescreen:hidden"
                onClick={handleSideBar}
              />
            )}
            <div className="flex items-center">
              <img
                className="h-8 w-8 rounded-full"
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt=""
              />
              <div>
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    {' '}
                    <span className="flex px-3 items-center">
                      Jane Doe
                      <Image src={arrow} alt="user details" className="ml-2" />
                    </span>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>
                      <div className="text-xs">
                        <div className="flex gap-2">
                          <button>My Store</button>
                          {/* <span>
                            <Image
                              src={Edit}
                              width={15}
                              height={15}
                              alt="inventory"
                            ></Image>
                          </span> */}
                        </div>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <div className="text-xs flex gap-2">
                        Switch User
                        <span>
                          <Image
                            src={duplicate}
                            width={15}
                            height={15}
                            alt="inventory"
                          ></Image>
                        </span>
                      </div>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <div className="text-xs flex gap-2">
                        Sign Out
                        <span>
                          <Image
                            src={status}
                            width={15}
                            height={15}
                            alt="inventory"
                          ></Image>
                        </span>
                      </div>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <Image src={notification} alt="notification" />
              {/* <NavDropDown /> */}
            </div>
          </nav>

          <div className="md:flex">
            <section
              className={`averagescreen:flex gap-5 flex-col mb-6 md:py-6 pr-[20px]  w-fit border-r-2 h-[100vh] ${
                sideBar ? 'flex' : 'hidden'
              } fixed bg-white z-50`}
            >
              {/* <p className="text-[20px] text-black">{name}</p> */}
              <div>
                <Link
                  onClick={() => handleItmeClick('home')}
                  className="flex mb-6 cursor-pointer"
                  href={{
                    pathname: '/inventory/orders',
                    query: {
                      id: id,
                      name: name,
                      user: userID,
                    },
                  }}
                >
                  {' '}
                  <Image
                    src={Home}
                    alt="Dashboard"
                    width={20}
                    height={20}
                  />{' '}
                  <span
                    className={`${
                      activeItem === 'home' ? 'bg-[#000000] text-white' : ''
                    } ml-2 px-4 w-[170px] md:w-[190px] py-[4px] font-bold rounded-[5px]`}
                  >
                    Home
                  </span>
                </Link>

                <Link
                  onClick={() => handleItmeClick('products')}
                  className="flex mb-6 cursor-pointer"
                  href={{
                    pathname: '/inventory/Itemsdashboard',
                    query: {
                      id: id,
                      name: name,
                      user: userID,
                    },
                  }}
                >
                  <Image src={Products} alt="user" width={20} height={20} />
                  <span
                    className={`${
                      activeItem === 'products' ? 'bg-[#000000] text-white' : ''
                    } ml-2 px-4 w-[170px] md:w-[190px] py-[4px] font-bold rounded-[5px]`}
                  >
                    Products Inventory
                  </span>
                </Link>

                <Link
                  onClick={() => handleItmeClick('sales')}
                  className="flex mb-6 cursor-pointer"
                  href={{
                    pathname: '/inventory/sales/salesoverview',
                    query: {
                      id: id,
                      name: name,
                      user: userID,
                    },
                  }}
                >
                  {' '}
                  <Image
                    src={Sales}
                    alt="Dashboard"
                    width={20}
                    height={20}
                  />{' '}
                  <span
                    className={`${
                      activeItem === 'sales' ? 'bg-[#000000] text-white' : ''
                    } ml-2 px-4 w-[170px] md:w-[190px] py-[4px] font-bold rounded-[5px]`}
                  >
                    Sales Management
                  </span>
                </Link>
                <Link
                  onClick={() => handleItmeClick('orders')}
                  className="flex mb-6"
                  href={{
                    pathname: '/inventory/orders/ordersoverview',
                    query: {
                      id: id,
                      name: name,
                      user: userID,
                    },
                  }}
                >
                  {' '}
                  <Image
                    src={Orders}
                    alt="Dashboard"
                    width={20}
                    height={20}
                  />{' '}
                  <span
                    className={`${
                      activeItem === 'orders' ? 'bg-[#000000] text-white' : ''
                    } ml-2 px-4 w-[170px] md:w-[190px] py-[4px] font-bold rounded-[5px]`}
                  >
                    Order Management
                  </span>
                </Link>
                <Link
                  onClick={() => handleItmeClick('settings')}
                  className="flex mb-6 cursor-pointer"
                  href={{

                    pathname: '/inventory/storesettings',
                    query: {
                      id: id,
                      name: name,
                      user: userID,
                    },
                  }}
                >
                  {' '}
                  <Image
                    src={settings}
                    alt="Dashboard"
                    width={20}
                    height={20}
                  />{' '}
                  <span
                    className={`${
                      activeItem === 'settings' ? 'bg-[#000000] text-white' : ''
                    } ml-2 px-4 w-[170px] md:w-[190px] py-[4px] font-bold rounded-[5px]`}
                  >
                    Settings
                  </span>
                </Link>
              </div>
            </section>
            <ToastContainer />
            <div className="w-full averagescreen:pl-2 averagescreen:ml-[250px] calculated-width">
              {children}
            </div>
          </div>
        </main>
      </body>
    </html>
  )
}

export default Inventory
