"use client";

import React, { useState, useContext, useRef } from "react";
import { CartContext } from "@contexts/CartContext";
import { TrashIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import "@/styles/cart.css";
import CheckoutModal from "@components/global/checkoutModal";


interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
  selected: boolean;
}

const Cart: React.FC = () => {
  const addBtnRef = useRef();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const cartContext = useContext(CartContext);
  if (!cartContext) {
    throw new Error("CartContext is undefined");
  }
  const {
    userCarts,
    isLoading,
    increaseCartQuantity,
    decreaseCartQuantity,
    cart_id,
  } = cartContext;
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (!userCarts) {
    throw new Error("userCarts is undefined");
  }

  console.log(userCarts, "userCarts");

  const shippingFee = 20;

  // const removeBtnRef = useRef<HTMLButtonElement | null>(null);

  console.log(addBtnRef.current, "addBtnRef");

  // const increaseQuantity = async (id: number, amount: number) => {
  //   await increaseCartQuantity(cart_id, item_id, quantity);
  // };

  const calculateSubtotal = (): number => {
    return userCarts.reduce((acc, item) => acc + item.price * item.quantity, 0);
  };

  const subtotal = calculateSubtotal();
  const total = subtotal + shippingFee;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <table className="w-full text-left border-collapse">
        <thead className="">
          <tr className="text-[#414040BF] bg-[#FCF8F2] font-vietnam text-[15px] rounded-xl  font-semibold">
            <th className="p-4">Product</th>
            <th>Price</th>
            <th className="">
              <span className="hidden md:block">Quantity</span>{" "}
              <span className="md:hidden px-3">QTY</span>
            </th>
            <th>Total</th>
          </tr>
        </thead>
        {/* Spacer Row */}
        <tr>
          <td colSpan={11} className="h-[70px]"></td>
        </tr>
        <tbody>
          {userCarts.map((item) => (
            <tr key={item.id} className="border-b">
              <td className="flex items-center p-4">
                <input
                  type="checkbox"
                  // onChange={() =>
                  //   setCartItems((prevItems) =>
                  //     prevItems.map((prevItem) =>
                  //       prevItem.id === item.id
                  //         ? { ...prevItem, selected: !prevItem.selected }
                  //         : prevItem
                  //     )
                  //   )
                  // }
                  className="mr-2"
                />
                {item.item_name}
              </td>
              <td className="text-gray-700 p-2 font-medium">N{item.price}</td>
              <td className="flex items-center">
                <button
                  ref={addBtnRef}
                  // onClick={() => updateQuantity(item.id, -1)}
                  className="px-2 border rounded-l"
                  aria-label="Decrease quantity"
                >
                  −
                </button>
                <span className="border px-2">{item.quantity}</span>
                <button
                  // onClick={() => updateQuantity(item.id, 1)}
                  className="px-2 border rounded-r"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </td>
              <td className="text-gray-700 font-medium">
                N{item.price * item.quantity}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Totals and Action Buttons */}
      <div className="mt-8 flex justify-between items-center">
        {/* Trash Icon */}
        <TrashIcon
          className="w-6 h-6 mb-[120px] text-[#000000] cursor-pointer hover:text-red-500"
          aria-label="Remove all items"
        />

        {/* Summary Section */}
        <div className="space-y-1  text-right">
          <div className="flex py-3 gap-[60px] justify-between">
            <span className="text-gray-500 text-[17px] font-medium font-vietnam">
              Subtotal :
            </span>
            <span className="text-[17px] font-medium font-vietnam">
              N{subtotal.toFixed(2)}
            </span>
          </div>
          <div className="flex gap-[60px] py-3 justify-between">
            <span className="text-gray-500 text-[17px] font-medium font-vietnam">
              Shipping fee :
            </span>
            <span className="text-[17px] font-medium font-vietnam">
              N{shippingFee.toFixed(2)}
            </span>
          </div>
          <div className="flex gap-[60px] py-3 justify-between text-lg font-bold">
            <span className="text-gray-700 text-[17px] font-medium font-vietnam">
              Total :
            </span>
            <span className="font-vietnam text-[17px] font-medium">
              N{total.toFixed(2)}
            </span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between mt-9">
        <button className="px-4 py-2 bg-[#FCF8F2] border text-[16px] font-semibold text-[#1D2131] rounded-md hover:bg-[#d8a65a]">
          Continue Shopping
        </button>
        <div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 bg-orange-500 text-[16px] font-semibold text-white  rounded-md hover:bg-orange-600"
          >
            Checkout
          </button>
          {isModalOpen && (
            <CheckoutModal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
			 
			  
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
