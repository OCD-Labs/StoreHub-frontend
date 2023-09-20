import { getServerSession } from 'next-auth'
import { authOptions } from '@app/api/auth/[...nextauth]/route'
import Link from 'next/link'
import React from 'react'
import { Button } from '@components/ui/Button'
import Image from 'next/image'
import homeside from '@public/assets/images/homeside.png'
import homefirst from '@public/assets/images/homefirst.png'
import homesecond from '@public/assets/images/homesecond.png'
import homethird from '@public/assets/images/homethird.png'
import near from '@public/assets/images/near.png'

// import { InitContract } from '@components/util/config'

const Page = async () => {
  // const createUserAcc = async () => {
  //   const { createWalletAccount } = await InitContract()
  //   const account = await createWalletAccount('viky')
  //   console.log(account, 'new user')
  // }

  const session = await getServerSession(authOptions)
  console.log(session)

  const authenticated = !!session
  return (
    <div className="text-dark">
      <div className="bg-graybrand">
        <div className="flex flex-col-reverse lg:flex-row max-w-6xl m-auto lg:gap-40 gap-20 lg:p-0 p-4">
          <div className="lg:mt-24">
            <h2 className="max-w-lg text-5xl leading-normal mb-8">
              Your <span className="bg-yellow-200 p-4">One-Click</span>{' '}
              Ecommerce Solution!
            </h2>
            <p className="max-w-lg leading-normal font-light text-lg mb-8">
              Effortlessly launch your online store, co-own with friends, access
              valuable business insights, and ensure store integrity through
              blockchain technology, powered by NEAR.
            </p>
            <div className="z-100 flex gap-4 mt-8">
              <Button variant="default">
                <Link href={'/auth/signup'}>Get Started</Link>
              </Button>
              <Button variant="outline">Watch Demo</Button>
            </div>
          </div>

          <div>
            <Image
              src={homeside}
              width={500}
              height={500}
              alt="onboardimage"
            ></Image>
          </div>
        </div>
      </div>
      <svg
        className="z-[-1]"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
      >
        <path
          fill="#B0A4DB1F"
          fill-opacity="1"
          d="M0,0L40,37.3C80,75,160,149,240,154.7C320,160,400,96,480,69.3C560,43,640,53,720,64C800,75,880,85,960,122.7C1040,160,1120,224,1200,224C1280,224,1360,160,1400,128L1440,96L1440,0L1400,0C1360,0,1280,0,1200,0C1120,0,1040,0,960,0C880,0,800,0,720,0C640,0,560,0,480,0C400,0,320,0,240,0C160,0,80,0,40,0L0,0Z"
        ></path>
      </svg>
      <div className="flex justify-center  font-light max-w-4xl text-center m-auto">
        <p className="lg:text-5xl text-2xl">
          Exclu
          <span className="bg-graybrand">
            sive features that
            <span className="border-b-8 border-yellow-200"> make</span> us the
            per
          </span>
          fect solution for you.
        </p>
      </div>
      <div className="mb-20">
        <div>
          <div className="flex flex-col-reverse lg:flex-row max-w-6xl m-auto lg:gap-40 gap-20 lg:p-0 p-4">
            <div className="lg:mt-24">
              <h2 className="max-w-lg text-xl leading-normal mb-4">
                Analytics and Insight
              </h2>
              <p className="max-w-lg leading-normal font-light">
                Our comprehensive analytics empower data-driven decisions,
                enhancing your business strategy. By revealing trends and
                customer behaviors, these insights guide improvements in sales,
                inventory, and market response, ensuring strategic excellence."
              </p>
              <div className="z-100 flex gap-4 mt-8">
                <Link href={''} className="underline">
                  Learn More
                </Link>
              </div>
            </div>

            <div>
              <Image
                src={homeside}
                width={500}
                height={500}
                alt="onboardimage"
              ></Image>
            </div>
          </div>
          <div className="flex flex-col-reverse lg:flex-row lg:flex-row-reverse max-w-6xl m-auto lg:gap-40 gap-20 lg:p-0 p-4">
            <div className="lg:mt-24">
              <h2 className="max-w-lg text-xl leading-normal mb-4">
                Social Media Integration
              </h2>
              <p className="max-w-lg leading-normal font-light">
                Effortlessly launch and manage your store, receive real-time
                WhatsApp order notifications, and effortlessly share updates on
                your WhatsApp Status. Embrace the future of e-commerce with
                StoreHub and simplify your path to growth.
              </p>
              <div className="z-100 flex gap-4 mt-8">
                <Link href={''} className="underline">
                  Learn More
                </Link>
              </div>
            </div>

            <div>
              <Image
                src={homeside}
                width={500}
                height={500}
                alt="onboardimage"
              ></Image>
            </div>
          </div>
          <div className="flex flex-col-reverse lg:flex-row max-w-6xl m-auto lg:gap-40 gap-20 lg:p-0 p-4">
            <div className="lg:mt-24">
              <h2 className="max-w-lg text-xl leading-normal mb-4">
                Store Co-Ownership
              </h2>
              <p className="max-w-lg leading-normal font-light">
                Experience effortless collaboration with friends or valued
                business partners through our co-ownership feature. As you
                embark on this cooperative journey, you'll find yourselves in a
                harmonious blend of efforts, sharing accomplishments and basking
                in the rewards of collective achievements.
              </p>
              <div className="z-100 flex gap-4 mt-8">
                <Link href={''} className="underline">
                  Learn More
                </Link>
              </div>
            </div>

            <div>
              <Image
                src={homeside}
                width={500}
                height={500}
                alt="onboardimage"
              ></Image>
            </div>
          </div>
        </div>
        <section className="flex flex-col gap-6 items-center bg-[#D9D9D92E] lg:p-12 p-4">
          <Image src={near} width={100} height={100} alt="Near"></Image>

          <p className="max-w-lg text-3xl leading-normal font-normal text-center">
            The OS for an open web
          </p>
          <p className="font-light lg:text-lg text-center">
            We utilize the NEAR blockchain, known for its user-friendly,
            carbon-neutral, secure, and infinitely scalable characteristics.
            NEAR provides a foundation for an ecommerce solution that is both
            performant and secure, ensuring that your business operations are
            seamless and reliable.
          </p>
          <div>
            <Button variant="default">Get Started</Button>
            <Button variant="ghost"> Learn More </Button>
          </div>
        </section>
      </div>
    </div>
  )
}

export default Page
