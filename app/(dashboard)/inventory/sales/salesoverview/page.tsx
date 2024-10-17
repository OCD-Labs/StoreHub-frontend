// @ts-nocheck
"use client";
import React, { Key, useEffect, useState } from "react";
import { GetSalesOverview } from "@app/apis/Inventory";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import useProfile from "@hooks/useProfile";
import search from "../../../../../public/assets/icons/search.svg";
import filter from "../../../../../public/assets/icons/filter.svg";
import ProductItem from "@components/stores/productitem";
import Skeleton from "react-loading-skeleton";
import { ToastContainer } from "react-toastify";
import { OPTIONS } from "@app/apis";
import { getCookie } from "@lib/cookie";
import SalesOverviewTable from "@components/stores/sales/SalesOverviewTable";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../../../components/ui/Table";

const SalesOverview: React.FC = () => {
  const [loading, setloading] = useState<boolean>(true);
  const [SalesOverview, setSalesOverview] = useState<[]>([]);
  const session = getCookie("token");
  const userID: string | null = useSearchParams().get("user");

  const id: string | null = useSearchParams().get("id");

  const GET_OPTIONS: OPTIONS = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${""}`,
    },
  };

  async function getSales() {
    try {
      const sales: SalesOverview = await GetSalesOverview(
        userID,
        id,
        GET_OPTIONS
      );
      console.log(sales);

      setSalesOverview(sales.data.result.sales_overview);
    } catch (error) {
      throw new Error("Error while fetching overview");
    }
  }

  useEffect(() => {
    getSales().then(() => {
      setloading(false);
    });
  }, [1, session]);
  console.log(SalesOverview, "sales");

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
            <Table>
              <TableCaption>View your store overview</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Product Name</TableHead>
                  <TableHead>ID</TableHead>
                  <TableHead>Sales No.</TableHead>
                  <TableHead>Sales%</TableHead>
                  <TableHead>price</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <Skeleton count={10} />
                ) : SalesOverview?.length < 1 ? (
                  <h1 className="text-black sm:text-5xl text-4xl text-center mt-[20%]">
                    No Overview Yet!
                  </h1>
                ) : (
                  SalesOverview?.map(
                    (product: any, key: Key | null | undefined) => (
                      <TableRow>
                        <SalesOverviewTable key={key} sales={product} />
                      </TableRow>
                    )
                  )
                )}
              </TableBody>
            </Table>
          </div>
        </section>
      </div>
    </div>
  );
};

export default SalesOverview;
