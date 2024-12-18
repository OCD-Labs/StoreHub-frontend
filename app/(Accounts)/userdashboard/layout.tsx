"use client";
import { Suspense, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import Nav from "../../../components/global/Nav";
import myAccountBlack from "@public/assets/icons/myAccount-white.svg";
import myAccountWhite from "@public/assets/icons/myAccount-whitee.svg";
import orders from "@public/assets/icons/Inventory/orders.svg";
import ordersWhite from "@public/assets/icons/orders-white.svg";
import notification from "@public/assets/icons/Notification 2.svg";
import notificationWhite from "@public/assets/icons/notification-white.svg";
import saved from "@public/assets/icons/saved.svg";
import savedWhite from "@public/assets/icons/saved-white.svg";
import signoutIcon from "@public/assets/icons/signoutIcon.svg";
import { AuthProvider } from "@contexts/AuthProvider";
import AccountNav from "./AccountNav";
import { CartProvider } from "@contexts/CartContext";

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
      <body className="min-h-screen text-sm max-w-7xl m-auto sm:px-16 px-6">
        <AuthProvider>
          <CartProvider>
            <main className="h-screen flex flex-col justify-between py-4">
              <div className="mb-6">
                <div className="lg:hidden relative">
                  <AccountNav />
                </div>
                <div className="hidden md:block">
                  <Nav />
                </div>

                <section
                  className={`hidden md:block averagescreen:flex flex-col w-fit border-3 rounded-[10px] h-[83vh] mt-1 ${"flex"} fixed bg-[#1D2131] z-50`}
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
                            ? "bg-[#FE5B13] text-white"
                            : "text-white"
                        } flex px-4 w-[170px] md:w-[190px] pt-7 pb-4 font-bold rounded-t-[10px]`}
                      >
                        {" "}
                        {activeItem === "myAccount" ? (
                          <Image
                            src={myAccountWhite}
                            alt="My account"
                            width={15}
                            height={15}
                            className="mr-[15px]"
                          />
                        ) : (
                          <Image
                            src={myAccountWhite}
                            alt="My account"
                            width={15}
                            height={15}
                            className="mr-[15px]"
                          />
                        )}{" "}
                        <p
                          className={`font-sans text-xl font-light leading-[34.7px] text-center ${
                            activeItem === "myAccount"
                              ? "text-white"
                              : "text-[#FFFFFF] text-opacity-70"
                          }`}
                        >
                          MyAccount
                        </p>
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
                          activeItem === "orders"
                            ? "bg-[#FE5B13] text-white"
                            : "text-white"
                        } flex px-4 w-[170px] md:w-[190px] pt-7 pb-4 font-bold`}
                      >
                        {" "}
                        {activeItem === "orders" ? (
                          <Image
                            src={orders}
                            alt="My account"
                            width={15}
                            height={15}
                            className="mr-[15px]"
                          />
                        ) : (
                          <Image
                            src={ordersWhite}
                            alt="My account"
                            width={15}
                            height={15}
                            className="mr-[15px]"
                          />
                        )}{" "}
                        <p
                          className={`font-sans text-xl font-light leading-[34.7px] text-center ${
                            activeItem === "orders"
                              ? "text-white"
                              : "text-[#FFFFFF] text-opacity-70"
                          }`}
                        >
                          Orders
                        </p>
                      </span>
                    </Link>

                    <Link
                      onClick={() => handleItmeClick("notification")}
                      className="flex cursor-pointer"
                      href={{
                        pathname:
                          "/userdashboard/notifications/notificationinfo",
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
                            ? "bg-[#FE5B13] text-white"
                            : "text-white"
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
                            src={notificationWhite}
                            alt="My account"
                            width={15}
                            height={15}
                            className="mr-[15px]"
                          />
                        )}{" "}
                        <p
                          className={`font-sans text-xl font-light leading-[34.7px] text-center ${
                            activeItem === "notification"
                              ? "text-white"
                              : "text-[#FFFFFF] text-opacity-70"
                          }`}
                        >
                          Notifications
                        </p>
                      </span>
                    </Link>

                    <Link
                      onClick={() => handleItmeClick("saved")}
                      className="flex md:border-none cursor-pointer"
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
                          activeItem === "saved"
                            ? "bg-[#FE5B13] text-white"
                            : "text-white"
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
                            src={savedWhite}
                            alt="My account"
                            width={15}
                            height={15}
                            className="mr-[15px]"
                          />
                        )}{" "}
                        <p
                          className={`font-sans text-xl font-light leading-[34.7px] text-center ${
                            activeItem === "saved"
                              ? "text-white"
                              : "text-[#FFFFFF] text-opacity-70"
                          }`}
                        >
                          Saved
                        </p>
                      </span>
                    </Link>
                  </div>
                  <div className="flex items-center gap-3 absolute left-0 bottom-0 px-4 py-3 rounded-[10px] cursor-pointer bg-[#1D2131] w-full">
                    <Image src={signoutIcon} width={30} alt="sign out" />
                    <p className="text-white text-base font-sans">Sign Out</p>
                  </div>
                </section>
                <Suspense fallback={""}>
                  <div className="w-full averagescreen:ml-[220px] calculated-account-width md:border-2  rounded-[10px] h-[83vh] mt-2">
                    {children}
                  </div>
                </Suspense>
              </div>
            </main>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
};

export default Accounts;
