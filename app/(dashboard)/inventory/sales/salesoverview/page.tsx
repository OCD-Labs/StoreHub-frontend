// @ts-nocheck
"use client";
import React, { Key, useEffect, useState } from "react";
import { GetSalesOverview } from "@app/apis/Inventory";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import useProfile from "@hooks/useProfile";
import search from "../../../../../public/assets/icons/search.svg";
import filter from "../../../../../public/assets/icons/filter.svg";
import ProductItem from "@components/stores/productitem";
import Skeleton from "react-loading-skeleton";
import { ToastContainer } from "react-toastify";
import { OPTIONS } from "@app/apis";
import { getCookie } from "@lib/cookie";
import SalesOverviewTable from "@components/stores/sales/SalesOverviewTable";
import saledOverview1 from "@public/assets/images/saledOverview1.png";
import saledOverview2 from "@public/assets/images/saledOverview2.png";
import saledOverview3 from "@public/assets/images/SaledOverview3.png";
import saledOverview4 from "@public/assets/images/SaledOverview4.png";
import GrowthChart from "@public/assets/images/GrowthChart.png";
import SearchIcon from "@public/assets/images/SearchIcon.png";
import { PlusIcon, AdjustmentsHorizontalIcon } from "@heroicons/react/24/solid";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../../../components/ui/Table";

const SalesOverview: React.FC = () => {
  const [loading, setloading] = useState<boolean>(true);
  const [SalesOverview, setSalesOverview] = useState<[]>([]);
  const session = getCookie("token");
  const userID: string | null = useSearchParams().get("user");

  const id: string | null = useSearchParams().get("id");

  const GET_OPTIONS: OPTIONS = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${""}`,
    },
  };

  async function getSales() {
    try {
      const sales: SalesOverview = await GetSalesOverview(
        userID,
        id,
        GET_OPTIONS
      );
      console.log(sales);

      setSalesOverview(sales.data.result.sales_overview);
    } catch (error) {
      throw new Error("Error while fetching overview");
    }
  }

  useEffect(() => {
    getSales().then(() => {
      setloading(false);
    });
  }, [1, session]);
  console.log(SalesOverview, "sales");

  const recentSales = [
    {
      image: "/assets/images/productImage1.png",
      name: "Barilla",
      description: "7 Pasta",
      category: "Food",
      price: "$1.25",
      delivery: "11-11-2024",
    },
    {
      image: "/assets/images/productImage2.png",
      name: "Indomie",
      description: "12 Noodles",
      category: "Food",
      price: "$1.25",
      delivery: "11-11-2024",
    },
    {
      image: "/assets/images/productImage3.png",
      name: "Pack pasta",
      description: "1 Pasta",
      category: "Food",
      price: "$1.25",
      delivery: "11-11-2024",
    },
    {
      image: "/assets/images/productImage4.png",
      name: "Heirloom",
      description: "3 Apples",
      category: "Food",
      price: "$1.25",
      delivery: "11-11-2024",
    },
  ];

  return (
    <div className="px-10">
      {/* Top Section with Filters and Search */}
      <div className="flex items-center rounded-lg justify-between bg-[#FCF8F2] py-2 px-4 shadow-sm">
        {/* Left section with icons */}
        <div className="flex items-center space-x-2">
          <button
            
            className="p-2 "
          >
            <PlusIcon className="h-5 w-5 text-black" />
          </button>

          <Image src={filter} width={25} height={25} />
        </div>

        {/* Search bar */}
        <div className="relative">
          <div className="relative">
            <input
              type="text"
              className="bg-white border border-gray-300 rounded-lg pl-10 pr-8 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400"
              placeholder="Search"
              value=""
              onChange=""
            />
            <div className="absolute left-4 top-[13px]">
              <Image
                src={SearchIcon}
                height={17}
                width={15}
                className="text-black"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="md:flex mt-4 averagescreen:mt-6">
        <ToastContainer />
        <section className="md:flex-1">
          {/* my edits starts here */}

          <div className="mb-11">
            <div className="grid grid-cols-4 gap-4 mb-8">
              {/* Total Sales one */}
              <div className="bg-white p-4 rounded-lg shadow-md flex flex-col justify-between relative">
                <div className="absolute top-4 right-4">
                  {/* Placeholder for dropdown */}
                  <button className=" text-gray-500 text-xs border px-2 py-1 rounded-lg">
                    Monthly ▼
                  </button>
                </div>

                <div className="flex items-center">
                  <div className="bg-orange-100 p-2 rounded-md">
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
                  <p className="text-gray-500">Total Sales</p>
                </div>

                <div className="flex items-center justify-between mt-4">
                  <h3 className="text-2xl font-semibold text-gray-800 mt-2">
                    567
                  </h3>
                  <p className="text-green-500 mt-2">▲ 10%</p>
                </div>
              </div>

              {/* Monthly Sales*/}
              <div className="bg-white p-4 rounded-lg shadow-md flex flex-col justify-between relative">
                <div className="absolute top-4 right-4"></div>

                <div className="flex items-center">
                  <div className="bg-green-100 p-2 rounded-md">
                    {/* Placeholder for the icon */}
                    <Image
                      src={saledOverview2}
                      alt="icon"
                      width={24}
                      height={24}
                    />
                  </div>
                </div>

                <div className="mt-4">
                  <p className="text-gray-500">Monthly Sales</p>
                </div>

                <div className="flex items-center justify-between mt-4">
                  <h3 className="text-2xl font-semibold text-gray-800 mt-2">
                    $3400
                  </h3>
                  <p className="text-green-500 mt-2">▲ 10%</p>
                </div>
              </div>

              {/* Total Revenue */}
              <div className="bg-white p-4 rounded-lg shadow-md flex flex-col justify-between relative">
                <div className="absolute top-4 right-4">
                  {/* Placeholder for dropdown */}
                  <button className=" text-gray-500 text-xs border px-2 py-1 rounded-lg">
                    Monthly ▼
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
                  <p className="text-gray-500">Total Revenue</p>
                </div>

                <div className="flex items-center justify-between mt-4">
                  <h3 className="text-2xl font-semibold text-gray-800 mt-2">
                    $33,565
                  </h3>
                  <p className="text-green-500 mt-2">▲ 10%</p>
                </div>
              </div>

              {/* Total Customers */}

              <div className="bg-white p-4 rounded-lg shadow-md flex flex-col justify-between relative">
                <div className="absolute top-4 right-4">
                  {/* Placeholder for dropdown */}
                  <button className=" text-gray-500 text-xs border px-2 py-1 rounded-lg">
                    Monthly ▼
                  </button>
                </div>

                <div className="flex items-center">
                  <div className="bg-purple-100 p-2 rounded-md">
                    {/* Placeholder for the icon */}
                    <Image
                      src={saledOverview4}
                      alt="sales icon"
                      width={24}
                      height={24}
                    />
                  </div>
                </div>

                <div className="mt-4">
                  <p className="text-gray-500">Total Customers</p>
                </div>

                <div className="flex items-center justify-between mt-4">
                  <h3 className="text-2xl font-semibold text-gray-800 mt-2">
                    145
                  </h3>
                  <p className="text-green-500 mt-2">▲ 10%</p>
                </div>
              </div>
            </div>

            {/* Growth Chart */}
            <div className="bg-[#FCF8F2] p-6 rounded-lg shadow-md">
              <div className="flex justify-between">
                {/* Header Section */}
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center">
                    <h3 className="text-xl font-semibold text-gray-800 mr-2">
                      Growth Chart
                    </h3>
                    <button className=" text-gray-500 text-xs px-2 py-1 border rounded-full">
                      ?
                    </button>
                  </div>
                </div>

                {/* Labels Section */}
                <div className="flex justify-end space-x-4 mb-6">
                  <div className="flex items-center">
                    <span className="w-3 h-3 bg-purple-500 rounded-full mr-1"></span>
                    <span className="text-gray-500 text-sm">Customers</span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-3 h-3 bg-green-500 rounded-full mr-1"></span>
                    <span className="text-gray-500 text-sm">Sales</span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-3 h-3 bg-yellow-500 rounded-full mr-1"></span>
                    <span className="text-gray-500 text-sm">Growth</span>
                  </div>
                </div>
              </div>

              {/* Placeholder for the Chart Image */}
              <div className="h-64 bg-[#FCF8F2] flex justify-center items-center rounded-lg">
                <Image src={GrowthChart} alt="chart" width={700} height={400} />
              </div>
            </div>
          </div>

          {/* Table */}
          <h2 className="text-2xl font-semibold mb-5">Recent Sales</h2>
          <div className="overflow-x-auto mb-[100px]">
            <table className="min-w-full bg-white rounded-lg ">
              <thead>
                <tr className="text-left text-gray-500 text-sm">
                  <th className="py-3 px-4 border-b">
                    <input type="checkbox" className="rounded" />
                  </th>
                  <th className="py-3 px-4 border-b">Product</th>
                  <th className="py-3 px-4 border-b">Category</th>
                  <th className="py-3 px-4 border-b">Price</th>
                  <th className="py-3 px-4 border-b">Delivery</th>
                </tr>
              </thead>
              <tbody className=" border-b">
                {recentSales.map((recentSales, index) => (
                  <tr key={index} className="border-t">
                    <td className="py-4 px-4">
                      <input type="checkbox" className="rounded" />
                    </td>
                    <td className="py-4 px-4 flex items-center space-x-2">
                      <Image
                        src={recentSales.image}
                        alt={recentSales.name}
                        width={40}
                        height={40}
                      />
                      <div>
                        <p className="font-medium text-gray-800">
                          {recentSales.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {recentSales.description}
                        </p>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-orange-500 font-medium text-sm">
                      {recentSales.category}
                    </td>
                    <td className="py-4 px-4 text-black font-medium text-sm">
                      {recentSales.price}
                    </td>
                    <td className="py-4 px-4 text-black font-medium text-sm">
                      {recentSales.delivery}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Former table with it's Logic starts here */}
          {/* <div className="flex flex-col overflow-x-scroll scroll-smooth">
            <Table>
              <TableCaption>View your store overview</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Product Name</TableHead>
                  <TableHead>ID</TableHead>
                  <TableHead>Sales No.</TableHead>
                  <TableHead>Sales%</TableHead>
                  <TableHead>price</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <Skeleton count={10} />
                ) : SalesOverview?.length < 1 ? (
                  <h1 className="text-black sm:text-5xl text-4xl text-center mt-[20%]">
                    No Overview Yet!
                  </h1>
                ) : (
                  SalesOverview?.map(
                    (product: any, key: Key | null | undefined) => (
                      <TableRow>
                        <SalesOverviewTable key={key} sales={product} />
                      </TableRow>
                    )
                  )
                )}
              </TableBody>
            </Table>
          </div> */}
        </section>
      </div>
    </div>
  );
};

export default SalesOverview;
