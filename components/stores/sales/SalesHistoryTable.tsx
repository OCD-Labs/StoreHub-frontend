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



export interface ISalesHistory {
  created_at: string
  customer_account_id: string
  customer_id: number
  delivery_date: string
  item_cover_img_url: string
  item_id: number
  item_name: string
  item_price: string
  order_date: string
  order_id: number
  sale_id: number
  store_id: number
}

interface ISalesHistoryProps {
  sales: ISalesHistory
}

const SalesHistoryTable = (props: ISalesHistoryProps) => {
  const { sales } = props
  const {
    created_at,
    customer_account_id,
    customer_id,
    delivery_date,
    item_cover_img_url,
    item_id,
    item_name,
    item_price,
    order_date,
    order_id,
    sale_id,
    store_id,
  } = sales

    return (
      
    <>
      <TableCell className="md:w-[15%] w-[90px] mr-6 md:mr-0">
        {item_id}
      </TableCell>
      <TableCell className="md:w-[15%] w-[90px]">
        {customer_account_id}
      </TableCell>
      <TableCell className="md:w-[15%] w-[90px]">{item_name}</TableCell>
      <TableCell className="md:w-[15%] w-[90px]">{item_id}</TableCell>
      <TableCell className="md:w-[15%] w-[90px]">{order_date}</TableCell>
      <TableCell className="md:w-[15%] w-[90px]">{delivery_date}</TableCell>
      <TableCell className="md:w-[15%] w-[90px]">{item_price}</TableCell>
    </>
  )
}

export default SalesHistoryTable
