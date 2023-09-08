'use client'
import Link from 'next/link'
import Image from 'next/image'
import React, { useState, useEffect } from 'react'
import Screen1 from '@components/Onboarding/screen1'
import Screen2 from '@components/Onboarding/screen2'
import Screen3 from '@components/Onboarding/screen3'
import storehublogo from '@public/assets/images/storehublogo.svg'

const Onboarding = () => {
  const componentSlider = [Screen1, Screen2, Screen3]
  const [currentSlider, setcurrentSlider] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setcurrentSlider((currentSlider + 1) % componentSlider.length)
    }, 6000)

    return () => clearInterval(interval)
  }, [currentSlider, componentSlider])

  const nextSlide = () => {
    setcurrentSlider((currentSlider + 1) % componentSlider.length)
  }

  const prevSlide = () => {
    setcurrentSlider(
      (currentSlider - 1 + componentSlider.length) % componentSlider.length,
    )
  }

  return (
    <div className="h-screen">
      <div className="">
        <section className="flex justify-between p-8">
          <div className="font-bold">
            <Image
              src={storehublogo}
              height={100}
              width={100}
              alt="logo"
            ></Image>
          </div>
          <div
            className="border-b cursor-pointer flex gap-6"
            onClick={nextSlide}
          >
            Skip
            <div>{currentSlider}/3</div>
          </div>
        </section>
        <section className="">{componentSlider[currentSlider]()}</section>
        <div></div>
      </div>
    </div>
  )
}

export default Onboarding
