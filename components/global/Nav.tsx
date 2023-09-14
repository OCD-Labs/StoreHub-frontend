'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { userWallet } from '@app/StoreManager'
import useProfile from '@app/hooks/useProfile'
import Dropdown from 'react-bootstrap/Dropdown'
import { setSession } from '@components/util/session'
import { BASE_URL } from '@components/util/config'
import { Button } from '@components/ui/Button'
import logo from '@public/assets/images/storehublogo.svg'
import { signOut } from 'next-auth/react'

// import { signIn, signOut, useSession, getProviders } from 'next-auth/react'

const Nav = () => {
  // const [providers, setProviders] = useState(null)
  const { wallet } = userWallet.getState()
  const setUser = userWallet((state) => state.setUser)
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
      // debugger
      if (wallet.accountId) {
        fetch(BASE_URL + '/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: 'ikehfavourdeveloper@gmail.com',
            password: 'faVour#0001',
          }),
        })
          .then((response) => response.json())

          .then(({ data }: UserResponse) => {
            console.log(data, 'data from api')
            setUser({
              access_token: data.result.access_token,
              user: data.result.user,
            })
            setSession({
              access_token: data.result.access_token,
              user: data.result.user,
            })
            useProfile().setSession({
              access_token: data.result.access_token,
              user: data.result.user,
            })
          })
      }
    } catch (error) {
      throw new Error('Couldnt sign in')
      console.log(error)
    }
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
    <nav className="flex-between items-baseline w-full mt-0 mb-8 sticky top-0 py-[10px] font-light bg-white">
      <Link href="/">
        <Image src={logo} width={100} height={100} alt="logo"></Image>
      </Link>
      {/* Navigation*/}
      <div className="flex gap-3 items-baseline">
        <div className="sm:flex hidden">
          <div className="flex gap-3 md:gap-5 items-baseline leading-tight text-dark">
            <Link href="/features">Features</Link>
            <Link href="/stores">Stores</Link>
          </div>
        </div>
        {!isSignedIn ? (
          <>
            <Link href="/auth/signin">Login</Link>
            <Button variant="default">
              <Link href={'/auth/onboarding'} className="font-light">
                Sign up
              </Link>
            </Button>
            <button
              onClick={() => {
                signOut()
              }}
            >
              Sign out
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
                  <Button variant="outline" className="font-light">
                    {wallet.accountId}
                  </Button>
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
