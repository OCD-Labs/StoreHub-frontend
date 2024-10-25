"use client";
import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

const AccountInfo = ({ children }: { children: React.ReactNode }) => {
  const token = useSearchParams().get("token");
  const userID = useSearchParams().get("user");
  const id = useSearchParams().get("id");
  const name = useSearchParams().get("name");

  return (
    <div className="h-[100%] w-[100%]">
      <section className=" ">
      <div className="font-bold text-lg p-3 bg-[#FCF8F2]">Account Information</div>
        <hr className="w-full" />
        <div className="flex justify-between my-3 p-3">
          <li className="flex gap-5">
            <ul>
              <Link
                className="md:mb-[35px]"
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
                <span className=" hover:underline "> Account Details </span>
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
                <span className=" hover:underline">Reset Password</span>
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
                className=" hover:underline"
              >
                Payment Information
              </Link>
            </ul>
          </li>
        </div>
        <hr className="w-full" />
      </section>
      <Suspense>
        <section>{children}</section>
      </Suspense>
    </div>
  );
};
export default AccountInfo;
