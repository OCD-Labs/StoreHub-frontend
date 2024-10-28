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
        <div className="font-vietnam font-bold text-xl p-3 bg-[#FCF8F2]">
          Orders Information
        </div>
        <hr className="w-full" />
        <div className="flex justify-between items-end p-3">
          <li className="flex gap-5" style={{
    width: '550px',
    height: '20px',
    top: '218px',
    left: '311px',
    gap: '60px',
    paddingBottom: '-4px' 
  }}>
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
                <span className="font-vietnam font-weight-500 hover:text-orange-500">Pending Orders</span>
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
                <span className="font-vietnam font-weight-500 hover:text-orange-500">Completed</span>
              </Link>
            </ul>
            <ul>
              <Link
              className="font-vietnam font-weight-500 hover:text-orange-500"
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
