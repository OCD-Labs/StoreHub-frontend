"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { AuthProvider } from "@contexts/AuthProvider";
// import { BASE_URL } from "@components/util/config";
const Order = ({ children }: { children: React.ReactNode }) => {
  const token = useSearchParams().get("token");
  const userID = useSearchParams().get("user");
  const id = useSearchParams().get("id");
  const name = useSearchParams().get("name");

  return (
    <div>
      <div className="py-4 averagescreen:py-6">
        <section>
          <div className="flex justify-between px-2 lg:px-0 my-5">
            <li className="flex gap-5 ">
              <ul>
                <Link
                  href={{
                    pathname: "/inventory/orders/ordersoverview",
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
                    pathname: "/inventory/orders/ordersinsight",
                    query: {
                      id: id,
                      name: name,
                      user: userID,
                    },
                  }}
                >
                  <span className="text-gray-500 lg:text-lg text-[14px]  hover:text-[#000000]">Order List</span>
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
  );
};

export default Order;
