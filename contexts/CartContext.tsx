"use client";
import { createContext, ReactNode } from "react";
import {
  addItemToCartApi,
  getUserCart,
  decreaseCartQuantity,
  increaseCartQuantity,
  removeItemFromCartApi,
} from "@services/products";
import useSWR from "swr";
import { getUser } from "@lib/session";

// Define the interface for the context value
interface CartContextType {
  isLoading: boolean;
  userCarts: Record<string, any>[];
  carts: number;
  cart_id: number;
  addItemToCart: (
    item_id: number,
    store_id: number,
    cart_id: number
  ) => Promise<any>;
  removeItemFromCart: (cart_id: number, item_id: number) => Promise<any>;
  decreaseCartQuantity: (
    cart_id: number,
    item_id: number,
    quantity: number
  ) => Promise<any>;
  increaseCartQuantity: (
    cart_id: number,
    item_id: number,
    quantity: number
  ) => Promise<any>;
}

// Update the context creation with the defined type
export const CartContext = createContext<CartContextType | null>(null);

// Provider component

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const userID = getUser("user").user_id;

  const { data, isLoading, error } = useSWR(`carts/${userID}`, (url) =>
    getUserCart(url)
  );

  const cart_id = data?.cart_id;
  const carts = data?.cart.length;
  const userCarts = data?.cart;
  console.log(userCarts, "userCarts");

  const addItemToCart = async (
    item_id: number,
    store_id: number,
    cart_id: number
  ): Promise<any> => {
    const res = await addItemToCartApi(item_id, store_id, cart_id);
    return res;
  };

  const removeItemFromCart = async (
    cart_id: number,
    item_id: number
  ): Promise<any> => {
    const res = await removeItemFromCartApi(cart_id, item_id);
    return res;
  };

  const decreaseCartQuantity = async (
    cart_id: number,
    item_id: number,
    quantity: number
  ): Promise<any> => {
    const res = await decreaseCartQuantity(cart_id, item_id, quantity);
    return res;
  };

  const increaseCartQuantity = async (
    cart_id: number,
    item_id: number,
    quantity: number
  ): Promise<any> => {
    const res = await increaseCartQuantity(cart_id, item_id, quantity);
    return res;
  };

  const cartActions = {
    userCarts,
    carts,
    cart_id,
    isLoading,
    addItemToCart,
    removeItemFromCart,
    decreaseCartQuantity,
    increaseCartQuantity,
  };

  return (
    <CartContext.Provider value={cartActions}>{children}</CartContext.Provider>
  );
};
