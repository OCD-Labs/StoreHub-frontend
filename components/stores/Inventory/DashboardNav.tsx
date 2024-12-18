// @ts-nocheck
"use client";
import "@styles/globals.css";
import { useSearchParams } from "next/navigation";

import { useEffect, useState, useRef } from "react";
import { Button } from "@components/ui/Button";
import { ToastContainer, toast } from "react-toastify";
import Image from "next/image";
import Link from "next/link";
import Home from "@public/assets/icons/Inventory/home.svg";
import Products from "@public/assets/icons/Inventory/products.svg";
import Sales from "@public/assets/icons/Inventory/cart-sale.svg";
import logo from "@public/assets/images/storehublogo.svg";
import Orders from "@public/assets/icons/Inventory/orders.svg";
import settings from "@public/assets/icons/Inventory/settings.svg";
import notification from "../../../public/assets/icons/Notification 2.svg";
import arrow from "../../../public/assets/icons/arrow.svg";
import hambuger from "../../../public/assets/icons/align-justify.svg";
import cancel from "../../../public/assets/icons/x 2.svg";
import duplicate from "@public/assets/icons/Inventory/duplicate.svg";
import Edit from "@public/assets/icons/Inventory/Edit.svg";
import status from "@public/assets/icons/Inventory/status.svg";
import "react-toastify/dist/ReactToastify.css";
import { BASE_URL } from "@constants";
import { useRouter } from "next/navigation";
import { Inventory } from "@StoreManager/inventory";
import { getUser, getFromLocalStorage, saveToLocalStorage } from "@lib/session";
import storehubFooterLogo from "@public/assets/images/StorehubFooterLogo.png";
import PageFooter from "@components/global/PageFooter";
import storehubIcon from "@public/assets/images/storehubIcon.svg";
import { Menu, X } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../../components/ui/NavDropdown";
import "@styles/globals.css";
import { getCookie } from "@lib/cookie";

const DashboardNav = ({ children }: { children: React.ReactNode }) => {
  const session = getCookie("token");
  const user = getUser("user");
  const [activeItem, setActiveItem] = useState<string>("home");
  const [store, setCurrentStore] = useState<any>();
  const [sideBar, setSideBar] = useState<boolean>(false);
  const router = useRouter();
  const setStore = Inventory((state) => state.setStores);
  const stores = Inventory((state) => state.stores);
  // const store = stores[0]
  const handleSideBar = () => {
    setSideBar(!sideBar);
  };

  const handleItmeClick = (item: string): void => {
    setActiveItem(item);
  };

  const userID = useSearchParams().get("user");
  const id = useSearchParams().get("id");
  const name = useSearchParams().get("name");
  if (!localStorage.getItem("storeId")) {
    saveToLocalStorage("storeId", 0);
  }
  const storeId = getFromLocalStorage("storeId") || 0;
  const getAllStoresOwnedByUser = () => {
    fetch(BASE_URL + `/inventory/stores`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.data) {
          const stores = data.data.result.stores;
          setStore(stores);
          console.log(storeId, stores, "igfee");
          let selectedStore = stores.filter((store) => {
            return store.store_id == storeId;
          });
          console.log(
            selectedStore,
            stores[0].store_id,
            storeId,
            "selected store"
          );

          setCurrentStore(selectedStore[0]);
          handleItmeClick("products");
        }
      });
  };
  useEffect(() => {
    getAllStoresOwnedByUser();
  }, []);

  console.log(getFromLocalStorage("storeId"), "id");

  console.log(store, "storeeee");

  // check if there is a user logged in
  if (!session) {
    router.push("/auth/signin");
  }

  return (
    // max-w-7xl text-sm m-auto sm:px-16 px-6
    <main className="mb-6 ">
      {/* Large Screen */}
      <nav className="hidden max-w-7xl text-sm m-auto sm:px-16 px-6 lg:flex items-center  justify-between  py-3">
        <div className="flex ml-auto items-center">
          <div>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <div
                  onClick={() => {
                    navigator.clipboard.writeText(user.account_id);
                  }}
                >
                  <img
                    className="h-8 w-8 rounded-full"
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt=""
                  />
                </div>{" "}
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>
                  <div className="text-xs">
                    <div className="flex gap-2">
                      <Link href={`/stores/${store?.store_id}`}>My Store</Link>
                    </div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <div className="text-xs flex gap-2">
                    Switch User
                    <span>
                      {/* <Image
                        src={duplicate}
                        width={15}
                        height={15}
                        alt="inventory"
                      ></Image> */}
                    </span>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <div className="text-xs flex gap-2">
                    Sign Out
                    <span>
                      {/* <Image
                        src={status}
                        width={15}
                        height={15}
                        alt="inventory"
                      ></Image> */}
                    </span>
                  </div>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <span className="flex px-3 items-center text-[#000000] hover:text-black">
            {user.first_name} {user.last_name}
          </span>
          <Image src={notification} alt="notification" />
        </div>
      </nav>
      {/* mobile navigation */}
      <nav className=" lg:hidden max-w-[90rem] mx-auto px-4 flex justify-between relative my-5 items-center ">
        <div className="ml-auto flex gap-2 items-center">
          <Image src={notification} alt="notification" />

          <div className="sm:hidden" onClick={handleSideBar}>
            <Menu />
          </div>
        </div>
      </nav>
      {/* Side bar starts here  */}
      <div className=" ">
        <section
          className={`md:flex gap-5 flex-col mb-6  pr-[20px] w-fit h-[100vh] top-0 ${
            sideBar ? "flex" : "hidden"
          } fixed bg-[#1D2131] z-50  px-5`}
        >
          <div className="flex pl-2 mb-11  mt-6 flex-row justify-between">
            <div>
              <Link href="/">
                <Image
                  height={100}
                  width={100}
                  src={storehubFooterLogo}
                  alt=" store hub Logo"
                />
              </Link>
            </div>
          </div>

          <div>
            <Link
              onClick={() => handleItmeClick("Dashboard")}
              className={`${
                activeItem === "Dashboard" ? "bg-[#FE5B13] text-white" : ""
              }  p-2 gap-2 font-vietnam rounded-[5px] flex mb-6 cursor-pointer text-white`}
              href={{
                pathname: "/inventory/Dashboard",
                query: {
                  id: store?.store_id,
                  name: store?.store_name,
                  user: user.user_id,
                },
              }}
            >
              {/* flex mb-6 cursor-pointer */}
              <Image src={Products} alt="user" width={20} height={20} />
              <span className="text-white">Dashboard</span>
            </Link>
            <Link
              onClick={() => handleItmeClick("products")}
              className={`${
                activeItem === "products" ? "bg-[#FE5B13] text-white" : ""
              }  p-2 gap-2 font-vietnam rounded-[5px] flex mb-6 cursor-pointer`}
              href={{
                pathname: "/inventory/Itemsdashboard",
                query: {
                  id: store?.store_id,
                  name: store?.store_name,
                  user: user.user_id,
                },
              }}
            >
              {/* flex mb-6 cursor-pointer */}
              <Image src={Products} alt="user" width={20} height={20} />
              <span className="text-white">Products Inventory</span>
            </Link>
            <Link
              onClick={() => handleItmeClick("sales")}
              className={`${
                activeItem === "sales" ? "bg-[#FE5B13] text-white" : ""
              }  p-2 gap-2 font-vietnam rounded-[5px] flex mb-6 cursor-pointer`}
              href={{
                pathname: "/inventory/sales/salesoverview",
                query: {
                  id: store?.store_id,
                  name: store?.store_name,
                  user: user.user_id,
                },
              }}
            >
              {" "}
              <Image src={Sales} alt="Dashboard" width={20} height={20} />{" "}
              <span className="text-white">Sales Management</span>
            </Link>
            <Link
              onClick={() => handleItmeClick("orders")}
              className={`${
                activeItem === "orders" ? "bg-[#FE5B13] text-white" : ""
              }  p-2 gap-2 font-vietnam rounded-[5px] flex mb-6 cursor-pointer`}
              href={{
                pathname: "/inventory/orders/ordersoverview",
                query: {
                  id: store?.store_id,
                  name: store?.store_name,
                  user: user.user_id,
                },
              }}
            >
              {" "}
              <Image src={Orders} alt="Dashboard" width={20} height={20} />{" "}
              <span className="text-white">Order Management</span>
            </Link>
            <Link
              onClick={() => handleItmeClick("settings")}
              className={`${
                activeItem === "settings" ? "bg-[#FE5B13] text-white" : ""
              }  p-2 gap-2 font-vietnam rounded-[5px] flex mb-6 cursor-pointer`}
              href={{
                pathname: "/inventory/storesettings/coownership",
                query: {
                  id: store?.store_id,
                  name: store?.store_name,
                  user: user.user_id,
                },
              }}
            >
              {" "}
              <Image
                src={settings}
                alt="Dashboard"
                width={20}
                height={20}
              />{" "}
              <span className="text-white">Settings</span>
            </Link>

            {/* only seen in mobile */}
            <div className="lg:hidden flex ml-[130px] mt-[90%] items-center">
              <span className="flex px-3 text-white font-bold font-vietnam items-center ">
                {user.first_name[0]} {user.last_name[0]}
              </span>

              <div>
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    {" "}
                    <div
                      onClick={() => {
                        navigator.clipboard.writeText(user.account_id);
                      }}
                    >
                      <img
                        className="h-8 w-8 rounded-full"
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        alt=""
                      />
                    </div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>
                      <div className="text-xs">
                        <div className="flex gap-2">
                          <Link href={`/stores/${store?.store_id}`}>
                            My Store
                          </Link>
                        </div>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <div className="text-xs flex gap-2">
                        Switch User
                        <span>
                          {/* <Image
                        src={duplicate}
                        width={15}
                        height={15}
                        alt="inventory"
                      ></Image> */}
                        </span>
                      </div>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <div className="text-xs flex gap-2">
                        Sign Out
                        <span>
                          {/* <Image
                        src={status}
                        width={15}
                        height={15}
                        alt="inventory"
                      ></Image> */}
                        </span>
                      </div>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>
        </section>
        <ToastContainer />
        <div className="w-full averagescreen:pl-2 averagescreen:ml-[250px] calculated-width">
          {children}
        </div>
        {/* <PageFooter /> */}
      </div>
    </main>
  );
};

export default DashboardNav;
