import React from 'react'
import item from '@public/assets/images/item.jpg'
import Image from 'next/image'
import ProductDropdown from '../Inventory/ProductDropdown'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../ui/Table'

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
      <TableCell className="flex gap-2 items-center md:w-[30%] w-[15em] text-right mr-4 whitespace-nowrap">
        <p>{name} </p>
        <Image
          src={image_urls.length ? image_urls[0] : item}
          alt="product"
          className="w-[25px]"
          width={25}
          height={25}
        />
      </TableCell>
      <TableCell className="md:w-[15%] w-[90px] mr-6 md:mr-0">
        {category}
      </TableCell>
      <TableCell className="md:w-[15%] w-[90px]">{id}</TableCell>
      <TableCell className="md:w-[15%] w-[90px]">{supply_quantity}</TableCell>
      <TableCell className="md:w-[15%] w-[90px]">{price}</TableCell>
      <TableCell className="md:w-[15%] w-[90px]">
        {discount_percentage}
      </TableCell>
      <TableCell>
        <ProductDropdown itemid={id}></ProductDropdown>
      </TableCell>
    </>
  )
}

export default ProductItem
