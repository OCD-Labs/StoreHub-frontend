"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";

const ShopperNotifications = ({ children }: { children: React.ReactNode }) => {
  const token = useSearchParams().get("token");
  const userID = useSearchParams().get("user");
  const id = useSearchParams().get("id");
  const name = useSearchParams().get("name");
  return (
    <div>
      <section>
        <div className="font-vietnam font-bold text-xl p-3 bg-[#FCF8F2]">Notifications</div>
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
                  pathname: "/userdashboard/notifications/notificationinfo",
                  query: {
                    id: id,
                    name: name,
                    token: token,
                    user: userID,
                  },
                }}
              >
                <span className="font-vietnam font-weight-500 hover:text-orange-500">Notifications</span>
              </Link>
            </ul>
            <ul>
              <Link
                href={{
                  pathname: "/userdashboard/notifications/settings",
                  query: {
                    id: id,
                    name: name,
                    token: token,
                    user: userID,
                  },
                }}
              >
                <span className="font-vietnam font-weight-500 hover:text-orange-500">Notification Settings</span>
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
export default ShopperNotifications;
