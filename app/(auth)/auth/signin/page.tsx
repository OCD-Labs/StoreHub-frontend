'use client'
import Link from 'next/link'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import Image from 'next/image'
import { Loader2 } from 'lucide-react'
import { toast, ToastContainer } from 'react-toastify'
import { Button } from '@components/ui/Button'
import Router, { useRouter } from 'next/navigation'
import 'react-toastify/dist/ReactToastify.css'
import { signIn } from 'next-auth/react'

const SignIn = () => {
  const [loading, setloading] = useState(false)
  const router = useRouter()
  const [user, setUser] = useState<IUserCredential>({
    password: '',
    email: '',
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IUserCredential>()
  const onSubmit = async (data: IUserCredential) => {
    setloading(true)
    try {
      const user = await signIn('credentials', {
        email: data.email,
        password: data.password,
        redirect: false,
      })
      if (user) {
        setloading(false)
        if (user?.error) {
          toast.error('Wrong email or password. Try again')
        } else {
          debugger
          router.push('/home')
        }
      }
    } catch (error) {}
  }

  return (
    <div className="sm:flex sm:justify-between mb-3 sm:mb-6 z-10 p-8 font-light">
      <ToastContainer></ToastContainer>
      <section className="border sm:px-4 lg:px-12 py-4 w-[40%] hidden sm:block rounded-[10px]">
        <h3 className="text-black font-bold">StoreHub</h3>

        <h1 className="text-center text-3xl text-black pt-7">
          Welcome to <span className="font-bold">StoreHub!!!</span>
        </h1>
        <img
          className="py-11"
          src="../../assets/images/signup.svg"
          alt="sign up"
        />
      </section>

      <section className="sm:w-[55%] sm:px-6">
        <form autoComplete="on">
          <p className="text-end">
            Don't have an account?
            <Link href="/auth/signup">
              <span className="text-dark ml-2">Create Account</span>
            </Link>
          </p>
          <p className="text-2xl font-bold py-4">Login</p>
          <div className="flex flex-col gap-5 sm:gap-3 lg:gap-7">
            <input
              className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              type="email"
              placeholder="Email"
              {...register('email', {
                required: true,
                pattern: /[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$/i,
              })}
            />
            <input
              className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              type="text"
              placeholder="password"
              {...register('password', { required: true, min: 9 })}
            />

            <div className="flex items-center">
              {/* Hidden default radio input */}
            </div>

            <Button
              type="submit"
              disabled={loading}
              onClick={handleSubmit(onSubmit)}
              className="rounded-[10px] md:py-2 sm:py-1 py-2 text-white bg-[#161616] text-lg w-full my-3 md:my-6"
            >
              {loading ? (
                <div className="flex justify-center">
                  <Loader2 className="mr-2 h-4 w-6 animate-spin" /> Logging in
                  ...
                </div>
              ) : (
                'Login'
              )}
            </Button>
          </div>
        </form>

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
      </section>
    </div>
  )
}

export default SignIn
