"use client";
import React from "react";
import sorticon from "public/assets/icons/sorticon.svg";
import Image from "next/image";
import { Stack } from "react-bootstrap";
import { useState, useEffect } from "react";
import Storecard from "@components/stores/storecard";
import AppLoader from "@components/global/AppLoader";
import StoresSkeleton from "@components/stores/storesSkeleton";
import { Button } from "@components/ui/Button";
import storeimg from "@public/assets/images/storeimg.png";
import Link from "next/link";
// import { userWallet } from '@app/StoreManager'
import { BASE_URL } from "@constants";
import useSWR from "swr";
import { GET_OPTIONS } from "@app/apis";
import search from "@/public/assets/icons/search.svg";
import PaginationControls from "@components/stores/PaginationControls";
import "@/styles/Store.css";
import { Bars3Icon } from "@heroicons/react/24/outline";
import StoreNav from "@components/global/StoreNav";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import storesImage from "@public/assets/images/storesImage.png";
import StoreBgImage from "@public/assets/images/StoreBgImage.png";

const Storepage = ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const [allStores, setAllStores] = useState<Store[]>([]);
  const [loading, setLoading] = useState(true);
  // const { wallet } = userWallet.getState()
  const [isOpen, setIsOpen] = useState(false);
  const categories = [
    "Electronics",
    "Clothing",
    "Home & Kitchen",
    "Sports",
    "Books",
  ];
  const page = searchParams["page"] ?? "1";
  const page_size = searchParams["per_page"] ?? "15";

  const handlePageLoading = () => {
    setLoading(true);
  };
  const fetchAllStores = () => {
    try {
      fetch(
        `${BASE_URL}/stores/?page=${Number(page)}&page_size=${page_size}`,
        GET_OPTIONS
      )
        .then((response) => response.json())
        .then((data: Stores) => {
          console.log(data, "all stores");
          setAllStores(data.data.result.stores);
          setLoading(false);
        });
    } catch (error) {
      console.log(error);
    }
  };
  console.log("stores", allStores);
  useEffect(() => {
    fetchAllStores();
  }, [page]);

  return (
    <div className="max-w-[80rem] m-auto md:p-6 p-3">
      <div className="">
        <div>
          {/* Store background Image */}
          <div className="store-custom-bg md:px-9 px-1 py-9  rounded-lg">
            <div className=" md:mt-[35%] mt-[40%] lg:p-0 p-4">
              <div className="lg:mt-24">
                <div className=" text-white">
                  {/* Title */}
                  <h1 className=" text-xl font-vietnam lg:text-5xl font-bold">
                    Joe's Pendants
                  </h1>

                  {/* Tags */}
                  <div className="flex space-x-3 mt-4">
                    <span className="border font-vietnam text-white md:text-sm text-[10px] py-1 px-3 rounded-full">
                      Food
                    </span>
                    <span className="border font-vietnam text-white md:text-sm text-[10px] py-1 px-3 rounded-full">
                      Ornaments
                    </span>
                    <span className="border font-vietnam text-white md:text-sm text-[10px] py-1 px-3 rounded-full">
                      Household
                    </span>
                  </div>

                  {/* Description */}
                  <p className="mt-6 font-vietnam md:text-sm text-[10px] lg:text-base hidden md:block text-white max-w-md">
                    We pride ourselves on supporting local farmers, bakers, and
                    artisans, ensuring that everything you find here is locally
                    sourced, sustainable, and crafted with care.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Categories come right here */}
          <div className="relative inline-block  mt-[40px] mb-[10px] text-left">
            {/* Trigger Button */}
            <div>
              <button
                type="button"
                className="flex items-center gap-2 p-3 mt-2 rounded-[15px] border shadow-md hover:shadow-lg focus:outline-none"
                onClick={() => setIsOpen(!isOpen)}
              >
                <Bars3Icon className="h-6 w-6" />
                <span className="font-bold font-vietnam">All Categories</span>
              </button>
            </div>
            {/* Dropdown Menu */}
            {isOpen && (
              <div className="absolute left-0 mt-2 w-48 rounded-lg shadow-lg bg-white  z-50">
                <ul className="py-2">
                  {categories.map((category) => (
                    <li
                      key={category}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => setIsOpen(false)} // Close dropdown after selecting
                    >
                      {category}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="">
            {/* Stores list */}
            {loading ? (
              <div className="w-full grid lg:grid-cols-3 sm:grid-cols-2 sm:mt-0 grid-cols-1 gap-4">
                <StoresSkeleton />
                <StoresSkeleton />
                <StoresSkeleton />
                <StoresSkeleton />
                <StoresSkeleton />
                <StoresSkeleton />
              </div>
            ) : (
              <>
                <div className="grid grid-cols-2 lg:grid-cols-3 md:gap-6 gap-3 md:p-6 p-1">
                  {allStores.map((store, index) => (
                    <Storecard key={index} store={store} />
                  ))}
                </div>
                <div></div>
              </>
            )}
          </div>
        </div>
      </div>

      <PaginationControls
        hasNextPage={allStores.length > 1}
        hasPrevPage={true}
        handlePaginationLoading={handlePageLoading}
      />
    </div>
  );
};
export default Storepage;
