// @ts-nocheck
"use client";
import Image from "next/image";
import owner from "../../../../public/assets/images/owner.jpg";
import { Button } from "@components/ui/Button";
import StoreItem from "@components/stores/StoreItem";
import { Key, useEffect, useState } from "react";
import { HeartIcon, ShoppingCartIcon } from "@heroicons/react/24/outline";
import useSWR from "swr";
import { BASE_URL } from "@constants";
import search from "@/public/assets/icons/search.svg";
import sorticon from "@/public/assets/icons/sorticon.svg";
import StoresSkeleton from "@components/stores/storesSkeleton";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/NavDropdown";
import { getCookie } from "@lib/cookie";
import storeImage from "@/public/assets/images/storeImage.png";
import StoreImage1 from "@/public/assets/images/StoreImage1.png";
import salered from "@/public/assets/images/salered.png";
import ProductSectionImage from "@/public/assets/images/ProductSectionImage.png";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import NearLogo from "@public/assets/images/NearLogo.png";
import NearLogo1 from "@public/assets/images/NearLogo1.png";

export default function Page({ params }: { params: { store: number } }) {
  const [products, setProducts] = useState<[]>([]);
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

  const { data, error, isLoading } = useSWR(
    session ? `${BASE_URL}/stores/${params.store}/items` : null,
    fetcher
  );
  console.log(data, "data");

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

  const storeProducts = [
    {
      imageSrc: "/assets/images/ProductSectionImage.png",
      title: "Heirloom Apples",
      discount: "-13%",
      price: "3.99",
      savings: "$0.67",
    },
    {
      imageSrc: "/assets/images/ProductSectionImage.png",
      title: "Heirloom Apples",
      discount: "-13%",
      price: "3.99",
      savings: "$0.67",
    },
    {
      imageSrc: "/assets/images/ProductSectionImage.png",
      title: "Heirloom Apples",
      discount: "-13%",
      price: "3.99",
      savings: "$0.67",
    },
    {
      imageSrc: "/assets/images/ProductSectionImage.png",
      title: "Heirloom Apples",
      discount: "-13%",
      price: "3.99",
      savings: "$0.67",
    },
    {
      imageSrc: "/assets/images/ProductSectionImage.png",
      title: "Heirloom Apples",
      discount: "-13%",
      price: "3.99",
      savings: "$0.67",
    },
    {
      imageSrc: "/assets/images/ProductSectionImage.png",
      title: "Heirloom Apples",
      discount: "-13%",
      price: "3.99",
      savings: "$0.67",
    },
    {
      imageSrc: "/assets/images/ProductSectionImage.png",
      title: "Heirloom Apples",
      discount: "-13%",
      price: "3.99",
      savings: "$0.67",
    },
    {
      imageSrc: "/assets/images/ProductSectionImage.png",
      title: "Heirloom Apples",
      discount: "-13%",
      price: "3.99",
      savings: "$0.67",
    },
  ];

  return (
    <>
      <div className=" mx-auto p-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Image Section */}
        <div className="flex-1">
          <Image
            src={storeImage}
            alt="Shopping Cart"
            width={600}
            height={600}
            className="rounded-lg"
          />
        </div>

        {/* Text and Products Section */}
        <div className=" ">
          {/* Title */}
          <h1 className="text-[70px] font-vietnam font-bold leading-none mt-0 mb-4">
            Farmers Market
          </h1>

          {/* Category Buttons */}
          <div className="flex gap-4 mb-3">
            {["Food", "Groceries", "Household"].map((category) => (
              <button
                key={category}
                className="px-2 py-1 border rounded-2xl text-gray-600"
              >
                {category}
              </button>
            ))}
          </div>

          {/* Description */}
          <p className="text-black text-[17px] font-medium font-vietnam mb-[42px]">
            We pride ourselves on supporting local farmers, bakers, and
            artisans, ensuring that everything you find here is locally sourced,
            sustainable, and crafted with care.
          </p>

          {/* Deals Section */}

          <div className="grid grid-cols-3 gap-8">
            {deals.map((product, index) => (
              <div
                key={index}
                className={`p-6 rounded-lg ${product.bgColor} relative`}
              >
                {/* Discount Badge */}

                <span className="absolute bottom-[220px] left-32 ">
                  <Image
                    src={product.badgeimg}
                    alt="badge Image"
                    width={200}
                    height={200}
                    className=""
                  />
                </span>

                {/* Product Title */}
                <h2 className="text-lg font-semibold mb-2">{product.title}</h2>

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
                  className={`text-sm font-bold text-white px-2 py-1 rounded-xl ${product.badgeColor}`}
                >
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

      {/* search component */}
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

      {/* Product  Section */}
      <div className="mx-auto p-8 grid grid-cols-2 lg:grid-cols-4 gap-8">
        {storeProducts.map((storeProducts, index) => (
          <div key={index} className="max-w-sm rounded-lg border p-4 bg-white">
            {/* Product Image */}
            <div className="relative">
              <Image
                src={storeProducts.imageSrc}
                alt={storeProducts.title}
                width={500}
                height={500}
                className="rounded-lg"
              />
              {/* Heart Icon */}
              <button className="absolute top-3 left-3 p-2 bg-white rounded-full shadow-sm">
                <HeartIcon className="w-6 h-6 text-[#000000]" />
              </button>
              {/* Cart Icon */}
              <button className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-sm">
                <ShoppingCartIcon className="w-6 h-6 text-[#000000]" />
              </button>
            </div>

            {/* Product Details */}
            <div className="mt-4">
              <h3 className="text-lg font-semibold text-gray-900">
                {storeProducts.title}
              </h3>

              {/* Price Section */}
              <div className="flex items-center mt-2">
                <div className="bg-red-500 text-white text-sm px-2 py-1 rounded">
                  {storeProducts.discount}
                </div>
                <p className="text-sm text-gray-500 ml-2">
                  Save {storeProducts.savings}
                </p>
              </div>

              <p className="text-2xl font-bold text-gray-900 mt-2">
                ${storeProducts.price}
              </p>
            </div>

            {/* Buy Button */}
            <div className="mt-4">
              <button className="w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600">
                Buy Now
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* <div>
        <div className="text-black"></div>
        <div className="flex flex-col-reverse lg:flex-row max-w-6xl m-auto lg:gap-40 gap-20 lg:p-0 p-4">
          <div className="lg:mt-24">
            <h2 className="max-w-lg text-5xl leading-normal mb-8">
              Shine, Shimmer, Glimmer
            </h2>
            <p className="max-w-lg leading-normal font-light text-lg mb-8">
              Welcome to the Glittering Gems Boutique, where timeless elegance
              meets modern style! Step into our enchanting jewelry haven nestled
              within the heart of our beloved general store.
            </p>
            <div className="z-100 flex gap-4 mt-8">
              <Button variant="outline">Jewelry store</Button>
            </div>
          </div>
        </div>
       
        <section className="mt-12">
          <div className="w-full max-w-6xl m-auto lg:p-0 px-4">
            <div className="flex justify-between w-full">
              <span className="relative w-[70%]">
                <input
                  className="border w-full h-[35px] rounded-[5px] pl-[30px] sm:pl-[40px] pr-[30px] sm:pr-[35px]"
                  placeholder="Search stores"
                ></input>
                <Image
                  src={search}
                  alt="search product"
                  height={20}
                  width={20}
                  className="absolute top-2 left-2 sm:left-3"
                />
                <Image
                  src={sorticon}
                  height={20}
                  width={20}
                  className="absolute top-2 right-2 sm:right-3"
                  alt="sorticon"
                />
              </span>
              <span className="">
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <Button variant="outline" className="w-36">
                      Currency
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <div>
                      <DropdownMenuItem></DropdownMenuItem>
                     

                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <p className=" mb-2 cursor-pointer">Near</p>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <p className="mb-2 cursor-pointer">USD</p>
                      </DropdownMenuItem>

                      <span className="sm:hidden">
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>NGN</DropdownMenuItem>
                      </span>
                    </div>
                  </DropdownMenuContent>
                </DropdownMenu>
              </span>
            </div>
          </div>

          <div className="max-w-6xl m-auto">
            <section className="w-full grid lg:grid-cols-3 sm:grid-cols-2 sm:mt-0 grid-cols-1 gap-4">
            {data.data.result.items.length === 0 && (
              <div className="text-left">
                <p>No products found</p>
              </div>
            )}
            {data && !error ? (
              data?.data.result.items.map((product: any, key: Key) => (
                <>
                  <div className="">
                    <StoreItem key={key} product={product} />
                  </div>
                </>
              ))
            ) : (
              <>
                <StoresSkeleton />
                <StoresSkeleton />
                <StoresSkeleton />
                <StoresSkeleton />
                <StoresSkeleton />
                <StoresSkeleton />
              </>
            )}
          </section>
          </div>
        </section>
      </div> */}
    </>
  );
}
