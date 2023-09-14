"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";

const AccountInfo = ({ children }: { children: React.ReactNode }) => {
  const token = useSearchParams().get("token");
  const userID = useSearchParams().get("user");
  const id = useSearchParams().get("id");
  const name = useSearchParams().get("name");
  return (
    <div>
      <section>
        <div className="font-bold text-lg p-3">
          Account Information
        </div>
        <hr className="w-full" />
        <div className="flex justify-between my-3 p-3">
          <li className="flex gap-5">
            <ul>
              <Link
                href={{
                  pathname: "/userdashboard/accountinfo/accountdetails",
                  query: {
                    id: id,
                    name: name,
                    token: token,
                    user: userID,
                  },
                }}
              >
                <span>Account Details</span>
              </Link>
            </ul>
            <ul>
              <Link
                href={{
                  pathname: "/userdashboard/accountinfo/resetpassword",
                  query: {
                    id: id,
                    name: name,
                    token: token,
                    user: userID,
                  },
                }}
              >
                <span>Reset Password</span>
              </Link>
            </ul>
            <ul>
              <Link
                href={{
                  pathname: "/userdashboard/accountinfo/payment",
                  query: {
                    id: id,
                    name: name,
                    token: token,
                    user: userID,
                  },
                }}
              >
                Payment Information
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
export default AccountInfo;
