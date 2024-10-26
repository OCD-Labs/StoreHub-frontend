"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

const Sales = ({ children }: { children: React.ReactNode }) => {
  const [activeItem, setActiveItem] = useState<string>("");
  const token = useSearchParams().get("token");
  const userID = useSearchParams().get("user");
  const id = useSearchParams().get("id");
  const name = useSearchParams().get("name");

  const handleItmeClick = (item: string): void => {
    setActiveItem(item);
  };

  return (
    <div className="py-4 px-2 md:px-0 ">
      <section className="">
        <div className="flex justify-between px-2 lg:px-0  my-5">
          <li className="flex gap-5">
            <ul>
              <Link
                onClick={() => handleItmeClick("salesoverview")}
                className={`${
                  activeItem === "salesoverview"
                    ? "text-[#000000] "
                    : "text-gray-500"
                }   font-vietnam `}
                href={{
                  pathname: "/inventory/sales/salesoverview",
                  query: {
                    id: id,
                    name: name,
                    token: token,
                    user: userID,
                  },
                }}
              >
                <span className="text-gray-500 hover:text-[#000000] lg:text-lg text-xs lg:inline hidden">
                  Sales Overview
                </span>
                <span className="hover:text-[#000000] lg:text-lg text-xs lg:hidden inline">
                  Overview
                </span>
              </Link>
            </ul>

            <ul>
              <Link
                href={{
                  pathname: "/inventory/sales/saleshistory",
                  query: {
                    id: id,
                    name: name,
                    token: token,
                    user: userID,
                  },
                }}
              >
                <span className="text-gray-500 hover:text-[#000000] lg:text-lg text-xs lg:inline hidden">
                  Sales History
                </span>
                <span className="text-gray-500 hover:text-[#000000] lg:text-lg text-xs lg:hidden inline">
                  History
                </span>
              </Link>
            </ul>

            <ul>
              <Link
                href={{
                  pathname: "/inventory/sales/topsellingproduct",
                  query: {
                    id: id,
                    name: name,
                    token: token,
                    user: userID,
                  },
                }}
              >
                <span className="text-gray-500 lg:text-lg text-xs  hover:text-[#000000]">
                  Top Selling Products
                </span>
              </Link>
            </ul>

            <ul>
              <Link
                href={{
                  pathname: "/inventory/sales/reviews",
                  query: {
                    id: id,
                    name: name,
                    token: token,
                    user: userID,
                  },
                }}
              >
                <span className="text-gray-500 lg:text-lg text-xs  hover:text-[#000000]">
                  Review
                </span>
              </Link>
            </ul>
          </li>

          {/* Replace this with the search bar */}
        </div>
      </section>
      <section>{children}</section>
    </div>
  );
};

export default Sales;
