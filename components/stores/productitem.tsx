import React from 'react'
import item from '@public/assets/images/item.jpg'
import Image from 'next/image'
import ProductDropdown from './Inventory/ProductDropdown'


interface Iproductitem {
  name: string
  category: string
  id: number
  quantity: number
  status: string
  image_urls: string[]
  price: string
  supply_quantity: string
  discount_percentage: string
}

interface IproductProps {
  product: Iproductitem
}

const ProductItem = (props: IproductProps) => {
  const { product } = props
  const {
    name,
    category,
    id,
    quantity,
    status,
    image_urls,
    price,
    supply_quantity,
    discount_percentage,
  } = product


  return (
    <>
      <div className="flex justify-between items-center py-3">
        <span className="flex gap-2 items-center md:w-[30%] w-[15em] text-right mr-4 whitespace-nowrap">
          <img src="../../assets/icons/dot.svg" alt="dot" className="w-[5px]" />
          <p>{name} </p>
          <Image
            src={image_urls.length ? image_urls[0] : item}
            alt="product"
            className="w-[25px]"
            width={25}
            height={25}
          />
        </span>
        <p className="md:w-[15%] w-[90px] mr-6 md:mr-0">{category}</p>
        <p className="md:w-[15%] w-[90px]">{id}</p>
        <p className="md:w-[15%] w-[90px]">{supply_quantity}</p>
        <p className="md:w-[15%] w-[90px]">{price}</p>
        <p className="md:w-[15%] w-[90px]">{discount_percentage}</p>
        <ProductDropdown itemid={id}></ProductDropdown>
      </div>
      <hr className="w-[95%] mx-auto" />
    </>
  )
}

export default ProductItem
