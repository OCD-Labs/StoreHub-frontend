"use client";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import "../styles/inventory.css";
import { userWallet } from "@app/StoreManager";
import ProductItem from "@components/stores/productitem";
import AddItemModal from "@components/stores/create-store/addItemModal";
import { getSession } from "@components/util/session";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { BASE_URL } from "@components/util/config";
import { ToastContainer, toast } from "react-toastify";
import { Key, Suspense, useEffect, useState } from "react";
import { ModalOptions, modalstore } from "@app/StoreManager/modalstore";
import { GetStoreItems } from "@app/apis/Inventory";
import { GET_OPTIONS } from "@app/apis";
import necklace from "../../../../public/assets/images/necklace.png";
import search from "../../../../public/assets/icons/search.svg";
import filter from "../../../../public/assets/icons/filter.svg";

import "react-toastify/dist/ReactToastify.css";

const Inventory = () => {
  const isOpen = modalstore((state) => state.isOpen);
  const toggleModal = modalstore((state) => state.toggleModal);
  const ID = "123PDWD";
  const [storeItems, setStoreItems] = useState<any>([]);
  const [session, setSession] = useState<UserData | null>();
  const modaloptions = modalstore((state) => state.modalOptions);
  const [loading, setloading] = useState<boolean>(true);

  const userID: string | null = useSearchParams().get("user");

  const id: string | null = useSearchParams().get("id");
  const token: string | null = useSearchParams().get("token");
  const name: string | null = useSearchParams().get("name")

  const setAddItemStatus = (data: string, action: string) => {
    if (action == "update store") {
      if (data !== "error") {
        toast("Store item updated successfully!");
      } else {
        toast.error("Error while updating item. Try again");
      }
    } else {
      if (data !== "error") {
        toast("Store item added successfully!");
      } else {
        toast.error("Error while adding item. Try again");
      }
    }
  };
  const options: ModalOptions = {
    url: BASE_URL + `/users/${userID}/stores/${id}/items`,
    title: "Add Item to Store",
  };
  const getStoreData = async () => {
    try {
      fetch(BASE_URL + `/users/${userID}/stores/${id}/items`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data, "store items");
          setStoreItems(data ? data.data.result.items : []);
          setloading(false);
        });
    } catch (error) {
      console.log(error, "error from call");
    }
  };

  const readyItems = async () => {};

  useEffect(() => {
    readyItems().then(() => {
      getStoreData();
    });
  }, [3]);

  // debugger

  return (
    <Suspense>
      <main className="w-full py-4 averagescreen:py-6">
        <div
          className={`modal ${
            isOpen ? "animate-animatefadeIn is-open" : "animate-animatefadeOut"
          } lg:px-[] ${isOpen ? "is-open" : ""}`}
        >
          <div className="modal-content w-[90%] md:w-[60%]">
            <div className="flex justify-between items-center lg:px-20px">
              <div></div>
              <span
                onClick={() => {
                  toggleModal(options);
                }}
                className="text-lg cursor-pointer p-2"
              >
                X
              </span>
            </div>
            <AddItemModal
              id={id}
              userID={userID}
              addItemStatus={setAddItemStatus}
              options={modaloptions}
            ></AddItemModal>
          </div>
        </div>

        {/* product inventory header */}
        <div className="flex mb-12">
          <span className="mr-4 flex items-center">
            {/* <img src='../../assets/images/necklace.png' alt='Product' className='border'/> */}
            <Image
              src={necklace}
              alt="product"
              className="border rounded-full w-[110px] h-[110px] my-auto"
            />
          </span>
          <span className="w-[65%]">
            <div className="flex justify-between items-center">
              <p className="text-black font-semibold text-lg">
                {name ? name : 'Shine, Shimmer, Glimmer'}
              </p>
              <p className="bg-[#7AB74A8C] px-2 h-fit text-[12px] rounded-lg">
                Verified
              </p>
            </div>
            <div>
              <p className="text-[12px] my-2">
                Welcome to the Glittering Gems Boutique, where timeless elegance
                meets modern style! Step into our enchanting jewelry haven
                nestled within the heart of our beloved general store.
              </p>
            </div>
            <div className="border px-3 py-1 w-fit rounded-[5px]">
              Jewelry Store
            </div>
          </span>
        </div>

        {/* all products header */}
        <div>
          <div className="flex justify-between">
            <div className="flex">
              <p className="text-base font-bold text-[#000000] mr-6">
                All Products
              </p>
              <select>
                <option>Dalu test stores</option>
                <option>Hi</option>
                <option>there</option>
              </select>
            </div>

            <div>
              <select className="border py-1 px-3">
                <option>Currency</option>
                <option>Near</option>
                <option>Naira</option>
                <option>Dollar</option>
              </select>
            </div>
          </div>

          <hr className="my-2" />
          {/* search bar and add item div */}
          <div className="flex justify-between mb-6 sm:mb-10">
            <span className="relative w-[70%] sm:w-[75%]">
              <input
                className="border w-full h-[35px] rounded-[5px] pl-[30px] sm:pl-[40px] pr-[30px] sm:pr-[35px]"
                placeholder="Search product name, category, ID, status"
              />
              <Image
                src={search}
                alt="search product"
                height={20}
                width={20}
                className="absolute top-2 left-2 sm:left-3"
              />
              <Image
                src={filter}
                alt="search product"
                height={20}
                width={20}
                className="absolute top-2 right-2"
              />
            </span>
            <button
              onClick={() => {
                toggleModal(options);
              }}
              className="bg-[#000000] text-white py-1 sm:py-2 px-2 rounded-[5px]"
            >
              Add Item +
            </button>
          </div>
        </div>

        <div className="md:flex">
          <ToastContainer />
          <section className="md:flex-1">
            <div className="flex flex-col overflow-x-scroll scroll-smooth">
              <section className="flex justify-between p-3 flex-0-0-auto scroll-snap-align-start min-w-[700px] sm:min-w-[500px] bg-[#000000] text-white rounded-[5px]">
                <p className="md:w-[30%] w-[15em] mr-4">Product Name</p>
                <p className="md:w-[15%] w-[90px] mr-6 md:mr-0">Category</p>
                <p className="md:w-[15%] w-[90px]">ID</p>
                <p className="md:w-[15%] w-[90px]">Quatity</p>
                <p className="md:w-[15%] w-[90px]">Price</p>
                <p className="md:w-[15%] w-[90px]">Staus</p>
              </section>
              <hr />
              {loading ? (
                <Skeleton count={10} />
              ) : storeItems?.length < 1 ? (
                <h1 className="text-black sm:text-5xl text-4xl text-center mt-[20%]">
                  No Products Yet!
                </h1>
              ) : (
                storeItems?.map((product: any, key: Key | null | undefined) => (
                  <ProductItem key={key} product={product} />
                ))
              )}
            </div>
          </section>
        </div>
      </main>
    </Suspense>
  );
};

export default Inventory;
