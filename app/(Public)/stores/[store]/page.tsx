import Image from 'next/image'
import owner from '../../../../public/assets/images/owner.jpg'

import StoreItem from '@components/stores/StoreItem'
import { Key } from 'react'

async function getStoreItem(id: number) {
  const res = await fetch(
    `https://store-hub-djxu.onrender.com/api/v1/stores/${id}/items`,
  )
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.
  debugger
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }

  return res.json()
}

export default async function Page({ params }: { params: { store: number } }) {
  const data = await getStoreItem(params.store)
  const {
    data: { result: items },
  } = data
  const products = items?.items
  console.log(products, 'items')

  return (
    <div>
      <div className="text-black">
        <div>
          <div>
            <h2 className="text-2xl">
              Shine, Shimmer, Glimmer {params.store} hh
            </h2>
            <p>
              Welcome to the Glittering Gems Boutique, where timeless elegance
              meets modern style! Step into our enchanting jewelry haven nestled
              within the heart of our beloved general store.
            </p>
          </div>
          <div className="flex justify-between mb-20">
            <div className="flex gap-2">
              <button className="outline_btn hover:bg-white hover:text-dark pad">
                Apparels
              </button>
              <button className="outline_btn hover:bg-white hover:text-dark">
                Jewelries
              </button>
              <button className="outline_btn hover:bg-white hover:text-dark">
                Pieces
              </button>
            </div>
            <div>
              <Image
                className="rounded-full"
                src={owner}
                alt="pfpic"
                width={60}
                height={60}
              ></Image>
            </div>
          </div>
        </div>
      </div>
      {/* product section */}
      <section>
        <div className="">currency: NEAR</div>
        <div className="grid grid-cols-1 md:lg:xl:grid-cols-3 group bg-white shadow-xl shadow-neutral-100 border mb-20">
          {products && products.length
            ? products.map((product: any, key: Key) => (
                <>
                  <StoreItem product={product} />
                </>
              ))
            : 'no products yet'}
        </div>
      </section>
    </div>
  )
}
