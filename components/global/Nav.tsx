'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { useGlobalContext } from '@app/Context/store'
import Dropdown from 'react-bootstrap/Dropdown'

// import { signIn, signOut, useSession, getProviders } from 'next-auth/react'

const Nav = () => {
  // const [providers, setProviders] = useState(null)
  const { wallet }: any = useGlobalContext()
  const [isSignedIn, setIsSignedIn] = useState()
  const [isMenuOpened, setMenuOpen] = useState(false)

  //sign in base url
  const baseUrl = 'https://store-hub-djxu.onrender.com/api/v1'

  const signInData = {
    account_id: wallet.accountId,
  }
  // Configuration for the Fetch API request
  const signInfetchOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(signInData),
  }

  const signOutfetchOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Basic <credentials>',
    },
  }

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
        fetch(baseUrl + '/auth/', signInfetchOptions)
          .then((response) => response.json())
          .then((data) => {
            // Handle the response data
            localStorage.setItem('userData', JSON.stringify(data))
          })
      }
    } catch (error) {
      console.log(error)
    }
  }

  const signOut = () => {
    try {
      localStorage.removeItem('userData')
      // fetch(
      //   'https://storehub-zjp3.onrender.com/api/v1/auth/logout',
      //   signOutfetchOptions,
      // )
      //   .then((response) => response.json())
      //   .then((data) => {
      //     // Handle the response data
      //     // localStorage.setItem("userData", data);
      //   })
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
      <div className="sm:flex hidden">
        <div className="flex gap-3 md:gap-5 font-normal items-baseline leading-tight text-black text-[18px]">
          <Link href="/features">Features</Link>
          <Link href="/stores">Stores</Link>
          <Link href="/contacts">Contacts</Link>
          {/* <button onClick={signOut}>sign out</button> */}
          {/* <button onClick={signIn}>sign in</button> */}
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
                    className={`flex flex-col border border-black text-sm p-4 gap-3 bg-white rounded-lg ${
                      isMenuOpened === false ? 'hidden' : ''
                    }`}
                  >
                    {/* <Dropdown.Item href="#/action-1">Action</Dropdown.Item> */}
                    <Dropdown.Item href="#/action-2">
                      <Link href="/createStore">
                        <button className="black_btn">Create Store</button>
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
      </div>
    </nav>
  )
}

export default Nav
