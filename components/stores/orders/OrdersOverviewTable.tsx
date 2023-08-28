import React from "react";
import item from "@public/assets/images/item.jpg";
import Image from "next/image";
import ProductDropdown from "../Inventory/ProductDropdown";
import { TableCell } from "../../ui/Table";

interface Iproductitem {
  order_id: number;
  product_name: string;
  image_urls: string[];
  customer_name: string;
  order_date: string;
  delivery_status: string;
  price: string;
  payment_channel: string;
}

interface IproductProps {
  orders: Iproductitem;
}

const OrdersOverviewTable = (props: IproductProps) => {
  const { orders } = props;
  const {
    order_id,
    product_name,
    image_urls,
    customer_name,
    order_date,
    delivery_status,
    price,
    payment_channel,
  } = orders;

  return (
    <>
      <TableCell className="md:w-[15%] w-[90px]">{order_id}</TableCell>
      <TableCell className="flex gap-2 items-center md:w-[30%] w-[15em] text-right mr-4 whitespace-nowrap">
        <p>{product_name} </p>
        <Image
          src={image_urls.length ? image_urls[0] : item}
          alt="product"
          className="w-[25px]"
          width={25}
          height={25}
        />
      </TableCell>
      <TableCell className="md:w-[15%] w-[90px] mr-6 md:mr-0">
        {customer_name}
      </TableCell>
      <TableCell className="md:w-[15%] w-[90px]">{order_date}</TableCell>
      <TableCell className="md:w-[15%] w-[90px]">{delivery_status}</TableCell>
      <TableCell className="md:w-[15%] w-[90px]">{price}</TableCell>
      <TableCell className="md:w-[15%] w-[90px]">{payment_channel}</TableCell>
      <TableCell>
        <ProductDropdown itemid={order_id}></ProductDropdown>
      </TableCell>
    </>
  );
};

export default OrdersOverviewTable;
