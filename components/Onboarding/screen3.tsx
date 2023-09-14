import React from 'react'
import { Button } from '@components/ui/Button'
import Image from 'next/image'
import Link from 'next/link'
import onboard3 from '../../public/assets/images/onboard3.png'

const Screen3 = () => {
  return (
    <div className="w-full h-64 p-8">
      <div>
        <div className="flex flex-col-reverse lg:flex-row">
          <div className="lg:mt-24">
            <h2 className="max-w-lg text-3xl font-semibold leading-normal">
              Connect NEAR wallet
            </h2>
            <p className="max-w-lg leading-normal">
              We're proud to utilize the NEAR blockchain, which provides a
              secure and scalable foundation for your online store. With NEAR,
              you can rest assured that the integrity of your store is upheld,
              protecting both you and your customers.
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
              src={onboard3}
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

export default Screen3
