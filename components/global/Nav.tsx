'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { userWallet } from '@app/StoreManager'
import Dropdown from 'react-bootstrap/Dropdown'
import { setSession } from '@components/util/session'
import { BASE_URL } from '@components/util/config'

// import { signIn, signOut, useSession, getProviders } from 'next-auth/react'

const Nav = () => {
  // const [providers, setProviders] = useState(null)
  const { wallet }: any = userWallet.getState()
  const [isSignedIn, setIsSignedIn] = useState()
  const [isMenuOpened, setMenuOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    ;(async () => {
      const loginState = await wallet.startUp()
      setIsSignedIn(loginState)
      console.log(loginState, 'login state')
    })()

    return () => {}
  })

  useEffect(() => {
    if (wallet.accountId) {
      signIn()
    }
  })

  const signIn = () => {
    try {
      if (wallet.accountId) {
        fetch(BASE_URL + '/auth', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ account_id: wallet.accountId }),
        })
          .then((response) => response.json())
          .then(({ data }: UserResponse) => {
            setSession({
              access_token: data.result.access_token,
              user: data.result.user,
            })
          })
      }
    } catch (error) {
      console.log(error)
    }
  }

  const signOut = () => {
    try {
      localStorage.removeItem('userData')

    } catch (error) {}
  }

  //wallet sign in
  const handleSignIn = async () => {
    try {
      await wallet.signIn()
    } catch (error) {
      console.log(error)
    }
  }

  const toggleDropdown = () => {
    setMenuOpen(!isMenuOpened)
  }

  // console.log(wallet, useGlobalContext())

  return (
    <nav className="flex-between items-baseline w-full mt-3 mb-16">
      <Link href="/">
        <p className="text-black font-bold leading-tight text-opacity-30 text-[20px]">
          StoreHub
        </p>
      </Link>
      {/* Navigation*/}
      <div className="flex gap-3 items-baseline">
        <div className="sm:flex hidden">
          <div className="flex gap-3 md:gap-5 font-normal items-baseline leading-tight text-black text-[18px]">
            <Link href="/features">Features</Link>
            <Link href="/stores">Stores</Link>
            <Link href="/contacts">Contacts</Link>
          </div>
        </div>
        {!isSignedIn ? (
          <>
            {' '}
            <button
              type="button"
              onClick={() => handleSignIn()}
              className="outline_btn font-medium"
            >
              <p className="hover:text-white items-baseline leading-tight text-black text-[18px]">
                Connect Wallet
              </p>
            </button>
          </>
        ) : (
          <>
            <div>
              <Dropdown
                onToggle={toggleDropdown}
                className="flex flex-col static"
                style={{ position: 'static', padding: 0, minWidth: 'auto' }}
              >
                <Dropdown.Toggle
                  variant="success"
                  id="dropdown-basic"
                  // onClick={() => {
                  //   setMenuOpen(!isMenuOpened)
                  // }}
                >
                  <button type="button" className="outline_btn font-medium">
                    {wallet.accountId}
                  </button>
                </Dropdown.Toggle>

                <Dropdown.Menu
                  className={`flex flex-col z-20 border border-black text-sm p-4 gap-3 bg-white rounded-lg ${
                    isMenuOpened === false ? 'hidden' : ''
                  }`}
                >
                  {/* <Dropdown.Item href="#/action-1">Action</Dropdown.Item> */}
                  <Dropdown.Item href="#/action-2">
                    <Link href="/createStore">
                      <button className="black_btn">Create Store</button>
                    </Link>
                  </Dropdown.Item>
                  <Dropdown.Item>
                    <Link href="/userStores">
                      <button className="black_btn">My Stores</button>
                    </Link>
                  </Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item href="#/action-3">
                    <div onClick={() => wallet.signOut()}> Sign Out</div>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </>
        )}
      </div>
    </nav>
  )
}

export default Nav
