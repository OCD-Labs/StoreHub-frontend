"use client";

import Image from "next/image";
import { Key, useEffect, useState } from "react";
import { HeartIcon, ShoppingCartIcon } from "@heroicons/react/24/outline";
import useSWR from "swr";
import api from "@services/apiClient";
import { getStoreItems } from "@services/products";
import Link from "next/link";
import storeImage from "@/public/assets/images/storeImage.png";
import StoreImage1 from "@/public/assets/images/StoreImage1.png";
import salered from "@/public/assets/images/salered.png";
import flashsale from "@public/assets/images/flashsale.png";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import NearLogo1 from "@public/assets/images/NearLogo1.png";
import { usePathname } from "next/navigation";

interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  store_id: number;
  image_urls: string[];
  category: string;
  discount_percentage: string;
  supply_quantity: number;
  extra: {};
  is_frozen: boolean;
  currency: string;
  cover_img_url: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export default function Page({ params }: { params: { store: number } }) {
  const [storeProducts, setProducts] = useState<Product[]>([]);
  const pathname = usePathname();
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetcher = async () => {
      try {
        const res = await api.get(`/stores/${params.store}/items`);

        if (res.status !== 200) {
          setError("Server error. Please refresh");
        }

        console.log(res.data.data.result.items, "items");

        setProducts(res.data.data.result.items);
      } catch (error) {
        setError("could'nt fetch items");
      } finally {
        setIsLoading(false);
      }
    };
    fetcher();
  }, [storeProducts]);

  const deals = [
    {
      title: "Flash Sales",
      price: "$0.27",
      discount: "-25%",
      bgColor: "bg-red-50",
      badgeColor: "bg-red-500",
      badgeimg: "/assets/images/salered.png",
      imgSrc: "/assets/images/StoreImage1.png",
    },
    {
      title: "Super Deals",
      price: "$0.27",
      discount: "-25%",
      bgColor: "bg-yellow-50",
      badgeColor: "bg-yellow-500",
      badgeimg: "/assets/images/salered.png",
      imgSrc: "/assets/images/StoreImage1.png", // Replace with actual image
    },
    {
      title: "Save Big",
      price: "$0.27",
      discount: "-25%",
      bgColor: "bg-green-50",
      badgeColor: "bg-green-500",
      badgeimg: "/assets/images/salered.png",
      imgSrc: "/assets/images/StoreImage1.png", // Replace with actual image
    },
  ];
  const dealsMobile = [
    {
      title: "Flash Sales",
      price: "$0.27",
      discount: "-25%",
      bgColor: "bg-red-50",
      badgeColor: "bg-red-500",
      badgeimg: "/assets/images/salered.png",
      imgSrc: "/assets/images/StoreImage1.png",
    },

    {
      title: "Save Big",
      price: "$0.27",
      discount: "-25%",
      bgColor: "bg-green-50",
      badgeColor: "bg-green-500",
      badgeimg: "/assets/images/salered.png",
      imgSrc: "/assets/images/StoreImage1.png", // Replace with actual image
    },
  ];

  return (
    <div className="md:max-w-[80rem] max-w-[80rem] m-auto md:p-6 p-0">
      <div className=" mx-auto md:p-8 p-4 grid grid-cols-2 lg:grid-cols-2 md:gap-8 gap-3">
        {/* Image Section */}
        <div className="">
          <Image
            src={storeImage}
            alt="Store Shopping Cart"
            className="rounded-lg  md:h-[503px] md:w-[603px] h-[140px] w-[183px]"
          />
        </div>

        {/* Text and Products Section */}
        <div className=" ">
          {/* Title */}
          <h1 className="md:text-[70px] text-[#1D2131] text-base font-vietnam font-semibold leading-none mt-0 md:mb-4 mb-[42px]">
            Farmers Market
          </h1>

          {/* Category Buttons */}
          <div className="flex md:gap-4 gap-2 md:mb-3 mb-2">
            {["Food", "Groceries", "Household"].map((category) => (
              <button
                key={category}
                className="md:px-5 md:py-1 px-2 py-0 border border-[#1D2131] md:rounded-2xl rounded-xl md:text-[12px] text-[7px] text-[#1D2131]"
              >
                {category}
              </button>
            ))}
          </div>

          {/* Description */}
          <p className="text-[#1D2131] md:text-[17px] text-[8px] md:font-medium font-normal font-vietnam mb-2 md:mb-[82px]">
            We pride ourselves on supporting local farmers, bakers, and
            artisans, ensuring that everything you find here is locally sourced,
            sustainable, and crafted with care.
          </p>

          {/* Deals Section for Large */}

          <div className="lg:grid grid-cols-3 gap-8 hidden md:block">
            {deals.map((product, index) => (
              <div
                key={index}
                className={`px-6 py-3 rounded-lg ${product.bgColor} relative`}
              >
                {/* Discount Badge */}

                <Image
                  src={product.badgeimg}
                  alt="badge Image"
                  width={90}
                  height={90}
                  className="absolute bottom-[160px] left-[115px]"
                />

                {/* Product Title */}
                <h2 className="text-lg font-vietnam font-semibold mb-2">
                  {product.title}
                </h2>

                {/* Product Image */}
                <div className="flex justify-center mb-2">
                  <Image
                    src={product.imgSrc}
                    alt={product.title}
                    width={150}
                    height={100}
                    className="rounded-lg"
                  />
                </div>

                {/* Product Description */}
                <p className="text-[12px] font-vietnam text-[#000000] mb-2">
                  Barilla Spaghetti
                </p>

                {/* Price and Discount */}

                <span
                  className={`text-[10px] flex gap-2 w-[49px] justify-center h-[15px] font-semibold text-white  rounded-lg ${product.badgeColor}`}
                >
                  <Image alt="" src={flashsale} />
                  {product.discount}
                </span>

                <p className="text-md mt-2 font-vietnam font-bold">
                  {product.price}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Deals Section for Mobile */}
      <div className="lg:hidden">
        <div className="grid grid-cols-2 gap-3 py-3 px-4">
          {dealsMobile.map((product, index) => (
            <div
              key={index}
              className={`px-6 py-3 rounded-lg ${product.bgColor} relative`}
            >
              {/* Discount Badge */}

              <Image
                src={product.badgeimg}
                alt="badge Image"
                width={60}
                height={60}
                className="absolute bottom-[50px] left-[120px]"
              />

              {/* Product Title */}
              <h2 className="text-[20px] text-[#1D2131] font-vietnam font-semibold mb-2">
                {product.title}
              </h2>

              {/* Price and Discount */}

              <span
                className={`text-[8px] w-[45px] h-[13px] font-semibold flex justify-center gap-1 text-white  rounded-xl ${product.badgeColor}`}
              >
                <Image alt="" src={flashsale} />
                {product.discount}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* search component for Mobile screens*/}
      <div className="py-2 lg:hidden">
        <div className="flex space-x-3 px-3">
          {/* Search Bar */}
          <div className="flex items-center bg-white border border-gray-200 rounded-xl overflow-hidden flex-grow">
            <input
              type="text"
              placeholder="Search Products"
              className="px-4 py-2 text-gray-600 focus:outline-none w-full"
            />
            <button className="bg-orange-500 px-2 py-[14px] rounded-xl">
              <MagnifyingGlassIcon className="h-5 w-5 text-white" />
            </button>
          </div>

          {/* Currency Selector */}
          <div className="flex items-center bg-white border border-gray-200 rounded-xl overflow-hidden">
            <span className="px-4 text-gray-600">Currency</span>
            <button className="bg-gray-300 px-3 rounded-xl py-4">
              <Image
                className=""
                width={50}
                height={50}
                src={NearLogo1}
                alt=" Social Media Integration"
              />
            </button>
          </div>
        </div>
      </div>

      {/* search component for large screens*/}
      <div className=" hidden lg:block">
        <div className="flex items-center gap-2 p-9 ">
          {/* Search Input */}
          <div className="relative w-[80%]">
            <input
              type="text"
              placeholder="Search Products"
              className="w-full p-3 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
            />
            <MagnifyingGlassIcon className="absolute right-3 top-3 w-5 h-5 text-orange-500" />
          </div>

          {/* Currency Picker */}
          <div className="flex items-center space-x-2 ml-4">
            {/* Currency Label */}
            <div className="flex items-center px-4 py-3 rounded-lg border border-gray-300 cursor-pointer">
              <span className="text-sm  font text-gray-700">Currency</span>
              <ChevronDownIcon className="w-4 h-4 text-gray-600 ml-2" />
            </div>

            {/* Dollar Symbol */}

            <div className="flex items-center px-4 py-3  bg-[#000000] rounded-lg">
              <Image
                className=""
                src={NearLogo1}
                alt=" Social Media Integration"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Product  Section for mobile screens */}
      <div className="lg:hidden">
        <div className="mx-auto p-2 grid grid-cols-2 lg:grid-cols-4 md:gap-8 gap-2">
          {isLoading && <>loading...</>}
          {!storeProducts.length && <div>No products found</div>}
          {storeProducts.map((storeProduct, index) => (
            <div
              key={index}
              className="max-w-xs bg-white border border-gray-200 rounded-lg shadow-lg p-3"
            >
              {/* Wishlist and Cart Icons */}
              <div className="flex justify-between items-center">
                <HeartIcon className="h-6 w-6 text-[#000000]" />
                <ShoppingCartIcon className="h-6 w-6 text-[#000000]" />
              </div>

              {/* Product Image */}
              <div className="my-2 flex justify-center">
                <Image
                  src={storeProduct.image_urls[0]} // replace with your image path
                  alt="Mixed Pasta"
                  width={120}
                  height={100}
                  className="rounded-md"
                />
              </div>

              {/* Product Details */}
              <div className="flex justify-between">
                <div>
                  <h3 className="font-medium text-[12px] text-gray-800 my-1">
                    {storeProduct.name}
                  </h3>
                  <div className="flex text-xs text-gray-500 space-x-1">
                    <span className="text-white border bg-[#FF0000] rounded-xl px-2 font-semibold text-[7px]">
                      -13%
                    </span>
                    <span className="text-[6px] text-[#414040BF] font-normal">
                      Save $
                      {Number(storeProduct.discount_percentage).toFixed(2)}
                    </span>
                  </div>
                  <div className="text-[16px] font-semibold text-gray-800 my-1">
                    $3.99
                  </div>
                </div>

                <Link
                  href={`${pathname}/product?${"item_id=" + storeProduct.id}`}
                >
                  <button className="bg-orange-500 w-[53px] h-[22px] mt-6 text-white text-[10px] font-semibold rounded-md ">
                    Buy Now
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Product  Section for large screens */}
      <div className="hidden md:block">
        {isLoading && <>loading...</>}{" "}
        {!storeProducts.length && <div>No products found for this store</div>}
        <div className="mx-auto p-8 grid grid-cols-4 gap-8">
          {storeProducts.map((storeProduct, index) => (
            <div
              key={index}
              className="max-w-sm rounded-lg border p-4 bg-white"
            >
              {/* Product Image */}
              <div className="relative">
                <Image
                  src={storeProduct.image_urls[0]}
                  alt={storeProduct.name}
                  width={500}
                  height={500}
                  className="rounded-lg"
                />
                {/* Heart Icon */}
                <button className="absolute top-3 left-3 p-2 bg-white rounded-full ">
                  <HeartIcon className="w-6 h-6 text-[#000000]" />
                </button>
                {/* Cart Icon */}
                <button className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-sm">
                  <ShoppingCartIcon className="w-6 h-6 text-[#000000]" />
                </button>
              </div>

              <div className="flex justify-between">
                {" "}
                {/* Product Details */}
                <div className="mt-4">
                  <h3 className="text-[16px] font-medium text-[#1D2131]">
                    {storeProduct.name}
                  </h3>

                  {/* Price Section */}
                  <div className="flex items-center mt-2">
                    <div className="bg-red-500 text-white font-semibold text-[10px] px-2  rounded">
                      {storeProduct.discount_percentage}
                    </div>
                    <p className="text-[10px] font-normal text-gray-500 ml-2">
                      Save
                    </p>
                  </div>

                  <p className="text-[20px] font-semibold text-[#1D2131] mt-2">
                    ${storeProduct.price}
                  </p>
                </div>
                {/* Buy Button */}
                <div className="mt-[50px]">
                  <Link
                    href={`${pathname}/product?${"item_id=" + storeProduct.id}`}
                  >
                    <button className="bg-orange-500 w-[53px] h-[22px] mt-6 text-white text-[10px] font-semibold rounded-md ">
                      Buy Now
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>{" "}
      </div>
    </div>
  );
}
