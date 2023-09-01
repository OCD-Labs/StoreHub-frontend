"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

const Sales = ({ children }: { children: React.ReactNode }) => {
  const token = useSearchParams().get("token");
  const userID = useSearchParams().get("user");
  const id = useSearchParams().get("id");
  const name = useSearchParams().get("name");
  return (
    <div className="py-4 averagescreen:py-6">
      <section>
        <div className="bg-[#000000] text-white rounded-[5px] p-3">
          Sales Management
        </div>
        <div className="flex justify-between my-5">
          <li className="flex gap-5">
            <ul>
              <Link
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
                <span>Sales Overview</span>
              </Link>
            </ul>
            <ul>
              <Link
                href={{
                  pathname: "/inventory/sales/saleschart",
                  query: {
                    id: id,
                    name: name,
                    token: token,
                    user: userID,
                  },
                }}
              >
                <span>Sales Chart</span>
              </Link>
            </ul>
            <ul>Top Selling Products</ul>
            <ul>
              <Link href={{
                pathname: '/inventory/sales/reviews',
                query: {
                  id: id,
                  name: name,
                  token: token,
                  user: userID,
                }
              }}>
              Review
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
  );
};

export default Sales;
