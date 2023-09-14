'use client'
import React from 'react'
import { useEffect } from 'react'
import { BASE_URL } from '@components/util/config'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation'
import { setSession } from '@components/util/session'

const page = () => {
  const router = useRouter()
  const EMAIL = useSearchParams().get('email')
  const SECRET_CODE = useSearchParams().get('secret_code')
  useEffect(() => {
    fetch(`${BASE_URL}/users/verify-email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        secret_code: SECRET_CODE, // Replace with the actual secret code
        email: EMAIL, // Replace with the user's email
      }),
    })
      .then((response) => {
        if (response.status === 200) {
          // Successful verification
          return response.json()
        } else {
          // Handle errors, e.g., invalid token or server error
          throw new Error('Verification failed')
        }
      })
      .then((data) => {
        console.log(data, 'data')
        debugger
        // Save the user and token response to localStorage or sessionStorage
        setSession(data.result)
        // Redirect the user to a choose role page

        router.push('/auth/choose-role')
      })
      .catch((error) => {
        // Handle and log any errors
        console.error('Verification error:', error)
      })
  })
  return <div>Loading...</div>
}

export default page
