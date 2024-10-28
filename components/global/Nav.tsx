// @ts-nocheck
"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useContext } from "react";
import { CartContext } from "@contexts/CartContext";
import { z } from "zod";
import Dropdown from "react-bootstrap/Dropdown";
import { getStores } from "@services/products";
import { BASE_URL } from "@constants";
import { Button } from "@components/ui/Button";
import logo from "@public/assets/images/storehublogo.svg";
import useSWR from "swr";
import { clearCookie, getCookie } from "@lib/cookie";
import storehubIcon from "@public/assets/images/storehubIcon.svg";
import { Divide, ShoppingCart } from "lucide-react";
import { saveToLocalStorage } from "@lib/session";
import { loginNewAddress } from "@NearAuth/near-wallet";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../components/ui/Avatar";
import { getSession } from "@app/actions/auth-action";

import { getUser, removeUser } from "@lib/session";
import { Menu, X } from "lucide-react";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";

const Nav = () => {
  const [store, setStore] = useState<any>();
  const [Opened, setOpen] = useState(false);
  const [isMenuOpened, setMenuOpen] = useState(false);
  const cartContext = useContext(CartContext);
  if (!cartContext) {
    throw new Error("Context could not be reached");
  }
  const { carts } = cartContext;
  const session = getCookie("token");

  const user = getUser("user");
  // useEffect(() => {
  //   loginNewAddress();
  // }, []);
  // @ts-ignore

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
    getStores
  );

  saveToLocalStorage("storeId", data?.data?.result?.stores[0]?.store_id);

  const toggleDropdown = () => {
    setOpen(!Opened);
  };

  const toggleNavdown = () => {
    setMenuOpen(!isMenuOpened);
  };

  return (
    <>
      {/* Large Screen */}
      <nav className="hidden max-w-[90rem] mx-auto px-4 lg:flex justify-between my-3 items-center ">
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

        <div className="flex gap-[50px]">
          <Link
            href="/"
            className="hover:text-[#FE5B13] font-vietnam font-medium"
          >
            Home
          </Link>
          <a
            href="#video"
            className="hover:text-[#FE5B13] font-vietnam font-medium"
          >
            About Us
          </a>
          <a
            href="#features"
            className="hover:text-[#FE5B13] font-vietnam font-medium"
          >
            Features
          </a>
          <a
            href="#faq"
            className="hover:text-[#FE5B13] font-vietnam font-medium"
          >
            FAQ
          </a>
          <Link
            href="/stores"
            className="hover:text-[#FE5B13] font-vietnam font-medium"
          >
            Marketplace
          </Link>
        </div>
        <Link href="/cart">
          <div className="hover:text-[#FE5B13] cursor-pointer font-vietnam font-[600] flex items-center space-x-1 ">
            <p>Cart</p> <ShoppingCartIcon className="h-6  w-6" />{" "}
            <p className="text-sm text-orange-500">{carts}</p>
          </div>
        </Link>
        <div className="flex gap-[38px]">
          {/* this is where the login and get started auth logic comes in */}

          {!session ? (
            <>
              <Link
                href="/auth/signin"
                className="hover:text-[#FE5B13] font-vietnam font-[600] mt-2"
              >
                Login
              </Link>

              <Link href={"/auth/onboarding"}>
                <button className="bg-[#FE5B13] font-vietnam text-white px-4 py-2 rounded-lg hover:bg-[#d46e43] font-[600]">
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
                          className="hover:text-[#FE5B13] font-[600]"
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
      </nav>

      {/* Mobile View  */}
      <nav className=" lg:hidden max-w-[90rem] mx-auto px-4 flex justify-between relative my-3 items-center ">
        {/* Storehub Icon*/}
        <div>
          <Link href="/">
            <Image
              className="w-[125px] h-[30px]"
              src={storehubIcon}
              alt="store hub Logo"
            />
          </Link>
        </div>

        {/* Hamburger icon for mobile */}
        <button onClick={toggleNavdown}>
          {isMenuOpened ? <X /> : <Menu />}
        </button>

        {/* For Nav link and login logic */}
        <div
          className={`absolute top-full left-0 transition-all mt-5 pl-5 bg-white h-[390px] w-full duration-500 ease-in-out transform ${
            isMenuOpened
              ? "opacity-100 visible translate-y-0"
              : "opacity-0 invisible -translate-y-5"
          } flex flex-col gap-5`}
        >
          {/* links Nav */}
          <div className="flex flex-col gap-9 mt-5">
            <Link
              href="/"
              className="hover:text-[#FE5B13] font-vietnam font-bold"
            >
              Home
            </Link>
            <a
              href="#video"
              className="hover:text-[#FE5B13] font-vietnam font-bold"
            >
              About Us
            </a>
            <a
              href="#features"
              className="hover:text-[#FE5B13] font-vietnam font-bold"
            >
              Features
            </a>
            <a
              href="#faq"
              className="hover:text-[#FE5B13] font-vietnam font-bold"
            >
              FAQ
            </a>
            <Link
              href="/stores"
              className="hover:text-[#FE5B13] font-vietnam font-bold"
            >
              Marketplace
            </Link>
          </div>

          {/* Get started auth logic */}
          <div className="my-3 justify-center flex gap-[38px] ">
            {!session ? (
              <>
                <Link href="/auth/signin">
                  <button className="font-bold bg[#FCF8F2] border mb-4  px-9 py-2 rounded-lg">
                    Login
                  </button>
                </Link>

                <Link href={"/auth/onboarding"}>
                  <button className="bg-[#FE5B13] text-white px-4 py-2 rounded-lg font-bold">
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
        </div>
      </nav>
    </>
  );
};

export default Nav;
