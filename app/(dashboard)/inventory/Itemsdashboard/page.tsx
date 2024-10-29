// @ts-nocheck
"use client";
import { useSearchParams, useRouter } from "next/navigation";

import Image from "next/image";
import "../styles/inventory.css";
import { PlusIcon, AdjustmentsHorizontalIcon } from "@heroicons/react/24/solid";
import ProductItem from "@components/stores/productitem";
import ProductDropdown from "@components/stores/Inventory/ProductDropdown";
import AddItemModal from "@components/stores/create-store/addItemModal";
import { Inventory } from "@StoreManager/inventory";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { BASE_URL } from "@constants";
import { ToastContainer, toast } from "react-toastify";
import { Key, Suspense, useEffect, useState } from "react";
import { ModalOptions, modalstore } from "@StoreManager/modalstore";
import clsx from "clsx";
import necklace from "../../../../public/assets/images/necklace.png";
import search from "../../../../public/assets/icons/search.svg";
import filter from "../../../../public/assets/icons/filter.svg";
import productImage1 from "@public/assets/images/productImage1.png";
import productImage2 from "@public/assets/images/productImage2.png";
import productImage3 from "@public/assets/images/productImage3.png";
import productImage4 from "@public/assets/images/productImage4.png";
import SearchIcon from "@public/assets/images/SearchIcon.png";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../../components/ui/Table";
import { saveToLocalStorage } from "@lib/session";
import { getCookie } from "@lib/cookie";
import "react-toastify/dist/ReactToastify.css";
import { X } from "lucide-react";
import { getUserStores } from "@services/dashboard";
import useSWR from "swr";
import api from "@services/apiClient";
const StoreInventory = () => {
  const isOpen = modalstore((state) => state.isOpen);
  const toggleModal = modalstore((state) => state.toggleModal);
  const session = getCookie("token");
  const ID = "123PDWD";
  const [storeItems, setStoreItems] = useState<any>([]);
  const [refNo, setRefNo] = useState<number>(1);
  const stores = Inventory((state) => state.stores);
  const modaloptions = modalstore((state) => state.modalOptions);
  const [loading, setloading] = useState<boolean>(true);
  const [search, setSearch] = useState("");
  const router = useRouter();

  const products = [
    {
      image: "/assets/images/productImage1.png",
      name: "Barilla",
      description: "Pasta",
      id: "WDT-444",
      category: "Food",
      quantity: 240,
      price: "$1.25",
      status: "In Stock",
      statusColor: "text-green-500 ",
      statusColorDot: "bg-green-500",
    },
    {
      image: "/assets/images/productImage2.png",
      name: "Indomie",
      description: "Noodles",
      id: "WDT-768",
      category: "Food",
      quantity: 190,
      price: "$1.25",
      status: "In Stock",
      statusColor: "text-green-500",
      statusColorDot: "bg-green-500",
    },
    {
      image: "/assets/images/productImage3.png",
      name: "Pack pasta",
      description: "Pasta",
      id: "WDT-890",
      category: "Food",
      quantity: 190,
      price: "$1.25",
      status: "Out of Stock",
      statusColor: "text-red-500",
      statusColorDot: "bg-red-500",
    },
    {
      image: "/assets/images/productImage4.png",
      name: "Heirloom",
      description: "Apples",
      id: "WDT-567",
      category: "Food",
      quantity: 190,
      price: "$1.25",
      status: "Low Stock",
      statusColor: "text-yellow-500",
      statusColorDot: "bg-yellow-500",
    },
  ];

  const userID: string | null = useSearchParams().get("user");

  const id: string | null = useSearchParams().get("id");
  const name: string | null = useSearchParams().get("name");

  const setAddItemStatus = (data: string, action: string) => {
    if (action == "update store") {
      if (data !== "error") {
        toast("Store item updated successfully!");
        setRefNo(() => {
          return refNo + 1;
        });
      } else {
        toast.error("Error while updating item. Try again");
      }
    } else {
      if (data !== "error") {
        toast("Store item added successfully!");
        setRefNo(() => {
          return refNo + 1;
        });
      } else {
        toast.error("Error while adding item. Try again");
      }
    }
  };

  const options: ModalOptions = {
    url: BASE_URL + `/inventory/stores/${id}/items`,
    title: "Add Item to Store",
  };

  const getStoreData = async () => {
    setloading(true);
    const token = session;
    console.log(token, "token");
    try {
      fetch(BASE_URL + `/inventory/stores/${id}/items`, {
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

  useEffect(() => {
    getStoreData();
  }, [refNo, session, id]);

  // load all user stores
  const fetcher = (url) => getUserStores(url);

  const { data, error, isLoading } = useSWR("/inventory/stores", fetcher);
  console.log(data, "dataomo");

  // change store function
  function changeStore(e) {
    const selected = e.target.value;
    const store_id = selected.match(/\(([^)]+)\)/)[1];
    const store_name = selected.split(" ")[0];
    saveToLocalStorage("storeId", store_id || 0);
    router.push(
      `/inventory/Itemsdashboard?id=${store_id}&name=${store_name}&user=1`
    );
    console.log(store_id, store_name, "selected store");
  }
  return (
    <Suspense>
      {/* modal to be triggered by Add item button below */}
      <main className="w-full py-4 px-5 max-w-7xl m-auto averagescreen:py-6">
        <div
          className={`modal ${
            isOpen ? "animate-animatefadeIn is-open" : "animate-animatefadeOut"
          } lg:px-[] ${isOpen ? "is-open" : ""}`}
        >
          <div className="modal-content w-[80%] md:w-[80%] h-[80vh] md:h-[90vh]">
            <div className="bg-white rounded-lg p-6 w-full max-w-4xl">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold">Add Product</h2>
                <button
                  onClick={() => {
                    toggleModal(options);
                  }}
                  className="text-[#000000] text-3xl hover:text-gray-700"
                >
                  <X />
                </button>
              </div>
            </div>

            <AddItemModal
              id={id}
              userID={userID}
              addItemStatus={setAddItemStatus}
              options={modaloptions}
              setloading={setloading}
            ></AddItemModal>
          </div>
        </div>

        {/* Product listed items */}
        <div className="max-w-7xl mx-auto p-6">
          {/* Top Section with Filters and Search */}
          <div className="flex items-center rounded-lg md:justify-between justify-center bg-[#FCF8F2] py-2 px-4 shadow-sm">
            {/* Left section with icons */}
            <div className="flex items-center gap-2 md:mr-0 mr-7">
              <button
                onClick={() => {
                  toggleModal(options);
                }}
                className="p-2 "
              >
                <PlusIcon className="h-5 w-5 text-black" />
              </button>
              <select
                onChange={changeStore}
                value={"store"}
                className="bg-white border border-gray-300 rounded-lg md:py-2 py-1 md:px-4 px-1 text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400"
              >
                <option value="" className="text-gray-400 font-vietnam md:text-lg text-[9px]">
                  Select your store
                </option>
                {data?.map((item) => (
                  <option
                    key={item.id}
                    value={item.name}
                    className="text-gray-700"
                  >
                    {item.store_name} ({item.store_id})
                  </option>
                ))}
              </select>
              <Image src={filter} className="h-5 w-5 text-black" />
            </div>

            {/* Search bar */}

            <div className="relative hidden md:block">
              <input
                type="text"
                className="bg-white border border-gray-300 rounded-lg md:pl-10 pl-2  md:pr-8 pr-0 py-2  focus:outline-none focus:ring-2 focus:ring-gray-400"
                placeholder="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <div className="absolute left-4 top-[13px] hidden lg:block">
                <Image
                  src={SearchIcon}
                  height={17}
                  width={15}
                  className="text-black"
                />
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-lg ">
              <thead>
                <tr className="text-left text-gray-500 text-sm">
                  <th className="py-3 px-4 border-b">
                    <input type="checkbox" className="rounded" />
                  </th>
                  <th className="py-3 px-4 border-b">Product</th>
                  <th className="py-3 px-4 border-b">ID</th>
                  <th className="py-3 px-4 border-b">Category</th>
                  <th className="py-3 px-4 border-b">Quantity</th>
                  <th className="py-3 px-4 border-b">Pricing</th>
                  <th className="py-3 px-4 border-b">Status</th>
                </tr>
              </thead>
              <tbody className=" border-b">
                {loading && <>loading...</>}
                {loading && <Skeleton className="w-full" count={2} />}
                {storeItems.map((product, index) => (
                  <tr key={index} className="border-t">
                    <td className="py-4 px-4">
                      <input type="checkbox" className="rounded" />
                    </td>
                    <td className="py-4 px-4 flex items-center space-x-2">
                      <Image
                        src={product.image_urls[0]}
                        alt={product.name}
                        width={40}
                        height={40}
                      />
                      <div>
                        <p className="font-medium text-gray-800">
                          {product.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {product.description.substr(0, 50)}...
                        </p>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-orange-500 font-medium text-sm">
                      {product.id}
                    </td>
                    <td className="py-4 px-4 text-black font-medium text-sm">
                      {product.category}
                    </td>
                    <td className="py-4 px-4 text-black font-medium text-sm">
                      {product.supply_quantity}
                    </td>
                    <td className="py-4 px-4 text-black font-medium text-sm">
                      {product.price}
                    </td>
                    <td className="flex mb-4 items-center">
                      <span
                        className={clsx(
                          `py-4 px-4 text-[10px] ${
                            product.status == "VISIBLE"
                              ? "text-green-500"
                              : "text-red-500"
                          }`
                        )}
                      >
                        {product.status}{" "}
                      </span>{" "}
                      <span
                        className={`ml-1  w-1 h-1 rounded-full ${product.statusColorDot}`}
                      ></span>
                      <ProductDropdown itemid={product.id}></ProductDropdown>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* product inventory Starts here
        <div className="flex mb-12">
          <span className="mr-4 flex items-center">
            


            <Image
              src={
                stores[0] && stores[0].store_image
                  ? stores[0]?.store_image
                  : necklace
              }
              width={200}
              height={200}
              alt="product"
              className="border rounded-full w-[110px] h-[110px] my-auto"
            />
          </span>
          <span className="w-[65%]">
            <div className="flex justify-between items-center">
              <p className="text-black font-semibold text-lg">
                {stores[0] ? stores[0]?.store_name : "Shine, Shimmer, Glimmer"}
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
        </div> */}

        {/* all products header */}
        {/* <div>
          <div className="flex justify-between">
            <div className="flex">
              <p className="text-base font-bold text-[#000000] mr-6">
                All Products
              </p>
              <select>
                <option>select store</option>
                {stores.map((store) => {
                  return <option>{store.store_name}</option>;
                })}
               
              </select>
            </div> */}

        {/* currencs components */}
        {/* <div>
              <select className="border py-1 px-3">
                <option>Currency</option>
                <option>Near</option>
                <option>Naira</option>
                <option>Dollar</option>
              </select>
            </div>
          </div> */}

        {/* <hr className="my-2" /> */}

        {/* search bar and add item div */}
        {/* <div className="flex justify-between mb-6 sm:mb-10">
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
            </span> */}

        {/* add item button that triggers the modal above */}
        {/* <button
              onClick={() => {
                toggleModal(options);
              }}
              className="bg-[#000000] text-white py-1 sm:py-2 px-2 rounded-[5px]"
            >
              Add Item +
            </button>
          </div>
        </div> */}

        {/* Product iventory table content */}
        {/* <div className="md:flex">
          <ToastContainer />
          <section className="md:flex-1">
            <div className="flex flex-col overflow-x-scroll scroll-smooth">
              <Table>
                <TableCaption>A list all your store items</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead>product Name</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>ID</TableHead>
                    <TableHead>Quatity</TableHead>
                    <TableHead>price</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {loading ? (
                    <Skeleton count={10} />
                  ) : storeItems?.length < 1 ? (
                    <h1 className="text-black sm:text-5xl text-4xl text-center mt-[20%]">
                      No Products Yet!
                    </h1>
                  ) : (
                    storeItems?.map(
                      (product: any, key: Key | null | undefined) => (
                        <TableRow>
                          <ProductItem key={key} product={product} />
                        </TableRow>
                      )
                    )
                  )}
                </TableBody>
              </Table>
            </div>
          </section> */}
        {/* </div> */}
      </main>
    </Suspense>
  );
};

export default StoreInventory;
