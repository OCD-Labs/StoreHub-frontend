import Image from 'next/image'
import owner from '../../../../public/assets/images/owner.jpg'

import StoreItem from '@components/stores/StoreItem'

export default function Page({ params }: { params: { slug: string } }) {
  return (
    <div>
      <div className="text-black">
        <div>
          <div>
            <h2 className="text-2xl">Shine, Shimmer, Glimmer</h2>
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
          <StoreItem />
          <StoreItem />
          <StoreItem />
          <StoreItem />
          <StoreItem />
        </div>
      </section>
    </div>
  )
}

// export async function generateStaticParams() {
//   // const posts = await fetch('https://.../posts').then((res) => res.json())
//   // return posts.map((post) => ({
//   //   slug: post.slug,
//   // }))
// }
