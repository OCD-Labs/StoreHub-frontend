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

interface ISales {
  item_cover_img_url: string
  item_id: number
  item_name: string
  item_price: string
  number_of_sales: number
  revenue: string
  sale_id: number
  sales_percentage: string
  store_id: number
}

interface ISalesProps {
  sales: ISales
}

const SalesOverviewTable = (props: ISalesProps) => {
  const { sales } = props
  const {
   item_cover_img_url,
  item_id,
  item_name,
  item_price,
  number_of_sales,
  revenue,
  sale_id,
  sales_percentage,
  store_id,
  } = sales

  return (
    <>

      <TableCell className="md:w-[15%] w-[90px] mr-6 md:mr-0">
        {item_name}
      </TableCell>
      <TableCell className="md:w-[15%] w-[90px]">{sale_id}</TableCell>
      <TableCell className="md:w-[15%] w-[90px]">{number_of_sales}</TableCell>
      <TableCell className="md:w-[15%] w-[90px]">{sales_percentage}</TableCell>
      <TableCell className="md:w-[15%] w-[90px]">
        {item_price}
      </TableCell>

    </>
  )
}

export default SalesOverviewTable
