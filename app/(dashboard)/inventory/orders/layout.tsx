'use client'

import React from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

const Order = ({ children }: { children: React.ReactNode }) => {
  const token = useSearchParams().get("token");
  const userID = useSearchParams().get("user");
  const id = useSearchParams().get("id");
  const name = useSearchParams().get("name");

  return (
    <div>
      <div className="py-4 averagescreen:py-6">
        <section>
          <div className="bg-[#000000] text-white rounded-[5px] p-3">
            Orders Management
          </div>
          <div className="flex justify-between my-5">
            <li className="flex gap-5">
              <ul>
                <Link
                  href={{
                    pathname: "/inventory/orders/ordersoverview",
                    query: {
                      id: id,
                      name: name,
                      token: token,
                      user: userID,
                    },
                  }}
                >
                  <span>Orders</span>
                </Link>
              </ul>
              <ul>
                <Link
                  href={{
                    pathname: "/inventory/orders/ordersinsight",
                    query: {
                      id: id,
                      name: name,
                      token: token,
                      user: userID,
                    },
                  }}
                >
                  <span>Orders Insight</span>
                </Link>
              </ul>
            </li>

            <div>
              <select className="border py-1 px-3 ">
                <option>Near</option>
                <option>Naira</option>
                <option>USD</option>
              </select>

              <button className="py-1 px-3 border">Export</button>
            </div>
          </div>
          <hr className="py-3" />
        </section>
        <section>{children}</section>
      </div>
    </div>
  );
};

export default Order;
