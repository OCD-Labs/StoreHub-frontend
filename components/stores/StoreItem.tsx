import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@components/ui/Button'
import cartico from '../../public/assets/icons/cartico.svg'

import necklace from '../../public/assets/images/necklace.png'
import nearico from '../../public/assets/icons/nearicon.png'

export default function StoreItem({ product }: { product: StoreItem }) {
  console.log(product)

  return (
    <div>
      {/* <Link href="/products">

        <div className=" flex flex-col items-center text-center group md:lg:xl:border-r md:lg:xl:border-b hover:bg-slate-50 cursor-pointer">
          <Image
            src={product.image_urls[0]}
            width={1000}
            height={1000}
            alt="necklace"
          ></Image>
          <div className="w-full flex justify-between mt-4 border-t p-3">
            <div>
              <p className=" text-black">{product.name}</p>

              <p className=" text-xs">{product.price}</p>
            </div>
            <div>
              <Image src={cartico} alt="cartico" width={20} height={20}></Image>
            </div>
          </div>
        </div>
      </Link> */}

      <div className="group m-auto my-10 flex w-full max-w-xs flex-col overflow-hidden border border-gray-100 bg-white shadow-md rounded-lg">
        <Link href={`/products`}>
          <Image
            src={
              product.image_urls[0]
                ? product.image_urls[0]
                : 'https://plus.unsplash.com/premium_photo-1683798464819-d1376249293e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2960&q=80'
            }
            width={600}
            height={600}
            alt="storimg"
          ></Image>
          <div className="absolute bottom-0 mb-4 flex w-full justify-center space-x-4">
            <div className="h-3 w-3 rounded-full border-2 border-white bg-white"></div>
            <div className="h-3 w-3 rounded-full border-2 border-white bg-transparent"></div>
            <div className="h-3 w-3 rounded-full border-2 border-white bg-transparent"></div>
          </div>
          <div className="absolute -right-16 bottom-0 mr-2 mb-4 space-y-2 transition-all duration-300 group-hover:right-0">
            <button className="flex h-10 w-10 items-center justify-center bg-gray-900 text-white transition hover:bg-gray-700">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                  clip-rule="evenodd"
                />
              </svg>
            </button>
          </div>
        </Link>
        <div className="mt-4 px-5 pb-5 border-t pt-2">
          <div className="flex justify-between">
            <div className="flex flex-col gap-2">
              <h5 className="text-xl tracking-tight text-slate-900 font-bold">
                {product.name}
              </h5>

              <div className="flex gap-2 mt-2 ">
                <Button
                  variant="outline"
                  className="px-1 font-light w-[70px] h-[45px] text-xs"
                >
                  Add to cart
                </Button>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <p>N{product.price}</p>
              <Button
                variant="default"
                className="px-1 font-light w-[70px] h-[45px] text-xs"
              >
                Buy Now
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
