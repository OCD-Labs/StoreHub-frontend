'use client'

import Image from 'next/image'
import search from '../../../../../public/assets/icons/search.svg'
import filter from '../../../../../public/assets/icons/filter.svg'
import salesicon from '../../../../../public/assets/icons/salesicon.svg'
import downtrend from '../../../../../public/assets/icons/downtrend.svg'
import uptrend from '../../../../../public/assets/icons/uptrend.svg'
import totalitems from '../../../../../public/assets/icons/totalitems.svg'
import totalcustomers from '../../../../../public/assets/icons/contacts.svg'
import SalesTrend from '@components/stores/sales/SalesTrend'
import useSWR from 'swr'
import SalesHistoryTable from '@components/stores/sales/SalesHistoryTable'
import {
  TableCaption,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
} from '@components/ui/Table'
import { Table } from 'react-bootstrap'
import Chart from '@components/stores/sales/SalesChart'
import { Key, useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import useProfile from '@app/hooks/useProfile'
import { OPTIONS } from '@app/apis'
import { GetSalesHistory } from '@app/apis/Inventory'
import Skeleton from 'react-loading-skeleton'

const fetcher = (url: string) => fetch(url).then((res) => res.json())

const SalesChart = () => {
  const amount = '3,765.88'
  const percent = '10'
  const [loading, setloading] = useState<boolean>(true)
  const [salesHistory, setSalesHistory] = useState([])

  const userID: string | null = useSearchParams().get('user')

  const id: string | null = useSearchParams().get('id')

  const GET_OPTIONS: OPTIONS = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${useProfile().getSession()?.access_token}`,
    },
  }

  async function getSalesHistroy() {
    try {
      const sales: Sales = await GetSalesHistory(id, GET_OPTIONS)
      console.log(sales)

      setSalesHistory(sales.data.result.sales)
    } catch (error) {
      throw new Error('Error while fetching overview')
    }
  }

  useEffect(() => {
    getSalesHistroy().then(() => {
      setloading(false)
    })
  }, [1])

  return (
    <div>
      {/* four sections  */}
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

      <section className="my-6 averagescreen:mt-8 overflow-x-scroll scroll-smooth">
        <div className="flex flex-0-0-auto scroll-snap-align-start min-w-[900px] sm:min-w-[500px] sm:min-w-[500px">
          <div className="border w-fit px-4 py-2 rounded shadow-xl mr-5">
            <span className="flex items-center">
              <div className="mr-4 bg-gray-300 p-2 rounded-full">
                <Image
                  src={salesicon}
                  alt="total sales today"
                  width={15}
                  height={15}
                />
              </div>
              <p className="font-semibold">Sales Today</p>
            </span>
            <span className="flex items-end justify-between mt-2">
              <p className="font-bold text-xl">$207.88</p>
              <span className="flex items-center ml-6 bg-red-100 px-2 rounded-[39px]">
                <Image src={downtrend} alt="sales drop" />
                <p className="text-red-500 text-[8px] ml-1">10%</p>
              </span>
            </span>
          </div>

          <div className="border w-fit px-4 py-2 rounded shadow-xl mr-5">
            <span className="flex items-center">
              <div className="mr-4 bg-gray-300 p-2 rounded-full">
                <Image
                  src={salesicon}
                  alt="total sales today"
                  width={15}
                  height={15}
                />
              </div>
              <p className="font-semibold">Sales Today</p>
            </span>
            <span className="flex items-end justify-between mt-2">
              <p className="font-bold text-xl">$3,765.88</p>
              <span className="flex items-center ml-6 bg-green-100 px-2 rounded-[39px]">
                <Image src={uptrend} alt="sales drop" />
                <p className="text-green-500 text-[8px] ml-1">10%</p>
              </span>
            </span>
          </div>

          <div className="border w-fit px-4 py-2 rounded shadow-xl mr-5">
            <span className="flex items-center">
              <div className="mr-4 bg-gray-300 p-2 rounded-full">
                <Image
                  src={totalitems}
                  alt="total sales today"
                  width={15}
                  height={15}
                />
              </div>
              <p className="font-semibold">Total Items Sold</p>
            </span>
            <span className="flex items-end justify-between mt-2">
              <p className="font-bold text-xl">2,314</p>
              <span className="flex items-center ml-6 bg-green-100 px-2 rounded-[39px]">
                <Image src={uptrend} alt="sales drop" />
                <p className="text-green-500 text-[8px] ml-1">10%</p>
              </span>
            </span>
          </div>

          <div className="border w-fit px-4 py-2 rounded shadow-xl mr-5">
            <span className="flex items-center">
              <div className="mr-4 bg-gray-300 p-2 rounded-full">
                <Image
                  src={totalcustomers}
                  alt="total sales today"
                  width={15}
                  height={15}
                />
              </div>
              <p className="font-semibold">Total Customers</p>
            </span>
            <span className="flex items-end justify-between mt-2">
              <p className="font-bold text-xl">2,137</p>
              <span className="flex items-center ml-6 bg-green-100 px-2 rounded-[39px]">
                <Image src={uptrend} alt="sales drop" />
                <p className="text-green-500 text-[8px] ml-1">10%</p>
              </span>
            </span>
          </div>
        </div>
        {/* <SalesTrend img={salesicon} text="Total Sales" amount={amount} percent={percent} trendImg={downtrend}/> */}
      </section>

      {/* sales chart section */}
      <section className="shadow-xl rounded overflow-x-scroll p-2">
        <Chart />
      </section>

      {/* sales history section */}
      <section className="mt-6 averagescreen:mt-8 border shadow-xl p-2 sm:p-4 rounded">
        <div className="flex justify-between">
          <span className="flex">
            <p className="text-base md:text-xl font-semibold text-black">
              Sales History
            </p>
            <span className="border rounded-full p-1 ml-2 text-[8px]">?</span>
          </span>
          <div className="flex">
            <select>
              <option>Month</option>
              <option>Day</option>
              <option>Year</option>
            </select>
            <button className="px-2 py-1 flex items-center border ml-2">
              <p className="mr-2 rounded">Filter</p>{' '}
              <Image src={filter} alt="filter by" />
            </button>
          </div>
        </div>
        <section className="md:flex-1">
          <div className="flex flex-col overflow-x-scroll scroll-smooth">
            <Table>
              <TableCaption>View your store overview</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Customer ID</TableHead>
                  <TableHead>Customer Name</TableHead>
                  <TableHead>Item name</TableHead>
                  <TableHead>Item Id</TableHead>
                  <TableHead>Order date</TableHead>
                  <TableHead>Delivery date</TableHead>
                  <TableHead>Price</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <Skeleton count={10} />
                ) : salesHistory?.length < 1 ? (
                  <h1 className="text-black sm:text-5xl text-4xl text-center mt-[20%]">
                    No Overview Yet!
                  </h1>
                ) : (
                  salesHistory?.map(
                    (product: any, key: Key | null | undefined) => (
                      <TableRow
                        
                      >
                        <SalesHistoryTable key={key} sales={product} />
                      </TableRow>
                    ),
                  )
                )}
              </TableBody>
            </Table>
          </div>
        </section>
      </section>
    </div>
  )
}

export default SalesChart
