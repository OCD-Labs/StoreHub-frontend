"use client";

import Image from "next/image";
import DashboardImage from "@public/assets/images/DashboardImage.png";
import { PlusIcon, AdjustmentsHorizontalIcon } from "@heroicons/react/24/solid";
import { useState } from "react";

const Dashboard = () => {
  const [search, setSearch] = useState("");

  const products = [
    {
      image: "/path/to/barilla.png",
      name: "Barilla",
      description: "Pasta",
      id: "WDT-444",
      category: "Food",
      quantity: 240,
      price: "$1.25",
      status: "In Stock",
      statusColor: "text-green-500",
    },
    {
      image: "/path/to/indomie.png",
      name: "Indomie",
      description: "Noodles",
      id: "WDT-768",
      category: "Food",
      quantity: 190,
      price: "$1.25",
      status: "In Stock",
      statusColor: "text-green-500",
    },
    {
      image: "/path/to/pack_pasta.png",
      name: "Pack pasta",
      description: "Pasta",
      id: "WDT-890",
      category: "Food",
      quantity: 190,
      price: "$1.25",
      status: "Out of Stock",
      statusColor: "text-red-500",
    },
    {
      image: "/path/to/heirloom.png",
      name: "Heirloom",
      description: "Apples",
      id: "WDT-567",
      category: "Food",
      quantity: 190,
      price: "$1.25",
      status: "Low Stock",
      statusColor: "text-yellow-500",
    },
  ];

  return (
    <>
      <div className="max-w-4xl mx-auto p-6">
        <div className="flex items-center space-x-4">
          {/* Profile Image */}
          <div className=" ">
            <Image
              src={DashboardImage}
              alt="Dashboard Image"
              className="rounded-[100%] w-[100px] h-[100px] "
            />
          </div>

          {/* Store Info */}
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Shine, Shimmer, Glimmer
              <span className="ml-2 inline-flex items-center bg-green-100 text-green-600 text-sm font-medium px-2 py-0.5 rounded-full">
                <svg
                  className="w-4 h-4 mr-1"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
                Store ID
              </span>
            </h1>
            <p className="text-gray-600 mt-2">
              Welcome to the Glittering Gems Boutique, where timeless elegance
              meets modern style! Step into our enchanting jewelry haven nestled
              within the heart of our beloved general store.
            </p>
          </div>
        </div>

        {/* Placeholder Content */}
        <div className="mt-8 border-2 border-gray-300 rounded-lg h-96 flex justify-center items-center">
          <p className="text-gray-400 text-xl">Open to ideas</p>
        </div>
      </div>

      {/* Product listed items */}
      <div className="max-w-7xl mx-auto p-6">
        {/* Top Section with Filters and Search */}
        <div className="flex items-center rounded-lg justify-between bg-[#fdf8f4] py-2 px-4 shadow-sm">
          {/* Left section with icons */}
          <div className="flex items-center space-x-2">
            <button className="p-2 ">
              <PlusIcon className="h-5 w-5 text-black" />
            </button>
            <button className="p-2  ">
              <AdjustmentsHorizontalIcon className="h-5 w-5 text-black" />
            </button>
          </div>

          {/* Search bar */}
          <div className="relative">
            <input
              type="text"
              className="bg-white border border-gray-300 rounded-lg pl-4 pr-8 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400"
              placeholder=" Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
            <thead>
              <tr className="text-left text-gray-500 text-sm">
                <th className="py-3 px-4 border-b">
                  <input type="checkbox" className="rounded" />
                </th>
                <th className="py-3 px-4 border-b">Product</th>
                <th className="py-3 px-4 border-b">ID</th>
                <th className="py-3 px-4 border-b">Category</th>
                <th className="py-3 px-4 border-b">Quantity</th>
                <th className="py-3 px-4 border-b">Pricing</th>
                <th className="py-3 px-4 border-b">Status</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => (
                <tr key={index} className="border-t">
                  <td className="py-4 px-4">
                    <input type="checkbox" className="rounded" />
                  </td>
                  <td className="py-4 px-4 flex items-center space-x-2">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-10 h-10 object-cover rounded"
                    />
                    <div>
                      <p className="font-medium text-gray-800">
                        {product.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {product.description}
                      </p>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-orange-500">{product.id}</td>
                  <td className="py-4 px-4">{product.category}</td>
                  <td className="py-4 px-4">{product.quantity}</td>
                  <td className="py-4 px-4">{product.price}</td>
                  <td
                    className={`py-4 px-4 font-medium ${product.statusColor}`}
                  >
                    {product.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
