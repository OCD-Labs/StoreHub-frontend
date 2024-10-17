
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
import StoreNav from '@components/global/StoreNav'



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
  // Get all store
  // const fetcher = (url: string) =>
  //   fetch(url, GET_OPTIONS).then((response) => response.json())
  // const { data, error, isLoading } = useSWR(
  //   `${BASE_URL}/stores/?page=${Number(page)}&page_size=${page_size}`,
  //   fetcher,
  // )
  // console.log(data, 'useswr data')
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
    <div className="">
        {/* <nav><StoreNav/></nav> */}
      <div className="">
        <div>
          {/* Store background Image */}
          <div className="store-custom-bg mx-[50px] pt-[200px] p-9 rounded-lg">
            <div className="  lg:p-0 p-4">
              <div className="lg:mt-24">
                <h2 className="max-w-lg text-5xl font-vietnam leading-normal mb-8">
                  Explore Stores, Discover Wonders
                </h2>
                <p className="max-w-lg leading-normal font-vietnam font-light text-[10px] mb-8">
                  Every store tells its own story. Our grid of stores is your
                  passport to a world of unparalleled shopping experiences.
                  Click on a store, and let the products inside surprise you.
                  Your next favorite find is just a store away!
                </p>
              </div>
            </div>
          </div>
          {/* Categories come right here */}
          <div className="relative inline-block ml-[50px] mt-[40px] mb-[10px] text-left">
            {/* Trigger Button */}
            <div>
              <button
                type="button"
                className="flex items-center gap-2 p-3 mt-2 rounded-[15px] border shadow-md hover:shadow-lg focus:outline-none"
                onClick={() => setIsOpen(!isOpen)}
              >
                <Bars3Icon className="h-6 w-6" />
                <span className="font-bold">All Categories</span>
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
          <div className="max-w-6xl m-auto">
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
              <Stack gap={3}>
                <div className="w-full grid lg:grid-cols-3 sm:grid-cols-2 sm:mt-0 grid-cols-1 gap-4">
                  {allStores.map((store, index) => (
                    <Storecard key={index} store={store} />
                  ))}
                </div>
                <div></div>
              </Stack>
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