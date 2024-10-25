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
import saledOverview1 from "../../../../../public/assets/images/SaledOverview1.png";
import saledOverview2 from "../../../../../public/assets/images/SaledOverview2.png";
import saledOverview3 from "../../../../../public/assets/images/SaledOverview3.png";
import saledOverview4 from "../../../../../public/assets/images/SaledOverview4.png";
import GrowthChart from "../../../../../public/assets/images/GrowthChart.png";
import SearchIcon from "../../../../../public/assets/images/SearchIcon.png";
import { PlusIcon, AdjustmentsHorizontalIcon } from "@heroicons/react/24/solid";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
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

  // Table dummy Data
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

  // Chart dummy data
  const data = [
    { month: "Jan", customers: 1000, sales: 2400, growth: 2400 },
    { month: "Feb", customers: 1200, sales: 1398, growth: 2210 },
    { month: "Mar", customers: 2000, sales: 9800, growth: 2290 },
    { month: "Apr", customers: 2780, sales: 3908, growth: 2000 },
    { month: "May", customers: 1890, sales: 4800, growth: 2181 },
    { month: "Jun", customers: 2390, sales: 3800, growth: 2500 },
    { month: "Jul", customers: 3490, sales: 4300, growth: 2100 },
    { month: "Aug", customers: 3000, sales: 5000, growth: 2900 },
    { month: "Sep", customers: 2000, sales: 3500, growth: 2000 },
    { month: "Oct", customers: 1500, sales: 2700, growth: 2200 },
    { month: "Nov", customers: 3000, sales: 3000, growth: 2400 },
    { month: "Dec", customers: 3200, sales: 4000, growth: 2700 },
  ];

  return (
    <div className="px-10">
      {/* Top Section with Filters and Search */}
      <div className="flex items-center rounded-lg justify-between bg-[#FCF8F2] py-2 px-4 shadow-sm">
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
            <div className="grid grid-cols-2  lg:grid-cols-4 gap-4 mb-8">
              {/* Total Sales one */}
              <div className="bg-white p-4 rounded-lg border flex flex-col justify-between relative">
                <div className="absolute top-4 right-4">
                  {/* Placeholder for dropdown */}
                  <button className="text-gray-500 text-xs sm:text-sm border px-1 sm:px-2 py-0.5 sm:py-1 rounded-lg">
                    Monthly ▼
                  </button>
                </div>

                <div className="flex items-center">
                  <div className="bg-orange-100 p-1 sm:p-2 rounded-md">
                    {/* Placeholder for the icon */}
                    <Image
                      src={saledOverview1}
                      alt="sales icon"
                      width={24}
                      height={24}
                    />
                  </div>
                </div>

                <div className="mt-4">
                  <p className="text-gray-500 text-sm  lg:text-lg">
                    Total Sales
                  </p>
                </div>

                <div className="flex items-center justify-between mt-4">
                  <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 mt-2">
                    567
                  </h3>
                  <p className="text-green-500 text-xs sm:text-sm mt-2">
                    ▲ 10%
                  </p>
                </div>
              </div>

              {/* Monthly Sales*/}
              <div className="bg-white p-4 rounded-lg border flex flex-col justify-between relative">
                <div className="absolute top-4 right-4"></div>

                <div className="flex items-center">
                  <div className="bg-green-100 p-2 sm:p-2 rounded-md">
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
                  <p className="text-gray-500 text-sm  lg:text-lg">
                    Monthly Sales
                  </p>
                </div>

                <div className="flex items-center justify-between mt-4">
                  <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 mt-2">
                    $3400
                  </h3>
                  <p className="text-green-500 text-xs sm:text-sm mt-2">
                    ▲ 10%
                  </p>
                </div>
              </div>

              {/* Total Revenue */}
              <div className="bg-white p-4 rounded-lg border flex flex-col justify-between relative">
                <div className="absolute top-4 right-4">
                  {/* Placeholder for dropdown */}
                  <button className=" text-gray-500 text-xs sm:text-sm border px-1 sm:px-1 py-0.5 sm:py-1 rounded-lg">
                    Monthly ▼
                  </button>
                </div>

                <div className="flex items-center">
                  <div className="bg-blue-100 p-2 sm:p-2 rounded-md">
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
                  <p className="text-gray-500 text-sm  lg:text-lg">
                    Total Revenue
                  </p>
                </div>

                <div className="flex items-center justify-between mt-4">
                  <h3 className="text-l sm:text-2xl font-semibold text-gray-800 mt-2">
                    $33,565
                  </h3>
                  <p className="text-green-500 text-xs sm:text-sm mt-2">
                    ▲ 10%
                  </p>
                </div>
              </div>

              {/* Total Customers */}

              <div className="bg-white p-4 rounded-lg border flex flex-col justify-between relative">
                <div className="absolute top-4 right-4">
                  {/* Placeholder for dropdown */}
                  <button className=" text-gray-500 text-xs sm:text-sm border px-1 sm:px-2 py-0.5 sm:py-1 rounded-lg">
                    Monthly ▼
                  </button>
                </div>

                <div className="flex items-center">
                  <div className="bg-blue-100 p-2 sm:p-2 rounded-md">
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
                  <p className="text-gray-500 text-sm  lg:text-lg">
                    Total Customers
                  </p>
                </div>

                <div className="flex items-center justify-between mt-4">
                  <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 mt-2">
                    145
                  </h3>
                  <p className="text-green-500 text-xs sm:text-sm mt-2">
                    ▲ 10%
                  </p>
                </div>
              </div>
            </div>

            {/* Growth Chart */}
            <div className="bg-[#FCF8F2] p-6 rounded-lg shadow-md">
              <div className="flex justify-between">
                {/* Header Section */}
                <div className="flex justify-between items-center mb-2 sm:mb-4">
                  <div className="flex items-center">
                    <h3 className="text-[12px] lg:text-xl font-semibold text-gray-800 mr-1 sm:mr-1">
                      Growth Chart
                    </h3>
                    <button className="hidden sm:block text-gray-500 text-xs sm:text-sm px-1 sm:px-2 py-0.5 sm:py-1 border rounded-full">
                      ?
                    </button>
                  </div>
                </div>

                {/* Labels Section */}
                <div className="flex justify-end space-x-2 mt-2 lg:mt-0 sm:space-x-4 mb-4 sm:mb-6">
                  <div className="flex items-center">
                    <span className="w-2 h-2 sm:w-3 sm:h-3 bg-purple-500 rounded-full mr-1"></span>
                    <span className="text-xs sm:text-sm text-gray-500">
                      Customers
                    </span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-2 h-2 sm:w-3 sm:h-3 bg-green-500 rounded-full mr-1"></span>
                    <span className="text-xs sm:text-sm text-gray-500">
                      Sales
                    </span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-2 h-2 sm:w-3 sm:h-3 bg-yellow-500 rounded-full mr-1"></span>
                    <span className="text-xs sm:text-sm text-gray-500">
                      Growth
                    </span>
                  </div>
                </div>
              </div>

              {/* charts */}
              <div className="p-6 flex justify-center items-center">
                {/* Responsive Container */}
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart
                    data={data}
                    margin={{
                      top: 10,
                      right: 30,
                      left: 0,
                      bottom: 0,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />

                    {/* Lines for Customers, Sales, Growth */}
                    <Line
                      type="monotone"
                      dataKey="customers"
                      stroke="#8884d8"
                      activeDot={{ r: 8 }}
                    />
                    <Line type="monotone" dataKey="sales" stroke="#82ca9d" />
                    <Line type="monotone" dataKey="growth" stroke="#ffc658" />
                  </LineChart>
                </ResponsiveContainer>
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
