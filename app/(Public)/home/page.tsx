import Link from 'next/link'
import React from 'react'

const Page = () => {
  return (
    <div className="text-black">
      <div className="border border-black">
        <div className="bg-blue p-6 flex w-[90%] m-auto items-center justify-center my-10">
          <div>
            <div className="leading-10 w-[70%] text-black text-opacity-70 text-[64px] font-medium">
              Your One-Click Ecommerce Solution!
            </div>
            <p className="text-black mt-12 mb-12">
              Powered by the NEAR blockchain, Store Hub offers secure,
              user-friendly, and infinitely scalable solutions for seamless
              operations. Revolutionize your digital presence with Store Hub.
            </p>
            <Link href="/stores" className="outline_btn mt-6 font-medium w-20">
              Stores
            </Link>
          </div>
        </div>
      </div>
      <div className="mb-20">
        <div className="flex items-center justify-center">
          <h2 className="text-center text-black text-opacity-70 text-3xl my-10 font-semibold mt-8">
            Features
          </h2>
        </div>
        <div>
          <div className="flex flex-col gap-10 sm:grid sm:grid-cols-2 sm:grid-rows-2 sm:gap-10 w-[90%] justify-center m-auto flex-wrap">
            <div className="w-[100%] h-[300px]  bg-opacity-50 rounded-tl-lg rounded-tr-lg border-b border-l">
              <div className="w-[100%] h-[80%] flex bg-orange-300 m-auto rounded-lg">
                <div className="w-[80%] m-auto">
                  <p className=" text-black text-opacity-70 text-2xl ">
                    Store Co-ownership
                  </p>
                  <p className="mt-4">
                    Collaborate with friends or business partners seamlessly
                    with our co-ownership feature.
                  </p>
                </div>
              </div>
              <div className="ml-10 mb-4">Learn More</div>
            </div>
            <div className="w-[100%] h-[300px]  bg-opacity-50 rounded-tl-lg rounded-tr-lg border-b border-l">
              <div className="w-[100%] h-[80%] flex bg-slate-300 m-auto rounded-lg">
                <div className="w-[80%] m-auto">
                  <p className=" text-black text-opacity-70 text-2xl ">
                    Near Integration
                  </p>
                  <p className="mt-4">
                    Integrated the NEAR blockchain for a secure, scalable online
                    store, ensuring integrity for you and your customers.
                  </p>
                </div>
              </div>
              <div className="ml-10 mb-4">Learn More</div>
            </div>
            <div className="w-[100%] h-[300px]  bg-opacity-50 rounded-tl-lg rounded-tr-lg border-b border-l">
              <div className="w-[100%] h-[80%] flex bg-violet-300 m-auto rounded-lg">
                <div className="w-[80%] m-auto">
                  <p className=" text-black text-opacity-70 text-2xl ">
                    One-click Store Launch
                  </p>
                  <p className="mt-4">
                    Launch an online business with Store Hub with just one click
                    of a button.
                  </p>
                </div>
              </div>
              <div className="ml-10 mb-4">Learn More</div>
            </div>
            <div className="w-[100%] h-[300px]  bg-opacity-50 rounded-tl-lg rounded-tr-lg border-b border-l">
              <div className="w-[100%] h-[80%] flex bg-stone-400 m-auto rounded-lg">
                <div className="w-[80%] m-auto">
                  <p className=" text-black  text-2xl ">
                    Analytics and insights
                  </p>
                  <p className="mt-4">
                    Gain valuable insights into your business operations with
                    our advanced analytics
                  </p>
                </div>
              </div>
              <div className="ml-10 mb-4">Learn More</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Page
