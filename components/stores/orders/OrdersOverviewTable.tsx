import React from "react";
import item from "@public/assets/images/item.jpg";
import Image from "next/image";
import ProductDropdown from "../Inventory/ProductDropdown";
import { TableCell } from "../../ui/Table";

interface Iordersitem {
  buyer_first_name: string;
  buyer_last_name: string;
  created_at: string;
  delivery_status: string;
  item_cover_img_url: string;
  item_name: string;
  item_price: string;
  order_id: number;
  payment_channel: string;
}

interface IordersProps {
  orders: Iordersitem;
}

const OrdersOverviewTable = (props: IordersProps) => {
  const { orders } = props;
  const {
    buyer_first_name,
    buyer_last_name,
    created_at,
    delivery_status,
    item_cover_img_url,
    item_name,
    item_price,
    order_id,
    payment_channel,
  } = orders;

  return (
    <>

      <TableCell className="flex gap-2 items-center md:w-[30%] w-[15em] text-right mr-4 whitespace-nowrap">
        <p>{item_name} </p>
        <img
          // src={image_urls.length ? image_urls[0] : item}
          src={item_cover_img_url}
          alt="product"
          className="w-[25px]"
          width={25}
          height={25}
        />
      </TableCell>
      <TableCell className="md:w-[15%] w-[90px]">{order_id}</TableCell>

      <TableCell className="md:w-[15%] w-[90px] mr-6 md:mr-0">
        {`${buyer_first_name} ${buyer_last_name}`}
      </TableCell>
      <TableCell className="md:w-[15%] w-[90px]">{created_at}</TableCell>
      <TableCell className="md:w-[15%] w-[90px]">
        <button
          className={`p1-2 px-3 rounded-[8px] ${
            {
              CANCELED: "bg-red-100 text-red-600",
              DELIVERED: "bg-green-100 text-green-600",
              PROCESSING: "bg-blue-100 text-blue-600",
            }[delivery_status]
          }`}
        >
          {delivery_status}
        </button>
      </TableCell>
      <TableCell className="md:w-[15%] w-[90px]">{item_price}</TableCell>
      <TableCell className="md:w-[15%] w-[90px]">{payment_channel}</TableCell>
      {/* <TableCell>
        <ProductDropdown itemid={order_id}></ProductDropdown>
      </TableCell> */}
    </>
  );
};

export default OrdersOverviewTable;
