// @ts-nocheck
"use client";
import React, { useState } from "react";
import coown from "../../../public/assets/icons/Inventory/coown.svg";
import Image from "next/image";
import { Button } from "@components/ui/Button";
import search from "../../../public/assets/icons/search.svg";
import useSWR from "swr";
import { Loader2 } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { AddStoreCoOwner } from "@app/apis/Inventory";
import { getCookie } from "@lib/cookie";
import { BASE_URL } from "@constants";
const FULLACCESS = 1;
const PRODUCTINVENTORYACCESS = 2;
const SALESACCESS = 3;
const ORDERSACCESS = 4;

const AccessModal = ({ accessModal }: { accessModal: any }) => {
  const session = getCookie("token");
  const id: string | null = useSearchParams().get("id");
  const [loading, setLoading] = useState<boolean>(false);
  const [coowner, setCoowner] = useState<CoOwner>({
    account_id: "",
    new_access_level: FULLACCESS,
  });

  const handleChange = (e: any) => {
    setCoowner({
      ...coowner,
      [e.target.name]: e.target.value,
    });
  };
  console.log(coowner);

  const sendInvitation = async () => {
    debugger;
    setLoading(true);
    console.log(coowner, "own");
    const body = {
      ...coowner,
      new_access_level: Number(coowner.new_access_level),
    };
    const res = await fetch(
      `${BASE_URL}/inventory/stores/${id}/send-access-invitation`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session}`,
        },
        body: JSON.stringify(body),
      }
    ).then((res) => {
      setLoading(false);
      return res.json();
    });
    console.log(res?.status, "ressss");

    accessModal(res?.status);
  };
  return (
    <div>
      <div className="flex flex-col justify-center items-center gap-4">
        <Image src={coown} width={60} height={60} alt="fullaccess"></Image>
        <p>Add a co-owner to your store</p>
        <div className="flex flex-col gap-3">
          <form>
            <span className="relative w-[100%] sm:w-[100%]">
              <input
                name="account_id"
                onChange={handleChange}
                className="border w-[350px] mb-3 h-[35px] rounded-[5px] pl-[30px] sm:pl-[40px] pr-[30px] sm:pr-[35px]"
                placeholder="Search full name, username or email"
              />
              <Image
                src={search}
                alt="search product"
                height={20}
                width={20}
                className="absolute top-2 left-2 sm:left-3"
              />
            </span>
            <span className="relative w-[100%] sm:w-[100%]">
              <select
                onChange={handleChange}
                name="new_access_level"
                typeof="number"
                className="border w-[350px] h-[35px] rounded-[5px] pl-[30px] sm:pl-[40px] pr-[30px] sm:pr-[35px] text-gray-400"
              >
                <option>Select Access</option>
                <option label="full access">1</option>
                <option label="inventory access">2</option>
                <option label="sales access">3</option>
              </select>
            </span>
          </form>
        </div>
        <Button variant="default" onClick={sendInvitation}>
          {loading ? (
            <div className="flex">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> please wait...
            </div>
          ) : (
            "Add as co-owner"
          )}
        </Button>
      </div>
    </div>
  );
};

export default AccessModal;
