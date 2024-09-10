// @ts-nocheck
"use client";
import Image from "next/image";
import owner from "../../../../public/assets/images/owner.jpg";
import { Button } from "@components/ui/Button";
import StoreItem from "@components/stores/StoreItem";
import { Key, useEffect, useState } from "react";

import useSWR from "swr";
import { BASE_URL } from "@components/util/config";
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
import { getCookie } from "@components/util/cookie";
export default function Page({ params }: { params: { store: number } }) {
  const [products, setProducts] = useState<[]>([]);
  const session = getCookie("token");
  console.log(session, "session");

  const fetcher = (url: string) =>
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${""}`,
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

  return (
    <div>
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
      {/* product section */}
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
                    {/* alert dialog ends here */}

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
    </div>
  );
}
