"use client";
import React, { useState } from "react";
import AccessLevel from "@components/stores/storesettings/AccessLevel";
import fullaccess from "../../../../public/assets/icons/Inventory/fullaccess.svg";
import inventoryaccess from "../../../../public/assets/icons/Inventory/inventoryaccess.svg";
import salesaccess from "../../../../public/assets/icons/Inventory/salesaccess.svg";
import { ToastContainer, toast } from "react-toastify";
import { Inventory } from "@StoreManager/inventory";
import "react-toastify/dist/ReactToastify.css";
import coown from "../../../../public/assets/icons/Inventory/coown.svg";
import Image from "next/image";
import { Button } from "@components/ui/Button";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../../components/ui/Dialog";
import { getCookie } from "@lib/cookie";
// import { getUser } from "@components/util/session";
import AccessModal from "@components/stores/storesettings/AccessModal";
import { BASE_URL } from "@constants";
import { useSearchParams } from "next/navigation";

const Settings = () => {
  // get stores from state
  const stores = Inventory((state) => state.stores);
  console.log(stores, "zusstores");
  const storeId = useSearchParams().get("id");
  const session = getCookie("token");
  //revoke access to store
  const revokeAccess = async (account_id: string) => {
    const token = session;
    const data = {
      account_id: account_id,
    };
    const res = await fetch(
      `${BASE_URL}/inventory/stores/${storeId}/revoke-all-access`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      }
    );

    if (res.status == 200) {
      toast("co-owner removed successfully");
    }
    console.log(res, "resrevoke");
  };

  const [isOpen, setIsOpen] = useState(false);
  function setupModal(status: any) {
    debugger;
    setIsOpen(!isOpen);
    if (status == "success") {
      toast("Invitation has been sent out");
    } else if (status == "error") {
      toast.error("failed to send out invite. Try again");
    }
  }
  return (
    <div>
      <div className="flex sm:flex-nowrap flex-wrap gap-3 text-white">
        <AccessLevel
          icon={fullaccess}
          info="This access level grants you complete control over the store"
          access="Full access"
        />
        <AccessLevel
          icon={inventoryaccess}
          info="This access level grants you complete control over the store"
          access="Inventory access"
        />
        <AccessLevel
          icon={salesaccess}
          info="This access level grants you complete control over the store"
          access="Sales access"
        />
        <AccessLevel
          icon={salesaccess}
          info="This access level grants you complete control over the store"
          access="Sales access"
        />
      </div>
      <ToastContainer />
      <div>
        {stores[0] && stores[0]?.store_owners.length > 1 ? (
          <>
            <div className="w-full flex flex-between mt-10 mb-10">
              <h2 className="text-lg font-bold mb-4">
                Manage Co-ownership Access
              </h2>
              <Button
                variant="default"
                onClick={() => {
                  setIsOpen(!isOpen);
                }}
              >
                Add people
              </Button>
            </div>
            <section>
              <div className="bg-graybrand flex flex-between p-6">
                <p>select all</p>
                <p>filter</p>
              </div>

              {stores[0].store_owners.map((owner) => {
                return (
                  <div key={owner.account_id}>
                    <div className="p-6 flex flex-between border w-full">
                      <div className="flex gap-8">
                        <div className="flex gap-4">
                          <div>
                            <img
                              className="h-8 w-8 rounded-full"
                              src="https://beforeigosolutions.com/wp-content/uploads/2021/12/dummy-profile-pic-300x300-1.png"
                              alt=""
                            />
                          </div>

                          <div>
                            <p>{owner.email}</p>

                            <p>
                              {" "}
                              {owner.is_original_owner ? "Owner" : "Co-owner"}
                            </p>
                          </div>
                        </div>
                        <div>
                          {stores[0].store_owners.map((owner) => {
                            return <div key={owner.account_id}></div>;
                          })}
                        </div>
                      </div>
                      {owner.is_original_owner ? (
                        ""
                      ) : (
                        <>
                          <Button
                            onClick={() => revokeAccess(owner.account_id)}
                          >
                            Remove
                          </Button>
                          <div>Edit</div>
                        </>
                      )}
                    </div>
                  </div>
                );
              })}
            </section>
          </>
        ) : (
          <div className="mt-8">
            <h2 className="text-lg font-bold mb-4">
              Manage Co-ownership Access
            </h2>
            <section className="border-dashed border-2 p-4 h-60 rounded-lg flex justify-center items-center">
              <div className="flex flex-col justify-center items-center gap-4">
                <Image
                  src={coown}
                  width={60}
                  height={60}
                  alt="fullaccess"
                ></Image>
                <p>No Co-owners Yet</p>

                <Dialog open={isOpen} onOpenChange={setupModal}>
                  <DialogTrigger>
                    <Button
                      variant="default"
                      onClick={() => {
                        setIsOpen(!isOpen);
                      }}
                    >
                      Add people
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <AccessModal accessModal={setupModal} />
                  </DialogContent>
                </Dialog>
              </div>
            </section>
          </div>
        )}
      </div>
    </div>
  );
};

export default Settings;
