import Image from 'next/image'
import Link from 'next/link'

import cartico from '../../public/assets/icons/cartico.svg'

import necklace from '../../public/assets/images/necklace.png'
import nearico from '../../public/assets/icons/nearicon.png'

export default function StoreItem({ product }: { product: StoreItem }) {
  console.log(product)

  return (
    <div>
      <Link href="/products">
        {' '}
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
      </Link>
    </div>
  )
}
