import React from 'react'
import logo from '@public/assets/images/storehublogo.svg'
import Image from 'next/image'
import { Button } from '@components/ui/Button'
import BackButton from '@components/Onboarding/BackButton'

const ChooseRole = () => {
  return (
    <div className="h-screen block w-full p-8 z-10">
      <div>
        <Image src={logo} width={100} height={100} alt="logo"></Image>
        
        <div className="flex flex-col items-center mt-40">
          <p className="text-2xl mb-4">Sign Up as</p>
          <div className="flex flex-col gap-4">
            <Button variant="default" className="w-60">
              Store Owner
            </Button>
            <Button variant="outline" className="w-60">
              Shopper
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChooseRole
