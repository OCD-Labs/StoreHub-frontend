'use client'
import React from 'react'
import back from '@public/assets/icons/arrow-back.svg'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

const BackButton = () => {
  const router = useRouter()
  const goBack = () => {
    console.log('back')
    router.back()
  }
  return (
    <div className="z-20 cursor-pointer">
      <Image
        src={back}
        width={30}
        height={30}
        alt="go back"
        onClick={goBack}
      ></Image>
    </div>
  )
}

export default BackButton
