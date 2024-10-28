"use client";

import React, { useState, useContext, useRef, use } from "react";
import { CartContext } from "@contexts/CartContext";
import { TrashIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import "@/styles/cart.css";
import CheckoutModal from "@components/global/checkoutModal";

import { Button } from "@components/ui/Button";
import { Loader2 } from "lucide-react";

// import CheckoutModal from "@components/global/checkoutModal";

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
  selected: boolean;
}

const Cart: React.FC = () => {
  const addBtnRef = useRef([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [item_id, setItemId] = useState<number>(0); // itemId
  const cartContext = useContext(CartContext);
  const [removingItem, setRemovingItem] = useState(false);
  if (!cartContext) {
    throw new Error("CartContext is undefined");
  }
  const {
    userCarts,
    isLoading,
    increaseCartQuantity,
    decreaseCartQuantity,
    removeItemFromCart,
    refreshCart,
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

  console.log(item_id, "addBtnRef");

  function getItemDetail(index: number, id: number) {
    if (addBtnRef.current[index]) {
      // Do something with the specific button ref
    }
    console.log(id);
  }

  // const increaseQuantity = async (id: number, amount: number) => {
  //   await increaseCartQuantity(cart_id, item_id, quantity);
  // };

  const calculateSubtotal = (): number => {
    return userCarts?.cart?.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
  };

  const subtotal = calculateSubtotal();
  const total = subtotal + shippingFee;

  // remove cart item
  const removeCartItem = async (item_id: number) => {
    try {
      console.log("clic", item_id, userCarts.cart_id);

      setItemId(item_id);
      setRemovingItem(true);
      await removeItemFromCart(userCarts.cart_id, item_id);
    } catch (error) {
    } finally {
      setRemovingItem(false);
    }
  };

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
          {userCarts?.cart?.map((item, i) => (
            <tr key={i} className="border-b">
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
                  ref={(el) => (addBtnRef.current[i] = el)}
                  onClick={() => getItemDetail(i, item.item_id)}
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
              <td className="text-gray-700 font-medium">
                <Button
                  onClick={() => removeCartItem(item.item_id)}
                  className="text-orange-500"
                  variant="ghost"
                  size="sm"
                >
                  {removingItem && item.item_id === item_id ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <p>Removing...</p>
                    </>
                  ) : (
                    "Remove"
                  )}
                </Button>
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
              {/* N{subtotal.toFixed(2)} */}
            </span>
          </div>
          <div className="flex gap-[60px] py-3 justify-between">
            <span className="text-gray-500 text-[17px] font-medium font-vietnam">
              Shipping fee :
            </span>
            <span className="text-[17px] font-medium font-vietnam">
              {/* N{shippingFee.toFixed(2)} */}
            </span>
          </div>
          <div className="flex gap-[60px] py-3 justify-between text-lg font-bold">
            <span className="text-gray-700 text-[17px] font-medium font-vietnam">
              Total :
            </span>
            <span className="font-vietnam text-[17px] font-medium">
              {/* N{total.toFixed(2)} */}
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
