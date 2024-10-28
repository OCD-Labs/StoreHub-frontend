"use client";
import {
  createContext,
  ReactNode,
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
  use,
} from "react";
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
  refreshCart: () => void;
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
  const [carts, setCarts] = useState(0);
  const [userCarts, setUserCarts] = useState<any>({});
  const [refresh, setRefresh] = useState(0);
  let uid = getUser("user");
  const userID = uid?.user_id;
  console.log(userID);

  const { data, isLoading, error } = useSWR(`carts/${userID}`, (url) =>
    getUserCart(url)
  );
  useEffect(() => {
    if (data) {
      setCarts((prev) => prev + data.cart.length);
      setUserCarts((prevUserCarts) => data);
    }
  }, [isLoading, data]);
  console.log(data);

  const refreshCart = () => {
    setRefresh(refresh + 1);
  };
  const cart_id = data?.cart_id;

  console.log(userCarts, "userCarts");
  console.log(carts, "carts");

  const addItemToCart = async (
    item_id: number,
    store_id: number,
    cart_id: number
  ): Promise<any> => {
    const res = await addItemToCartApi(item_id, store_id, cart_id);
    refreshCart();
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
    refreshCart,
    addItemToCart,
    removeItemFromCart,
    decreaseCartQuantity,
    increaseCartQuantity,
  };

  return (
    <CartContext.Provider value={cartActions}>{children}</CartContext.Provider>
  );
};
