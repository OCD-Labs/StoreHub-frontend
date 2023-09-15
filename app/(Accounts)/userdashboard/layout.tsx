"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import Nav from "../../../components/global/Nav";
import myAccount from "@public/assets/icons/Myaccount.svg";
import myAccountBlack from "@public/assets/icons/myAccount-white.svg";
import orders from "@public/assets/icons/Inventory/orders.svg";
import ordersWhite from "@public/assets/icons/orders-white.svg";
import notification from "@public/assets/icons/Notification 2.svg";
import notificationWhite from "@public/assets/icons/notification-white.svg";
import saved from "@public/assets/icons/saved.svg";
import savedWhite from "@public/assets/icons/saved-white.svg";
import signoutIcon from "@public/assets/icons/signoutIcon.svg";
import { AuthProvider } from "@app/AuthProvider";

import "@styles/globals.css";

const Accounts = ({ children }: { children: React.ReactNode }) => {
  const [activeItem, setActiveItem] = useState<string>("myAccount");

  const handleItmeClick = (item: string): void => {
    setActiveItem(item);
  };
  const userID = useSearchParams().get("user");
  const id = useSearchParams().get("id");
  const name = useSearchParams().get("name");
  return (
    <html lang="en">
      <body className="max-w-7xl text-sm m-auto sm:px-16 px-6">
        <AuthProvider>
          <main className="h-screen flex flex-col justify-between">
            <div className="mb-6">
              <Nav />
              {/* <div className="bg-black w-8 border">
              <Image src={myAccount} alt="user account" />
              <p>hello</p>
            </div> */}

              <section
                className={`averagescreen:flex flex-col w-fit border-2 rounded-[10px] h-[83vh] mt-6 ${
                  // sideBar ? 'flex' : 'hidden'
                  "flex"
                } fixed bg-white z-50`}
              >
                <div>
                  <Link
                    onClick={() => handleItmeClick("myAccount")}
                    className="flex cursor-pointer"
                    href={{
                      pathname: "/userdashboard/accountinfo/accountdetails",
                      query: {
                        id: id,
                        name: name,
                        user: userID,
                      },
                    }}
                  >
                    <span
                      className={`${
                        activeItem === "myAccount"
                          ? "bg-[#000000] text-white"
                          : ""
                      } flex px-4 w-[170px] md:w-[190px] pt-7 pb-4 font-bold rounded-t-[10px]`}
                    >
                      {" "}
                      {activeItem === "myAccount" ? (
                        <Image
                          src={myAccount}
                          alt="My account"
                          width={15}
                          height={15}
                          className="mr-[15px]"
                        />
                      ) : (
                        <Image
                          src={myAccountBlack}
                          alt="My account"
                          width={15}
                          height={15}
                          className="mr-[15px]"
                        />
                      )}{" "}
                      <p>My Account</p>
                    </span>
                  </Link>

                  <Link
                    onClick={() => handleItmeClick("orders")}
                    className="flex cursor-pointer"
                    href={{
                      pathname: "/userdashboard/orders/pending",
                      query: {
                        id: id,
                        name: name,
                        user: userID,
                      },
                    }}
                  >
                    <span
                      className={`${
                        activeItem === "orders" ? "bg-[#000000] text-white" : ""
                      } flex px-4 w-[170px] md:w-[190px] pt-7 pb-4 font-bold`}
                    >
                      {" "}
                      {activeItem === "orders" ? (
                        <Image
                          src={ordersWhite}
                          alt="My account"
                          width={15}
                          height={15}
                          className="mr-[15px]"
                        />
                      ) : (
                        <Image
                          src={orders}
                          alt="My account"
                          width={15}
                          height={15}
                          className="mr-[15px]"
                        />
                      )}{" "}
                      <p>Orders</p>
                    </span>
                  </Link>

                  <Link
                    onClick={() => handleItmeClick("notification")}
                    className="flex cursor-pointer"
                    href={{
                      pathname: "/userdashboard/notifications/notificationinfo",
                      query: {
                        id: id,
                        name: name,
                        user: userID,
                      },
                    }}
                  >
                    <span
                      className={`${
                        activeItem === "notification"
                          ? "bg-[#000000] text-white"
                          : ""
                      } flex px-4 w-[170px] md:w-[190px] pt-7 pb-4 font-bold`}
                    >
                      {" "}
                      {activeItem === "notification" ? (
                        <Image
                          src={notificationWhite}
                          alt="My account"
                          width={15}
                          height={15}
                          className="mr-[15px]"
                        />
                      ) : (
                        <Image
                          src={notification}
                          alt="My account"
                          width={15}
                          height={15}
                          className="mr-[15px]"
                        />
                      )}{" "}
                      <p>Notifications</p>
                    </span>
                  </Link>

                  <Link
                    onClick={() => handleItmeClick("saved")}
                    className="flex cursor-pointer"
                    href={{
                      pathname: "/userdashboard/saved/saveditems",
                      query: {
                        id: id,
                        name: name,
                        user: userID,
                      },
                    }}
                  >
                    <span
                      className={`${
                        activeItem === "saved" ? "bg-[#000000] text-white" : ""
                      } flex px-4 w-[170px] md:w-[190px] pt-7 pb-4 font-bold`}
                    >
                      {" "}
                      {activeItem === "saved" ? (
                        <Image
                          src={savedWhite}
                          alt="My account"
                          width={15}
                          height={15}
                          className="mr-[15px]"
                        />
                      ) : (
                        <Image
                          src={saved}
                          alt="My account"
                          width={15}
                          height={15}
                          className="mr-[15px]"
                        />
                      )}{" "}
                      <p>Saved</p>
                    </span>
                  </Link>
                </div>
              <div className="flex items-center gap-3 absolute left-0 bottom-0 px-4 py-3 cursor-pointer bg-gray-100 w-full">
                <Image src={signoutIcon} width={30} alt="sign out" />
                <p className="text-black text-base">Sign Out</p>
              </div>
              </section>


            <div className="w-full averagescreen:ml-[220px] calculated-account-width border-2 rounded-[10px] h-[83vh] mt-6">
              {children}
            </div>
            </div>
          </main>
        </AuthProvider>
      </body>
    </html>
  );
};

export default Accounts;
