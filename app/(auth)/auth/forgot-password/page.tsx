import React from 'react'
import logo from '@public/assets/images/storehublogo.svg'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@components/ui/Button'
import BackButton from '@components/Onboarding/BackButton'

const ForgotPassword = () => {
  return (
    <div className="h-screen block w-full p-8 z-10 font-light">
      <div>
        <div className="flex justify-between">
          <Image src={logo} width={100} height={100} alt="logo"></Image>
          <BackButton></BackButton>
        </div>

        <div className="flex flex-col items-center mt-28">
          <p className="text-2xl mb-4">Forgot your password?</p>
          <p className="leading-6 max-w-lg mb-8">
            Forgot your password? Enter your registered email below, click
            <b> "Request Password Reset"</b>, and we'll send you instructions to
            reset it.
          </p>

          <div className="flex flex-col gap-12">
            <input
              className="border lg:w-96 w-80 h-[35px] rounded-[5px] pl-[10px] sm:pl-[40px] pr-[10px] sm:pr-[35px]"
              placeholder="Email address"
            />

            <Link href={'/auth/forgot-password/enter-code'}>
              <Button variant="default" className="lg:w-96 w-80">
                Request password reset
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ForgotPassword
