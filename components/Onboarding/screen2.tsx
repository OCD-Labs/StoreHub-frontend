import React from 'react'
import { Button } from '@components/ui/Button'
import Image from 'next/image'
import Link from 'next/link'
import onboard2 from '../../public/assets/images/onboard2.png'

const Screen2 = () => {
  return (
    <div className="w-full h-64 p-8">
      <div>
        <div className="flex flex-col-reverse lg:flex-row">
          <div className="lg:mt-24">
            <h2 className="max-w-lg text-3xl font-semibold leading-normal">
              How would you like to join StoreHub?
            </h2>
            <p className="max-w-lg leading-normal">
              StoreHub aims to provide a tailored experience for every member of
              our community. By understanding your role, we can ensure that the
              features, recommendations, and content you see are most relevant
              to your needs. Whether you're here to sell or shop, we want to
              make your journey smooth and enjoyable
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
              src={onboard2}
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

export default Screen2
