
// @ts-nocheck
"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { z } from "zod";
import Dropdown from "react-bootstrap/Dropdown";
import { getAllStores } from "@app/apis";
import { BASE_URL } from "@components/util/config";
import { Button } from "@components/ui/Button";
import logo from "@public/assets/images/storehublogo.svg";
import useSWR from "swr";
import { clearCookie, getCookie } from "@components/util/cookie";
import storehubIcon from "@public/assets/images/storehubIcon.svg";
import { Divide, ShoppingCart } from "lucide-react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../components/ui/Avatar";
import { getSession } from "@app/actions/auth-action";
import { getUser, removeUser } from "@components/util/session";
import { Menu, X } from "lucide-react";
import {
  MagnifyingGlassIcon,
  UserIcon,
  ShoppingCartIcon,
} from "@heroicons/react/24/outline";


const StoreNav = () => {
  const [store, setStore] = useState<any>();
  const [Opened, setOpen] = useState(false);
  const [isMenuOpened, setMenuOpen] = useState(false);
  console.log(isMenuOpened);
  const session = getCookie("token");
  const user = getUser("user");
  // @ts-ignore
  console.log(session, "user");
  const getAllStores = (url: string) =>
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getCookie("token")}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // validate data with zod
        return data;
      });
  const { data, error, isLoading } = useSWR(
    session ? `${BASE_URL}/inventory/stores` : null,
    getAllStores
  );
  console.log(data, error, "navdata");
  const toggleDropdown = () => {
    setOpen(!Opened);
  };
  const toggleNavdown = () => {
    setMenuOpen(!isMenuOpened);
  };
  return (
    <>
      
      <nav className=" max-w-[75rem] mx-auto px-4 gap-[80px] flex justify-between my-3 items-center ">
        {/* StoreHub Logo */}
        <div>
          <Link href="/">
            {" "}
            <Image
              className=" w-[125px]
          h-[30px]"
              src={storehubIcon}
              alt=" store hub Logo"
            />{" "}
          </Link>
        </div>
        {/* Search Stores Component */}
        <div className="flex-grow mx-4">
          <div className="relative">
            <input
              type="text"
              className="w-full py-2 pl-4 pr-12 rounded-lg border border-gray-300  focus:outline-none "
              placeholder="Search stores, products, categories"
            />
            <button className="absolute right-[1px] top-0 pb-[13px] hover:bg-[#a96a4f]   bg-[#FE5B13] p-2 pt-2 rounded-lg">
              <MagnifyingGlassIcon className="h-5 w-5 text-white " />
            </button>
          </div>
        </div>
        {/* Login and sign up component */}
        <div className="flex gap-[10px]">
     
          {!session ? (
            <>
              <Link
                href="/auth/signin"
                className="hover:text-[#FE5B13] font-vietnam font-[600] flex items-center space-x-1 "
              >
                <UserIcon className="h-6 w-6" />
                Login
              </Link>
              <div>
                <p className=" font-vietnam font-[600] ">/</p>
              </div>
              <Link
                href={"/auth/onboarding"}
                className="hover:text-[#FE5B13] font-vietnam font-[600]"
              >
                Sign up
              </Link>
            </>
          ) : (
            <>
              <div>
                <Dropdown
                  onToggle={toggleDropdown}
                  className="flex flex-col static"
                  style={{ position: "static", padding: 0, minWidth: "auto" }}
                >
                  <Dropdown.Toggle variant="success" id="dropdown-basic">
                    <div className="flex gap-2 mb-3 justify-center items-center">
                      <div></div>
                      <Avatar>
                        <AvatarImage src="" />
                        <AvatarFallback className="border-4 border-dark">
                          {user.first_name[0]}
                          {user.last_name[0]}
                        </AvatarFallback>
                      </Avatar>
                    </div>
                  </Dropdown.Toggle>
                  <Dropdown.Menu
                    className={`flex flex-col z-20 border border-black text-sm p-4 gap-3 bg-white rounded-lg ${
                      Opened === false ? "hidden" : ""
                    }`}
                  >
                    {/* <Dropdown.Item href="#/action-1">Action</Dropdown.Item> */}
                    <Dropdown.Item href="#/action-2">
                      <Link href="/createStore">
                        <button className="black_btn">Create Store</button>
                      </Link>
                    </Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item>
                      <Link
                        className="hover:text-[#FE5B13] font-[600]"
                        href={"/userdashboard/accountinfo/accountdetails"}
                      >
                        Account
                      </Link>
                    </Dropdown.Item>
                    <Dropdown.Item>
                      {!error &&
                      !data?.error &&
                      data?.data.result.stores.length ? (
                        <Link
                          href={{
                            pathname: "/inventory/Itemsdashboard",
                            query: {
                              id: data?.data.result.stores[0].store_id,
                              name: data?.data.result.stores[0].store_name,
                              user: user.user_id,
                            },
                          }}
                        >
                          Dashboard
                        </Link>
                      ) : (
                        ""
                      )}
                    </Dropdown.Item>
                    <Dropdown.Item>
                      <button
                        className="hover:text-[#FE5B13] font-[600]"
                        onClick={() => {
                          clearCookie("token");
                          removeUser("user");
                        }}
                      >
                        Sign out
                      </button>
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </>
          )}
        </div>
        {/* Shopping Cart component */}
        <div className="hover:text-[#FE5B13] cursor-pointer font-vietnam font-[600] flex items-center space-x-1 ">
         <p>Cart</p> <ShoppingCartIcon className="h-6  w-6" />
        </div>
      </nav>
    </>
  );
};
export default StoreNav;