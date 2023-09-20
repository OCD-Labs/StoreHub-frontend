'use client'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { BASE_URL } from '@components/util/config'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation'
import { setSession } from '@components/util/session'
import Link from 'next/link'
import { setCookie } from '@components/util/cookie'
import { getCookie } from '@components/util/cookie'
import { userWallet } from '@app/StoreManager'
import { signIn } from 'next-auth/react'
import { clearCookie } from '@components/util/cookie'

const page = () => {
  const [loading, setloading] = useState(false)
  const [error, setError] = useState(false)
  const router = useRouter()
  const EMAIL = useSearchParams().get('email')
  const SECRET_CODE = useSearchParams().get('secret_code')
  const setUser = userWallet((state) => state.setUser)

  const handleSignIn = async () => {
    const userCookie = getCookie('credential') as string
    const credential: IUserCredential = JSON.parse(userCookie)


    // sign in with NEXTAUTH
    await signIn('credentials', {
      email: credential.email,
      password: credential.password,
      redirect: false,
    }).then(() => {
      clearCookie('credential') // clear cookie from cookie storage
    })
  }

  useEffect(() => {
    try {
      setloading(true)
      fetch(`${BASE_URL}/users/verify-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          secret_code: SECRET_CODE,
          email: EMAIL,
        }),
      })
        .then((response) => {
          setloading(false)
          if (response.status === 200) {
            // Successful verification

            return response.json()
          } else {
            // Handle errors, e.g., invalid token or server error
            setError(true)
            throw new Error('Verification failed')
          }
        })
        .then((data) => {
          debugger
          console.log(data.data.result, 'data')

          //handle signin from NextAuth
          handleSignIn()

          //save user data in global state
          setUser(data.data.result)
          // Redirect the user to a choose role page

          router.push('/auth/choose-role') 
        })
        .catch((error) => {
          // Handle and log any errors
          console.error('Verification error:', error)
        })
        .finally(() => {
          setloading(false)
        })
    } catch (error) {}
  }, [2])
  return (
    <div>
      <div>
        {loading ? 'Loading...' : ''}

        <div>
          {error ? (
            <div className="text-red-800 flex flex-col items-center">
              <div>Couldn't verify your email</div>
              <span className="text-purple-600">
                <Link href={'/home'}>Go back</Link>
              </span>
            </div>
          ) : (
            ''
          )}
        </div>
      </div>
    </div>
  )
}

export default page
