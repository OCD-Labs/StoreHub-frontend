"use client";
import { userWallet } from "@StoreManager";
import { useState, useEffect } from "react";
import { BASE_URL } from "@components/util/config";

export const useNav = () => {
  const { wallet } = userWallet.getState();
  const [isSignedIn, setIsSignedIn] = useState<unknown>();
  const [isMenuOpened, setMenuOpen] = useState(false);

  const [userData, setUserData] = useState<UserData>();

  useEffect(() => {
    (async () => {
      const loginState = await wallet.startUp();
      setIsSignedIn(loginState);
      console.log(loginState, "login state");
    })();

    return () => {};
  });

  useEffect(() => {
    if (wallet.accountId) {
      signIn();
    }
  });

  const signIn = () => {
    try {
      if (wallet.accountId) {
        fetch(BASE_URL + "/auth", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ account_id: wallet.accountId }),
        })
          .then((response) => response.json())
          .then(({ data }: UserResponse) => {
            const user: UserData = {
              access_token: data.result.access_token,
              user: data.result.user,
            };
            setUserData(user);
          });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const toggleDropdown = () => {
    setMenuOpen(!isMenuOpened);
  };

  return { wallet, isSignedIn, userData, toggleDropdown };
};
