import { Card } from "react-bootstrap";
import Image from "next/image";
import pfpic from "public/assets/images/pfpic.png";
import owner from "public/assets/images/owner.jpg";
import Link from "next/link";
import { FC } from "react";
import { useState, useEffect } from "react";
import goto from "@public/assets/icons/goto.svg";
import { WidthIcon } from "@radix-ui/react-icons";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
export interface StoreProps {
  store: Store;
}
const Storecard: FC<StoreProps> = ({ store }: StoreProps) => {
  const Marketplace = [
    {
      title: "Golden Chains",
      imageUrl: "/path/to/image1.jpg",
      tags: ["Goldsmith", "Jewelry"],
    },
  ];

  return (
    <>
      <div className="">
        <div className="">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <Link href={`/stores/${store.store.id}`}>
              <div className="relative">
                {" "}
                <Image
                  src={
                    store.store.profile_image_url
                      ? store.store.profile_image_url
                      : "https://plus.unsplash.com/premium_photo-1683798464819-d1376249293e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2960&q=80"
                  }
                  width={500}
                  height={300}
                  className="w-full h-64 object-cover"
                  alt="storimg"
                ></Image>
              </div>

              <div className="p-4">
                <h2 className="text-xl font-medium font-vietnam text-[#000000]">
                  {store.store.name}
                </h2>

                {/* Tags */}

                <div className="flex justify-between">
                  {/* Categories */}
                  <div className="flex flex-wrap gap-2 mt-5">
                    <span className=" text-sm font-medium font-vietnam border text-gray-600 py-1 px-9 flex items-center justify-center rounded-full">
                      {store.store.category}
                    </span>
                  </div>
                  {/* Action Button */}
                  <div className="mt-5">
                    <button className="bg-orange-500 text-white w-10 h-10 flex items-center justify-center rounded-full hover:bg-orange-600">
                      <ArrowRightIcon className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* <div className="mt-4 px-5 pb-5">
                <div className="flex justify-between">
                  <div>
                    <a href="#">
                      <h5 className="text-xl tracking-tight text-slate-900 font-vietnam font-medium">
                        {store.store.name}
                      </h5>
                    </a>
                    <div className="flex gap-2 p-1 mt-2 rounded-[60px] items-center justify-center border">
                      <p className=" text-center  font-vietnam">
                        {store.store.category}
                      </p>
                    </div>
                  </div>
                  <Image src={goto} width={60} height={60} alt="goto"></Image>
                </div>
              </div> */}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};
export default Storecard;
