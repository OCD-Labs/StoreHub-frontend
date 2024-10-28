// @ts-nocheck
"use client";
import Image from "next/image";
import { Key, useState, useEffect } from "react";
import search from "../../../../../public/assets/icons/search.svg";
import filter from "../../../../../public/assets/icons/filter.svg";
import { OPTIONS } from "@app/apis";
import useProfile from "@hooks/useProfile";
import { useSearchParams } from "next/navigation";
import { FetchOrdersOverview } from "@app/apis/Inventory";
import Skeleton from "react-loading-skeleton";
import OrdersOverviewTable from "@components/stores/orders/OrdersOverviewTable";
import { getCookie } from "@lib/cookie";
import useSWR from "swr";
import { BASE_URL } from "@constants";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../../../components/ui/Table";
import { PlusIcon } from "@heroicons/react/24/solid";
import saledOverview1 from "@public/assets/images/SaledOverview1.png";
import saledOverview2 from "@public/assets/images/SaledOverview2.png";
import saledOverview3 from "@public/assets/images/SaledOverview3.png";
import saledOverview4 from "@public/assets/images/SaledOverview4.png";

const OrdersOverview = () => {
  const session = getCookie("token");
  const [loading, setloading] = useState<boolean>(true);
  const [ordersOverview, setOrdersOverview] = useState<[]>([]);

  const store_id: string | null = useSearchParams().get("id");
  console.log(session, "ordesession");

  const token = "session?.user.token";
  const GET_OPTIONS: OPTIONS = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  type OrdersOverviewType = {
    status: string;
    data: {
      message: string;
      result: {
        order: [];
        metadata: {};
      };
    };
  };
  const fetcher = (url: string) =>
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${""}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        return data;
      });

  const { data, error, isLoading } = useSWR(
    session ? `${BASE_URL}/inventory/stores/${store_id}/orders` : null,
    fetcher
  );

  const productsOverview = [
    {
      image: "/assets/images/productImage1.png",
      name: "Barilla",
      description: "Pasta",
      id: "SDT-444",
      date: "06-07-2024",
      price: "$2.50",
      deliveryStatus: "processing",
      paymentMethod: "Near",
      statusColor: "text-purple-500 ",
      statusColorDot: "bg-green-500",
    },
    {
      image: "/assets/images/productImage1.png",
      name: "Barilla",
      description: "Pasta",
      id: "SDT-444",
      date: "06-07-2024",
      price: "$2.50",
      deliveryStatus: "processing",
      paymentMethod: "Near",
      statusColor: "text-yellow-500 ",
      statusColorDot: "bg-green-500",
    },
    {
      image: "/assets/images/productImage1.png",
      name: "Barilla",
      description: "Pasta",
      id: "SDT-444",
      date: "06-07-2024",
      price: "$2.50",
      deliveryStatus: "processing",
      paymentMethod: "Near",
      statusColor: "text-orange-500 ",
      statusColorDot: "bg-green-500",
    },
    {
      image: "/assets/images/productImage1.png",
      name: "Barilla",
      description: "Pasta",
      id: "SDT-444",
      date: "06-07-2024",
      price: "$2.50",
      deliveryStatus: "processing",
      paymentMethod: "Near",
      statusColor: "text-green-500 ",
      statusColorDot: "bg-green-500",
    },
  ];

  return (
    <div className="px-5">
      <section>
        {/* Top Section with Filters and Search */}
        <div className="flex items-center rounded-lg justify-between bg-[#FCF8F2] py-1 px-4 shadow-sm">
          {/* Left section with icons */}
          <div className="flex items-center space-x-2">
            <button className="p-2 ">
              <PlusIcon className="h-5 w-5 text-black" />
            </button>

            <Image src={filter} width={25} height={25} />
          </div>

          {/* Search bar */}
          <div className="relative">
            <div className="relative">
              <input
                type="text"
                className="bg-white border border-gray-300 rounded-lg pl-10 pr-8 py-1 focus:outline-none focus:ring-2 focus:ring-gray-400"
                placeholder="Search"
                value=""
                onChange=""
              />
             <div className="absolute left-4 top-[13px] hidden lg:block">
                <Image
                  src={search}
                  height={17}
                  width={15}
                  className="text-black"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cards */}
      <div className="grid grid-cols-2  lg:grid-cols-4 mt-9 gap-4 mb-11">
        {/* Orders*/}
        <div className="bg-white p-4 rounded-lg border flex flex-col justify-between relative">
          <div className="absolute top-4 right-4">
            {/* Placeholder for dropdown */}
            <button className=" text-gray-500 text-xs sm:text-sm border px-1 sm:px-2 py-0.5 sm:py-1 rounded-lg">
              Monthly
            </button>
          </div>

          <div className="flex items-center">
            <div className="bg-orange-100 p-2 sm:p-2 rounded-md">
              {/* Placeholder for the icon */}
              <Image
                src={saledOverview1}
                alt="sales icon"
                width={32}
                height={32}
              />
            </div>
          </div>

          <div className="mt-4">
            <p className="text-gray-500 text-sm  lg:text-lg">Orders</p>
          </div>

          <div className="flex items-center justify-between mt-4">
            <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 mt-2">
              500
            </h3>
            <p className="text-green-500 text-xs sm:text-sm mt-2">▲ 10%</p>
          </div>
        </div>

        {/* Monthly Orders*/}
        <div className="bg-white p-4 rounded-lg border flex flex-col justify-between relative">
          <div className="absolute top-4 right-4"></div>

          <div className="flex items-center">
            <div className="bg-green-100 p-2 rounded-md">
              {/* Placeholder for the icon */}
              <Image src={saledOverview2} alt="icon" width={24} height={24} />
            </div>
          </div>

          <div className="mt-4">
            <p className="text-gray-500 text-sm  lg:text-lg">Monthly Orders</p>
          </div>

          <div className="flex items-center justify-between mt-4">
            <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 mt-2">
              $3400
            </h3>
            <p className="text-green-500 text-xs sm:text-sm mt-2">▲ 10%</p>
          </div>
        </div>

        {/* Total Revenue */}
        <div className="bg-white p-4 rounded-lg border flex flex-col justify-between relative">
          <div className="absolute top-4 right-4">
            {/* Placeholder for dropdown */}
            <button className=" text-gray-500 text-xs sm:text-sm border px-1 sm:px-2 py-0.5 sm:py-1 rounded-lg">
              All time
            </button>
          </div>

          <div className="flex items-center">
            <div className="bg-blue-100 p-2 rounded-md">
              {/* Placeholder for the icon */}
              <Image
                src={saledOverview3}
                alt="sales icon"
                width={32}
                height={32}
              />
            </div>
          </div>

          <div className="mt-4">
            <p className="text-gray-500">Revenues</p>
          </div>

          <div className="flex items-center justify-between mt-4">
            <h3 className="text-l sm:text-2xl font-semibold text-gray-800 mt-2">
              $33,565
            </h3>
            <p className="text-green-500 text-xs sm:text-sm mt-2">▲ 10%</p>
          </div>
        </div>
      </div>

      {/* Table  */}
      <section>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg ">
            <thead>
              <tr className="text-left text-gray-500 text-sm">
                <th className="py-3 px-4 border-b">
                  <input type="checkbox" className="rounded" />
                </th>
                <th className="py-3 px-4 border-b">Product</th>
                <th className="py-3 px-4 border-b">Order ID</th>
                <th className="py-3 px-4 border-b">Order Date</th>
                <th className="py-3 px-4 border-b">Price</th>
                <th className="py-3 px-4 border-b">Delivery Status</th>
                <th className="py-3 px-4 border-b">Payment Method</th>
              </tr>
            </thead>
            <tbody className=" border-b">
              {productsOverview.map((product, index) => (
                <tr key={index} className="border-t">
                  <td className="py-4 px-4">
                    <input type="checkbox" className="rounded" />
                  </td>
                  <td className="py-4 px-4 flex items-center space-x-2">
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={40}
                      height={40}
                    />
                    <div>
                      <p className="font-medium lg:text-[18px] text-[10px]  text-gray-800">
                        {product.name}
                      </p>
                      <p className="text-xs text-[7px] text-gray-500">
                        {product.description}
                      </p>
                    </div>
                  </td>
                  <td className="py-4 px-4 lg:text-[18px] text-[10px] text-orange-500 font-medium text-sm">
                    {product.id}
                  </td>
                  <td className="py-4 px-4 lg:text-[18px] text-[10px] text-[#00000] font-medium text-sm">
                    {product.date}
                  </td>
                  <td className="py-4 px-4 text-black font-semibold text-sm">
                    {product.price}
                  </td>
                  <td className="py-4 px-4 text-[10px] font-medium">
                    <span className=" bg-blue p-1 px-5 rounded-2xl text-tremor-brand-subtle">
                      {" "}
                      {product.deliveryStatus}
                    </span>
                  </td>
                  <td className="flex mb-4 items-center">
                    <span className={`py-4 px-4  ${product.statusColor}`}>
                      {product.paymentMethod}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* <div className="md:flex mt-4 averagescreen:mt-6">
        <section className="md:flex-1 w-full">
          <div className="flex flex-col overflow-x-scroll scroll-smooth">
            <Table>
              <TableCaption>View your order overview</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Product Name</TableHead>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Customer Name</TableHead>
                  <TableHead>Order Date</TableHead>
                  <TableHead>Delivery Status</TableHead>

                  <TableHead>Price</TableHead>
                  <TableHead>Payment Channel</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <div>Loading...</div>
                ) : error && !data?.data.result.order.length ? (
                  <h1 className="text-black sm:text-5xl text-4xl text-center mt-[20%]">
                    No Orders Yet!
                  </h1>
                ) : (
                  error &&
                  data?.data.result.order.map(
                    (order: any, key: Key | null | undefined) => (
                      <TableRow>
                        <OrdersOverviewTable key={key} orders={order} />
                      </TableRow>
                    )
                  )
                )}
              </TableBody>
            </Table>
          </div>
        </section>
      </div> */}
    </div>
  );
};

export default OrdersOverview;
