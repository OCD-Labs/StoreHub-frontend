
'use client'
import Image from "next/image";
import { useState, useEffect } from "react";
import search from "../../../../../public/assets/icons/search.svg";
import filter from "../../../../../public/assets/icons/filter.svg";
import { OPTIONS } from '@app/apis'
import useProfile from '@app/hooks/useProfile'
import { useSearchParams } from 'next/navigation'
import { FetchOrdersOverview } from "@app/apis/Inventory";
import Skeleton from "react-loading-skeleton";
import OrdersOverviewTable from "@components/stores/orders/OrdersOverviewTable";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,

} from '../../../../../components/ui/Table'

const OrdersOverview = () => {
  const [loading, setloading] = useState<boolean>(true)
  const [ordersOverview, setOrdersOverview] = useState<[]>([])

  const store_id: string | null = useSearchParams().get('id')

  const GET_OPTIONS: OPTIONS = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${useProfile().getSession()?.access_token}`,
    },
  }

  type OrdersOverviewType = {
    status: string;
    data: {
        message: string;
        result: {
          order: [];
          metadata: {};
        };
    };
}


  async function GetOrdersOverview() {
    try {
      const orders: OrdersOverviewType = await FetchOrdersOverview(
        store_id,
        GET_OPTIONS

      )
      // setSalesOverview(sales.data.result.sales_overview)
      console.log(orders)
    } catch (error) {
      throw new Error('Error while fetching overview')

    }
  }

  useEffect(() => {
    GetOrdersOverview().then(() => {

      setloading(false)
    })
  }, [1])
  console.log(ordersOverview, 'orders')



  return (
    <div>
      <section>
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
      </section>

      <div className="md:flex mt-4 averagescreen:mt-6">

      <section className="md:flex-1 w-full">

          <div className="flex flex-col overflow-x-scroll scroll-smooth">
            <Table>
              <TableCaption>View your order overview</TableCaption>
              <TableHeader>
                <TableRow>

                  <TableHead>Order ID</TableHead>
                  <TableHead>Product Name</TableHead>
                  <TableHead>Customer Name</TableHead>
                  <TableHead>Order Date</TableHead>
                  <TableHead>Delivery Date</TableHead>

                  <TableHead>Price</TableHead>
                  <TableHead>Payment Channel</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>

                {/* {loading ? (
                  <Skeleton count={10} />
                ) : SalesOverview?.length < 1 ? (
                  <h1 className="text-black sm:text-5xl text-4xl text-center mt-[20%]">
                    No Overview Yet!
                  </h1>
                ) : (
                  SalesOverview?.map(
                    (product: any, key: Key | null | undefined) => (
                      <TableRow>
                        <SalesOverviewTable key={key} product={product} />
                      </TableRow>
                    ),
                  )
                )} */}

              </TableBody>
            </Table>
          </div>
        </section>

        </div>

    </div>
  );
};

export default OrdersOverview;
