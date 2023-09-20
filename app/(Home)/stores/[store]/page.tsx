// @ts-nocheck
'use client'
import Image from 'next/image'
import owner from '../../../../public/assets/images/owner.jpg'
import { Button } from '@components/ui/Button'
import StoreItem from '@components/stores/StoreItem'
import { Key, useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import useSWR from 'swr'
import { BASE_URL } from '@components/util/config'
export default function Page({ params }: { params: { store: number } }) {
  const [products, setProducts] = useState<[]>([])
  const { data: session } = useSession()
  console.log(session, 'session')

  const fetcher = (url: string) =>
    fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session?.user.token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        return data
      })

  const { data, error, isLoading } = useSWR(
    session ? `${BASE_URL}/stores/${params.store}/items` : null,
    fetcher,
  )
  console.log(data, 'data')

  return (
    <div>
      <div className="text-black"></div>
      <div className="flex flex-col-reverse lg:flex-row max-w-6xl m-auto lg:gap-40 gap-20 lg:p-0 p-4">
        <div className="lg:mt-24">
          <h2 className="max-w-lg text-5xl leading-normal mb-8">
            Shine, Shimmer, Glimmer
          </h2>
          <p className="max-w-lg leading-normal font-light text-lg mb-8">
            Welcome to the Glittering Gems Boutique, where timeless elegance
            meets modern style! Step into our enchanting jewelry haven nestled
            within the heart of our beloved general store.
          </p>
          <div className="z-100 flex gap-4 mt-8">
            <Button variant="outline">Jewelry store</Button>
          </div>
        </div>
      </div>
      {/* product section */}
      <section>
        <div className="w-full grid lg:grid-cols-3 sm:grid-cols-2 sm:mt-0 grid-cols-1 gap-4 max-w-6xl m-auto">
          {isLoading ? 'loading...' : ''}
          {!error
            ? data?.data.result.items.map((product: any, key: Key) => (
                <>
                  <StoreItem key={key} product={product} />
                </>
              ))
            : 'error occured while fetching storesx'}
        </div>
      </section>
    </div>
  )
}
