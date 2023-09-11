'use client'
import Link from 'next/link'
import React, { useState } from 'react'
import { storehubAPI } from '@app/(dashboard)/inventory/page'

const SignIn = () => {
  const [checked, setChecked] = useState<boolean>(false)
  const [user, setUser] = useState<{ email: string; password: string }>({
    email: 'mrvic5869@gmail.com',
    password: 'umacv.123',
  })

  const handleRadioChange = (): void => {
    setChecked(!checked)
  }

  const signIn = async (e: any) => {
    e.preventdefault()
    debugger
    const res = await storehubAPI.post('/auth/login', user)
    console.log(res.data, 'user')
  }

  return (
    <div className="sm:flex sm:justify-between mb-3 sm:mb-6 z-10 p-8">
      <section className="border sm:px-4 lg:px-12 py-4 w-[40%] hidden sm:block rounded-[10px]">
        <h3 className="text-black font-bold">StoreHub</h3>

        <h1 className="text-center text-3xl text-black pt-7">
          Welcome to <span className="font-bold">StoreHub!!!</span>
        </h1>
        <img
          className="py-11"
          src="../../assets/images/signin.svg"
          alt="sign up"
        />
      </section>

      <section className="sm:w-[55%] sm:px-6">
        <form>
          <p className="text-end">
            Don't have an account?
            <Link href="/signup">
              <span className="text-dark"> Create Account</span>
            </Link>
          </p>
          <p className="text-2xl font-bold py-4">Login</p>
          <div className="flex flex-col gap-5 sm:gap-3 lg:gap-7">
            <input
              type="email"
              name="email"
              id="email"
              className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              placeholder="Email Adress"
            />

            <input
              type="password"
              name="password"
              id="password"
              className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              placeholder="Password"
            />

            <div className="flex items-center">
              {/* Hidden default radio input */}
              <div>{/* Custom radio button */}</div>
            </div>

            <button
              onClick={signIn}
              className="rounded-[10px] md:py-2 sm:py-1 py-2 text-white bg-[#161616] text-lg w-full my-3 md:my-6"
            >
              Login
            </button>
            <Link
              href={'/auth/forgot-password'}
              className="ml-4 text-yellow-500 font-light text-sm"
            >
              Forgot Pasword?
            </Link>
          </div>

          <div className="py-2 sm:py-1 md:py-3">
            <span className="flex items-center justify-between">
              <hr className="font-bold w-[45%] border-t-1 border-black" />
              <p className="px-2">or</p>
              <hr className="font-bold w-[45%] border-t-1 border-black" />
            </span>

            <span className="flex justify-between pt-2 sm:pt-1 md:pt-2">
              <button className="flex items-center justify-center py-1 md:py-2 w-[44%] rounded-[10px] border cursor-pointer">
                <img
                  className="w-6"
                  src="../../assets/icons/google.svg"
                  alt="sign up with google"
                />
                <p className="ml-3">Google</p>
              </button>
              <button className="flex items-center justify-center py-1 md:py-2 w-[44%] rounded-[10px] border cursor-pointer">
                <img
                  className="w-6"
                  src="../../assets/icons/google.svg"
                  alt="sign up with google"
                />
                <p className="ml-3">Google</p>
              </button>
            </span>
          </div>
        </form>
      </section>
    </div>
  )
}

export default SignIn
