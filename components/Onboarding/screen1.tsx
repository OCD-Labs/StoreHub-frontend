import React from 'react'
import { Button } from '@components/ui/Button'
import Image from 'next/image'
import Link from 'next/link'
import onboard1 from '../../public/assets/images/onboard1.png'

const Screen1 = () => {
  return (
    <div className="w-full h-64 p-8">
      <div>
        <div className="flex flex-col-reverse lg:flex-row">
          <div className="lg:mt-24">
            <h2 className="max-w-lg text-3xl font-semibold leading-normal">
              Your One Click Ecommerce Solution
            </h2>
            <p className="max-w-lg leading-normal">
              Effortlessly launch your online store, co-own with friends, access
              valuable business insights, and ensure store integrity through
              blockchain technology, powered by NEAR.
            </p>
            <div className="z-100 flex gap-4 mt-8">
              <Button variant="default">
                <Link href={'/signup'}>Get Started</Link>
              </Button>
              <Button variant="outline">Watch Demo</Button>
            </div>
          </div>

          <div>
            <Image
              src={onboard1}
              width={1000}
              height={1000}
              alt="onboardimage"
            ></Image>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Screen1
