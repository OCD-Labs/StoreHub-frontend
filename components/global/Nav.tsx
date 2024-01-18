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
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../components/ui/Avatar";

const Nav = () => {
  // const [providers, setProviders] = useState(null)
  // const { wallet } = userWallet.getState()
  // const setUser = userWallet((state) => state.setUser)
  const [store, setStore] = useState<any>();
  const [isMenuOpened, setMenuOpen] = useState(false);
  // const [isMobile, setIsMobile] = useState(false)
  const { data: session } = useSession();

  // @ts-ignore
  console.log(session?.user.user.first_name, "user");
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

  const toggleDropdown = () => {
    setMenuOpen(!isMenuOpened);
  };

  return (
    <nav className="flex-between max-w-6xl m-auto items-baseline w-full mt-0 sticky top-0 py-[10px] px-4 lg:px-0 font-light text-base">
      <Link href="/">
        <Image src={logo} width={100} height={100} alt="logo"></Image>
      </Link>
      {/* Navigation*/}
      <div className="flex gap-3 items-baseline">
        <div className="sm:flex hidden">
          <div className="flex gap-3 md:gap-5 items-baseline leading-tight text-dark">
            {/* <Link href="/features">Features</Link> */}
            <Link href="/stores">Stores</Link>
          </div>
        </div>
        {!session ? (
          <>
            <Link href="/auth/signin">Login</Link>
            <Button variant="default">
              <Link href={"/auth/onboarding"} className="font-light">
                Sign up
              </Link>
            </Button>
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
                        {session?.user.user.first_name[0]}
                        {session?.user.user.last_name[0]}
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
                    <Link href={"/userdashboard"}>Account</Link>
                  </Dropdown.Item>
                  <Dropdown.Item>
                    {!error && data?.data.result.stores.length ? (
                      <Link
                        href={{
                          pathname: "/inventory/Itemsdashboard",
                          query: {
                            id: data?.data.result.stores[0].store_id,
                            name: data?.data.result.stores[0].store_name,
                            user: session?.user.user.user_id,
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
                        signOut().then(() => {
                          clearCookie("token");
                        });
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
  );
};

export default Nav;
