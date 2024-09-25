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
import { ShoppingCart } from "lucide-react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../components/ui/Avatar";
import { getSession } from "@app/actions/auth-action";
import { getUser, removeUser } from "@components/util/session";

const Nav = () => {
  const [store, setStore] = useState<any>();
  const [isMenuOpened, setMenuOpen] = useState(false);

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
    setMenuOpen(!isMenuOpened);
  };

  return (
    <nav className=" max-w-[90rem] mx-auto px-4 flex justify-between mt-2 mb-[60px] items-center space-x-6 py-4 ">
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

      <div className="flex gap-[46px]">
        <Link href="/" className="hover:text-[#FE5B13] font-[600]">
          Home
        </Link>
        <Link href="/about" className="hover:text-[#FE5B13] font-[600]">
          About Us
        </Link>
        <Link href="/features" className="hover:text-[#FE5B13] font-[600]">
          Features
        </Link>
        <Link href="/contact" className="hover:text-[#FE5B13] font-[600]">
          Contact
        </Link>

        <Link href="/stores" className="hover:text-[#FE5B13] font-[600]">
          Marketplace
        </Link>
      </div>

      <div className="flex gap-[38px]">
        {/* Shopping cart comes here*/}
        <div className="relative mt-2">
          <Link href="/cart">
            <ShoppingCart size={24} className="" />
          </Link>
          <span className="absolute top-[-10px] right-[-8px] font-medium text-sm">
            4
          </span>
        </div>

        {/* this is where the login and get started auth logic comes in */}

        {!session ? (
          <>
            <Link
              href="/auth/signin"
              className="hover:text-[#FE5B13] font-[600] mt-2"
            >
              Login
            </Link>

            <Link href={"/auth/onboarding"}>
              <button className="bg-[#FE5B13] text-white px-4 py-2 rounded-lg hover:bg-[#d46e43] font-[600]">
                Get Started
              </button>
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
                  <div className="flex gap-2 justify-center items-center bg-graybrand">
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
                    isMenuOpened === false ? "hidden" : ""
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
                    <Link href={"/userdashboard/accountinfo/accountdetails"}>
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

        {/* <Link href="/login" className="hover:text-[#FE5B13] font-[600] mt-2">
          Login
        </Link>
        <Link href={"/auth/onboarding"}>
          <button className="bg-[#FE5B13] text-white px-4 py-2 rounded-lg hover:bg-[#d46e43] font-[600]">
            Get Started
          </button>
        </Link> */}
      </div>
    </nav>
  );
};

export default Nav;
