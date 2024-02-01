"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";

const ShopperOrders = ({ children }: { children: React.ReactNode }) => {
  const token = useSearchParams().get("token");
  const userID = useSearchParams().get("user");
  const id = useSearchParams().get("id");
  const name = useSearchParams().get("name");
  return (
    <div>
      <section>
        <div className="font-bold text-lg p-3">
          Orders Information
        </div>
        <hr className="w-full" />
        <div className="flex justify-between my-3 p-3">
          <li className="flex gap-5">
            <ul>
              <Link
                href={{
                  pathname: "/userdashboard/orders/pending",
                  query: {
                    id: id,
                    name: name,
                    token: token,
                    user: userID,
                  },
                }}
              >
                <span className="hover:underline">Pending Orders</span>
              </Link>
            </ul>
            <ul>
              <Link
                href={{
                  pathname: "/userdashboard/orders/completed",
                  query: {
                    id: id,
                    name: name,
                    token: token,
                    user: userID,
                  },
                }}
              >
                <span className="hover:underline">Completed</span>
              </Link>
            </ul>
            <ul>
              <Link
              className="hover:underline"
                href={{
                  pathname: "/userdashboard/orders/reviews",
                  query: {
                    id: id,
                    name: name,
                    token: token,
                    user: userID,
                  },
                }}
              >
                Reviews
              </Link>
            </ul>
          </li>
        </div>
        <hr className="w-full" />
      </section>
      <section>{children}</section>
    </div>
  );
};
export default ShopperOrders;
