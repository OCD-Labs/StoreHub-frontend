"use client";

import React, { useState, useContext, use, useEffect } from "react";
import { CartContext } from "@contexts/CartContext";
import Image from "next/image";
import reviewProduct from "@public/assets/images/reviewProduct.png";
import { MapPinIcon, TruckIcon } from "@heroicons/react/24/outline"; // For icons
import { getCookie } from "@lib/cookie";
import { useSearchParams } from "next/navigation";
import { AuthProvider } from "@contexts/AuthProvider";
import { usePathname } from "next/navigation";
import Link from "next/link";
import useSWR from "swr";
import { useRouter } from "next/navigation";

import { getStoreItemDetails } from "@services/products";
import { set } from "react-hook-form";

const Product = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const [refresh, setRefresh] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const pathname = usePathname();

  const store_id = pathname?.match(/stores\/(\d+)/)?.[1] || "";

  const item_id = useSearchParams().get("item_id") as string;
  useEffect(() => {}, [refresh]);
  const cartActions = useContext(CartContext);
  if (!cartActions) {
    throw new Error("CartContext must be used within a CartProvider");
  }
  const { userCarts, addItemToCart } = cartActions;
  console.log(userCarts);

  const [isAddingCart, setIsCartAdded] = useState(false);
  // const userCart = userCarts?.cart?.filter(
  //   (item) => item.item_id === Number(item_id)
  // );
  // console.log(userCart, Number(item_id), userCarts?.cart_id, "userCarts");
  const addToCart = async () => {
    setIsCartAdded(true);
    try {
      await addItemToCart(
        Number(item_id),
        Number(store_id),
        userCarts?.cart_id
      );
    } catch (error) {
      throw new Error("Failed to add item to cart");
    }
    setIsCartAdded(false);
    setRefresh(refresh + 1);
  };

  const fetcher = (url: string) => getStoreItemDetails(url);
  const { data, error, isLoading } = useSWR(
    `/stores/${store_id}/items/${item_id}`,
    fetcher
  );
  const item = data?.data.result.item;

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching data </div>;
  }

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Section: Product Image and Thumbnails */}
        <div className="lg:col-span-1">
          <div className="border p-4 rounded-lg">
            <Image
              src={item.image_urls[0]}
              alt="Pasta Spaghetti pack"
              width={400}
              height={400}
              className="rounded-lg"
            />
          </div>

          {/* Thumbnails */}
          <div className="flex space-x-2 mt-4">
            <div className="border p-1 rounded-lg cursor-pointer">
              <Image
                src={item.image_urls[0]}
                alt="Thumbnail 1"
                width={60}
                height={60}
                className="rounded-lg"
              />
            </div>
            <div className="border p-1 rounded-lg cursor-pointer">
              <Image
                src={item.image_urls[0]}
                alt="Thumbnail 2"
                width={60}
                height={60}
                className="rounded-lg"
              />
            </div>
          </div>
        </div>

        {/* Middle Section: Product Info */}
        <div className=" bg-white rounded-lg ">
          {/* Price Section */}
          <div className="flex items-center space-x-2">
            <p className="text-4xl font-bold text-gray-900">${item.price}</p>
            <p className="text-gray-400 line-through text-xl">
              {item.discount_percentage}
            </p>
          </div>

          {/* Product Title */}
          <h2 className="text-xl font-semibold text-gray-900 mt-2">
            {item.description}
          </h2>

          {/* Rating & Sold Information */}
          <div className="flex items-center mt-2 space-x-1">
            <div className="flex items-center text-yellow-500">★★★★☆</div>
            <p className="text-sm text-gray-600">4.0 | 5876+ sold</p>
          </div>

          {/* Quantity Selector */}
          <div className="mt-4">
            <p className="text-sm font-semibold mb-2">
              Quantity: {item.supply_quantity}
            </p>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => quantity > 0 && setQuantity(quantity - 1)}
                className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-lg font-bold text-gray-500"
              >
                -
              </button>
              <p className="text-lg font-semibold">{quantity}</p>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-lg font-bold text-gray-500"
              >
                +
              </button>
            </div>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={() => addToCart()}
            className="mt-6 w-full bg-orange-500 text-white py-3 rounded-lg hover:bg-orange-600"
          >
            {isAddingCart ? "Adding to cart..." : "Add to Cart"}
          </button>
        </div>

        {/* Right Section: Shipping Information */}
        <div className=" p-4 rounded-lg  border">
          {/* Shipping Information Title */}
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-orange-500">
              Shipping Information
            </h3>
            <MapPinIcon className="w-5 h-5 text-gray-700" />
          </div>

          {/* Shipping Fee */}
          <div className="flex items-center mb-4">
            <TruckIcon className="w-5 h-5 text-gray-700 mr-2" />
            <div>
              <p className="text-sm text-gray-700">Shipping fee $0.96</p>
              <p className="text-xs text-gray-500">Delivery: Dec 19 - 25</p>
            </div>
          </div>

          {/* Location Selector */}
          <div className="mb-6">
            <div className="flex items-center mb-2">
              <MapPinIcon className="w-5 h-5 text-gray-700 mr-2" />
              <p className="text-sm text-gray-700">Choose your location</p>
            </div>
            <select className="w-full border rounded-lg px-3 py-2 text-sm text-gray-600">
              <option>Location</option>
              <option>Choba</option>
              <option>Rumuokoro</option>
              <option>Eliozu</option>
            </select>
          </div>

          {/* Delivery Options */}
          <h4 className="text-green-600 font-semibold mb-2">
            Delivery Options
          </h4>
          <div className="flex justify-between items-center mb-2">
            <p className="text-sm text-gray-700">Pick Up</p>
            <p className="text-xs text-gray-500">Delivery fee: $0.47</p>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-700">Door Step Delivery</p>
            <p className="text-xs text-gray-500">Delivery fee: $1.47</p>
          </div>
        </div>
      </div>

      {/* Routes for overview and reviews */}
      {/* <div>
        <div className="py-4 averagescreen:py-6">
          <section>
            <div className="flex justify-between px-2 lg:px-0 my-5">
              <li className="flex gap-5 ">
                <ul>
                  <Link
                    href={{
                      pathname: "/stores/8/product/overview",
                      query: {
                        id: id,
                        name: name,
                        user: userID,
                      },
                    }}
                  >
                    <span className="text-gray-500 lg:text-lg text-[14px]  hover:text-[#000000]">
                      Overview
                    </span>
                  </Link>
                </ul>
                <ul>
                  <Link
                    href={{
                      pathname: "/stores/8/product/reviews",
                      query: {
                        id: id,
                        name: name,
                        user: userID,
                      },
                    }}
                  >
                    <span className="text-gray-500 lg:text-lg text-[14px]  hover:text-[#000000]">
                      Reviews
                    </span>
                  </Link>
                </ul>
              </li>
            </div>
          </section>
          <AuthProvider>
            <section>{children}</section>
          </AuthProvider>
        </div>
      </div> */}
    </div>
  );
};

export default Product;
