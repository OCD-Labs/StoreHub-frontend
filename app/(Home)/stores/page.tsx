'use client'
import React from 'react'
import sorticon from 'public/assets/icons/sorticon.svg'
import Image from 'next/image'
import { Stack } from 'react-bootstrap'
import { useState, useEffect } from 'react'
import Storecard from '@components/stores/storecard'
import AppLoader from '@components/global/AppLoader'
import StoresSkeleton from '@components/stores/storesSkeleton'
import { Button } from '@components/ui/Button'
import storeimg from '@public/assets/images/storeimg.png'
import Link from 'next/link'
// import { userWallet } from '@app/StoreManager'
import { BASE_URL } from '@components/util/config'
import useSWR from 'swr'
import { GET_OPTIONS } from '@app/apis'

import PaginationControls from '@components/stores/PaginationControls'
const Storepage = ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) => {
  const [allStores, setAllStores] = useState<Store[]>([])
  const [loading, setLoading] = useState(true)
  // const { wallet } = userWallet.getState()

  const page = searchParams['page'] ?? '1'
  const page_size = searchParams['per_page'] ?? '15'

  // Get all store

  // const fetcher = (url: string) =>
  //   fetch(url, GET_OPTIONS).then((response) => response.json())

  // const { data, error, isLoading } = useSWR(
  //   `${BASE_URL}/stores/?page=${Number(page)}&page_size=${page_size}`,
  //   fetcher,
  // )
  // console.log(data, 'useswr data')

  const handlePageLoading = () => {
    setLoading(true)
  }

  const fetchAllStores = () => {
    try {
      fetch(
        `${BASE_URL}/stores/?page=${Number(page)}&page_size=${page_size}`,
        GET_OPTIONS,
      )
        .then((response) => response.json())
        .then((data: Stores) => {
          console.log(data, 'all stores')
          setAllStores(data.data.result.stores)
          setLoading(false)
        })
    } catch (error) {
      console.log(error)
    }
  }
  console.log('stores', allStores)

  useEffect(() => {
    fetchAllStores()
  }, [page])

  return (
    <div>
      <div className="">
        <div className="">
          <div className="bg-graybrand">
            <div className="flex flex-col-reverse lg:flex-row max-w-6xl m-auto lg:gap-40 gap-20 lg:p-0 p-4">
              <div className="lg:mt-24">
                <h2 className="max-w-lg text-5xl leading-normal mb-8">
                  Explore Stores, Discover Wonders
                </h2>
                <p className="max-w-lg leading-normal font-light text-lg mb-8">
                  Every store tells its own story. Our grid of stores is your
                  passport to a world of unparalleled shopping experiences.
                  Click on a store, and let the products inside surprise you.
                  Your next favorite find is just a store away!
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
                  src={storeimg}
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
          {/* {wallet.accountId ? (
            <>
              <div></div>
            </>
          ) : (
            <>
              <div className="bg-blue p-6">
                <p>
                  Powered by the NEAR blockchain, Store Hub offers secure,
                  user-friendly, and infinitely scalable solutions for seamless
                  operations. Revolutionize your digital presence with Store
                  Hub.
                </p>
                <button type="button" className="outline_btn mt-6 font-medium">
                  <p className="hover:text-white items-baseline leading-tight text-black text-[16px]">
                    Connect Wallet
                  </p>
                </button>
              </div>
            </>
          )} */}
          <div className="max-w-6xl m-auto">
            <div>
              <div className="flex justify-between pt-8 mx-2">
                <div>{allStores.length} stores</div>
                <div>
                  <Image src={sorticon} width={30} height={30} alt="sorticon" />
                </div>
              </div>
            </div>
            {loading ? (
              <div>
                <StoresSkeleton />
                <StoresSkeleton />
                <StoresSkeleton />
                <StoresSkeleton />
                <StoresSkeleton />
              </div>
            ) : (
              <Stack gap={3}>
                <div className="w-full grid lg:grid-cols-3 sm:grid-cols-2 sm:mt-0 grid-cols-1 gap-4">
                  {allStores.map((store, index) => (
                    <Storecard key={index} store={store} />
                  ))}
                </div>
                <div></div>
              </Stack>
            )}
          </div>
        </div>
      </div>
      <PaginationControls
        hasNextPage={allStores.length > 1}
        hasPrevPage={true}
        handlePaginationLoading={handlePageLoading}
      />
    </div>
  )
}

export default Storepage
