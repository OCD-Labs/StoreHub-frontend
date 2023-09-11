'use client'
import React, { useState } from 'react'
import logo from '@public/assets/images/storehublogo.svg'
import Image from 'next/image'
import Link from 'next/link'
import OtpInput from 'react-otp-input'
import { Button } from '@components/ui/Button'
import BackButton from '@components/Onboarding/BackButton'

const EnterCode = () => {
  const [otp, setOtp] = useState(0)
  return (
    <div className="h-screen block w-full p-8 z-10 font-light">
      <div>
        <div className="flex justify-between">
    
          <Image src={logo} width={100} height={100} alt="logo"></Image>
          <BackButton></BackButton>
        </div>

        <div className="flex flex-col items-center mt-28">
          <p className="text-2xl mb-4">Enter Your Verification Code</p>
          <p className="leading-6 max-w-lg mb-8">
            We've sent a verification code to your email to ensure it's really
            you. Please enter the code below to proceed with your password
            reset.
          </p>

          <div className="flex flex-col gap-12 items-center">
            <div className="w-full">
              <OtpInput
                containerStyle={{
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                inputStyle={{ width: 50, height: 50 }}
                inputType={'tel'}
                // @ts-ignore
                value={otp}
                // @ts-ignore
                onChange={setOtp}
                numInputs={4}
                renderSeparator={<span>-</span>}
                renderInput={(props) => <input {...props} />}
              />
            </div>

            <Link href={'/auth/forgot-password/reset-password'}>
              <Button variant="default" className="lg:w-96 w-80">
                Enter
              </Button>
            </Link>

            <p>
              Didn't receive the code? Check your spam folder or click{' '}
              <span>"Resend Code"</span>.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EnterCode
