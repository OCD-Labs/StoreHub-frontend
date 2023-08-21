import React, { Key } from "react";
import Image from "next/image";
import search from "../../../../../public/assets/icons/search.svg";
import filter from "../../../../../public/assets/icons/filter.svg";
import ProductItem from "@components/stores/productitem";
import Skeleton from "react-loading-skeleton";
import { ToastContainer } from "react-toastify";

const SalesOverview = () => {
  return (
    <div>
      <div>
        <span className="relative w-[70%] sm:w-[75%]">
          <input
            className="border w-full h-[35px] rounded-[5px] pl-[30px] sm:pl-[40px] pr-[30px] sm:pr-[35px]"
            placeholder="Search product name, category, ID, status"
          />
          <Image
            src={search}
            alt="search product"
            height={20}
            width={20}
            className="absolute top-0 left-2 sm:left-3"
          />
          <Image
            src={filter}
            alt="search product"
            height={20}
            width={20}
            className="absolute top-0 right-2"
          />
        </span>
      </div>

      <div className="md:flex mt-4 averagescreen:mt-6">
          <ToastContainer />
          <section className="md:flex-1">
            <div className="flex flex-col overflow-x-scroll scroll-smooth">
              <section className="flex justify-between p-3 flex-0-0-auto scroll-snap-align-start min-w-[700px] bg-[#000000] text-white rounded-[5px]">
                <p className="md:w-[30%] w-[13em] mr-4">Product Name</p>
                <p className="md:w-[10%] w-[50px]">ID</p>
                <p className="md:w-[15%] w-[90px]">Sales No.</p>
                <p className="md:w-[15%] w-[90px]">Sales%</p>
                <p className="md:w-[15%] w-[90px]">Price</p>
                <p className="md:w-[15%] w-[90px]">Revenue</p>
              </section>
              <hr />
              {/* {loading ? (
                <Skeleton count={10} />
              ) : storeItems?.length < 1 ? (
                <h1 className="text-black sm:text-5xl text-4xl text-center mt-[20%]">
                  No Sales Record!
                </h1>
              ) : (
                storeItems?.map((product: any, key: Key | null | undefined) => (
                  <ProductItem key={key} product={product} />
                ))
              )} */}
            </div>
          </section>
        </div>
    </div>
  );
};

export default SalesOverview;
