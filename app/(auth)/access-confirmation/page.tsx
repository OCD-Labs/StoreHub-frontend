// @ts-nocheck
"use client";
import React, { useState } from "react";
import { Button } from "@components/ui/Button";
import { acceptInvitaion } from "@app/apis/Inventory";
import { Loader2 } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import { BASE_URL } from "@components/util/config";

import "react-toastify/dist/ReactToastify.css";
import { getCookie } from "@lib/cookie";

const AccessConfirmation = () => {
  const storeName = useSearchParams().get("store_name");
  const [loading, setloading] = useState(false);
  const storeId = useSearchParams().get("store_id");
  const confirmationToken = useSearchParams().get("sth_code");
  const Router = useRouter();
  const session = getCookie("token");

  // const signIn = async (e: any) => {
  //   debugger
  //   const res = await storehubAPI.post('/auth/login', user)
  //   console.log(res.data, 'user')
  //   setSession(res.data.data.result)
  // }

  // debugger // accept invitation from store
  // const token = getSession()?.access_token
  const token = "session?.user.token";
  const GET_OPTIONS = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  const acceptInvitation = async () => {
    try {
      setloading(true);
      const res = await fetch(
        BASE_URL +
          `/inventory/stores/${storeId}/accept-access-invitation?sth_code=${confirmationToken}`,
        GET_OPTIONS
      ).then((response) => response.json());
      console.log(res, "coown");
      if (!res.data) {
        toast.error("could not add you as coowner");
      } else {
        toast("You are now a coowner");
      }
      // Router.push(
      //   `/inventory/Itemsdashboard?id=${storeId}&name=${storeName}&user=1`,
      // )
      setloading(false);
    } catch (error) {
      setloading(false);
      toast("You are now a coowner");
      // Router.push('./stores')
      throw new Error(error + "could not process invitaion acceptance");
    }
  };

  return (
    <div className="flex justify-center items-center m-auto">
      <ToastContainer />
      <div className="flex flex-col justify-center items-center">
        <div className="mb-8 text-md">
          Accept Co-ownership Request for <b>{storeName}</b> store.
        </div>
        <div className="flex gap-4">
          {/* <Button variant="destructive" onClick={signIn}>
            Decline
          </Button> */}
          <Button
            variant="default"
            onClick={acceptInvitation}
            disabled={loading ? true : false}
          >
            {loading ? (
              <div className="flex">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> please wait...
              </div>
            ) : (
              "Accept"
            )}
          </Button>
        </div>
        {}
      </div>
    </div>
  );
};

export default AccessConfirmation;
