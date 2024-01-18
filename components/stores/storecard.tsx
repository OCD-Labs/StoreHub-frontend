import { Card } from "react-bootstrap";
import Image from "next/image";
import pfpic from "public/assets/images/pfpic.png";
import owner from "public/assets/images/owner.jpg";
import Link from "next/link";
import { FC } from "react";
import { useState, useEffect } from "react";
import goto from "@public/assets/icons/goto.svg";
import { useSession } from "next-auth/react";
import { WidthIcon } from "@radix-ui/react-icons";

export interface StoreProps {
  store: Store;
}

const Storecard: FC<StoreProps> = ({ store }: StoreProps) => {
  const { data: session } = useSession();

  return (
    <>
      <div className="group m-auto my-10 flex w-full max-w-xs flex-col overflow-hidden border border-dark-100 bg-white rounded-lg">
        <Link href={`/stores/${store.store.id}`}>
          <a className="relative flex h-80 overflow-hidden" href="#">
            <Image
              src={
                store.store.profile_image_url
                  ? store.store.profile_image_url
                  : "https://plus.unsplash.com/premium_photo-1683798464819-d1376249293e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2960&q=80"
              }
              width={600}
              height={600}
              alt="storimg"
            ></Image>
          </a>
          <div className="mt-4 px-5 pb-5">
            <div className="flex justify-between">
              <div>
                <a href="#">
                  <h5 className="text-xl tracking-tight text-slate-900 font-medium">
                    {store.store.name}
                  </h5>
                </a>
                <div className="flex gap-2 mt-2">
                  <p className="">{store.store.category}</p>
                  <span>store</span>
                </div>
              </div>
              <Image src={goto} width={40} height={40} alt="goto"></Image>
            </div>
          </div>
        </Link>
      </div>
    </>
  );
};

export default Storecard;
