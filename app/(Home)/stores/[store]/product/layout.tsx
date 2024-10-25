"use client";


import React from "react";
import Image from "next/image";
import reviewProduct from "@public/assets/images/reviewProduct.png";
import { MapPinIcon, TruckIcon } from "@heroicons/react/24/outline"; // For icons
import { getCookie } from "@lib/cookie";
import { useSearchParams } from "next/navigation";
import { AuthProvider } from "@contexts/AuthProvider";
import Link from "next/link";

const Product = ({ children }: { children: React.ReactNode }) => {
    const token = useSearchParams().get("token");
    const userID = useSearchParams().get("user");
    const id = useSearchParams().get("id");
    const name = useSearchParams().get("name");



    const session = getCookie("token");
    console.log(session, "session");
  
    const fetcher = (url: string) =>
      fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          return data;
        });



  return (
    <div className=" p-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Section: Product Image and Thumbnails */}
        <div className="lg:col-span-1">
          <div className="border p-4 rounded-lg">
            <Image
              src={reviewProduct}
              alt="Pasta Spaghetti pack"
              width={400}
              height={400}
              className="rounded-lg"
            />
          </div>

          {/* Thumbnails */}
          <div className="flex space-x-2 mt-4">
            <div className="border p-1 rounded-lg cursor-pointer">
              <Image
                src={reviewProduct}
                alt="Thumbnail 1"
                width={60}
                height={60}
                className="rounded-lg"
              />
            </div>
            <div className="border p-1 rounded-lg cursor-pointer">
              <Image
                src={reviewProduct}
                alt="Thumbnail 2"
                width={60}
                height={60}
                className="rounded-lg"
              />
            </div>
          </div>
        </div>

        {/* Middle Section: Product Info */}
        <div className=" bg-white rounded-lg ">
          {/* Price Section */}
          <div className="flex items-center space-x-2">
            <p className="text-4xl font-bold text-gray-900">$3.99</p>
            <p className="text-gray-400 line-through text-xl">$4.99</p>
            <div className="bg-red-500 text-white text-sm px-2 py-1 rounded">
              -13%
            </div>
          </div>

          <p className="text-sm text-gray-500 mt-1">You save $1.00</p>

          {/* Product Title */}
          <h2 className="text-xl font-semibold text-gray-900 mt-2">
            Pasta Spaghetti pack 6 in 1 value pack
          </h2>

          {/* Rating & Sold Information */}
          <div className="flex items-center mt-2 space-x-1">
            <div className="flex items-center text-yellow-500">★★★★☆</div>
            <p className="text-sm text-gray-600">4.0 | 5876+ sold</p>
          </div>

          {/* Quantity Selector */}
          <div className="mt-4">
            <p className="text-sm font-semibold mb-2">Quantity</p>
            <div className="flex items-center space-x-4">
              <button className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-lg font-bold text-gray-500">
                -
              </button>
              <p className="text-lg font-semibold">1</p>
              <button className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-lg font-bold text-gray-500">
                +
              </button>
            </div>
          </div>

          {/* Add to Cart Button */}
          <button className="mt-6 w-full bg-orange-500 text-white py-3 rounded-lg hover:bg-orange-600">
            Add to Cart
          </button>
        </div>

        {/* Right Section: Shipping Information */}
        <div className=" p-4 rounded-lg  border">
          {/* Shipping Information Title */}
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-orange-500">
              Shipping Information
            </h3>
            <MapPinIcon className="w-5 h-5 text-gray-700" />
          </div>

          {/* Shipping Fee */}
          <div className="flex items-center mb-4">
            <TruckIcon className="w-5 h-5 text-gray-700 mr-2" />
            <div>
              <p className="text-sm text-gray-700">Shipping fee $0.96</p>
              <p className="text-xs text-gray-500">Delivery: Dec 19 - 25</p>
            </div>
          </div>

          {/* Location Selector */}
          <div className="mb-6">
            <div className="flex items-center mb-2">
              <MapPinIcon className="w-5 h-5 text-gray-700 mr-2" />
              <p className="text-sm text-gray-700">Choose your location</p>
            </div>
            <select className="w-full border rounded-lg px-3 py-2 text-sm text-gray-600">
              <option>Location</option>
              <option>Choba</option>
              <option>Rumuokoro</option>
              <option>Eliozu</option>
            </select>
          </div>

          {/* Delivery Options */}
          <h4 className="text-green-600 font-semibold mb-2">
            Delivery Options
          </h4>
          <div className="flex justify-between items-center mb-2">
            <p className="text-sm text-gray-700">Pick Up</p>
            <p className="text-xs text-gray-500">Delivery fee: $0.47</p>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-700">Door Step Delivery</p>
            <p className="text-xs text-gray-500">Delivery fee: $1.47</p>
          </div>
        </div>
      </div>


{/* Routes for overview and reviews */}
<div>
      <div className="py-4 averagescreen:py-6">
        <section>
          <div className="flex justify-between px-2 lg:px-0 my-5">
            <li className="flex gap-5 ">
              <ul>
                <Link
                  href={{
                    pathname: "/stores/8/product/overview",
                    query: {
                      id: id,
                      name: name,
                      user: userID,
                    },
                  }}
                >
                  <span className="text-gray-500 lg:text-lg text-[14px]  hover:text-[#000000]">Overview</span>
                </Link>
              </ul>
              <ul>
                <Link
                  href={{
                    pathname: "/stores/8/product/reviews",
                    query: {
                      id: id,
                      name: name,
                      user: userID,
                    },
                  }}
                >
                  <span className="text-gray-500 lg:text-lg text-[14px]  hover:text-[#000000]">Reviews</span>
                </Link>
              </ul>
            </li>
          </div>
         
        </section>
        <AuthProvider>
          <section>{children}</section>
        </AuthProvider>
      </div>
    </div>





    </div>
  );
};

export default Product;
