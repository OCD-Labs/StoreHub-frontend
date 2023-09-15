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
        <div className="font-bold text-lg p-3">Notifications</div>
        <hr className="w-full" />
        <div className="flex justify-between my-3 p-3">
          <li className="flex gap-5">
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
                <span>Notifications</span>
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
                <span>Notification Settings</span>
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
