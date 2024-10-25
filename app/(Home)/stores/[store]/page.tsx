"use client";
import Image from "next/image";
import owner from "../../../../public/assets/images/owner.jpg";
import { Button } from "@components/ui/Button";
import StoreItem from "@components/stores/StoreItem";

import { Key, useEffect, useState } from "react";
import { HeartIcon, ShoppingCartIcon } from "@heroicons/react/24/outline";
import useSWR from "swr";

import api from "@services/apiClient";

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
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Added loading state

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true); // Set loading state to true
      try {
        const response = await fetch(
          `${BASE_URL}/stores/${params.store}/items`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        setProducts(data.data.result.items);
      } catch (error) {
        setError("Failed to fetch products");
      } finally {
        setIsLoading(false); // Set loading state to false after request
      }
    };

    fetchProducts();
  }, [params.store]);

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
    </>
  );
}
