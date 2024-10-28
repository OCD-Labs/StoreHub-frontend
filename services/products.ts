import { POST_OPTION } from "@app/apis";
import api from "./apiClient";
import { it } from "node:test";

export const getStores = async () => {
  const res = await api.get("/inventory/stores");
  console.log(res.data);

  return res.data;
};

export const getStoreItems = async (url: string) => {
  console.log("uuuu");

  const res = await api.get(url);
  console.log(res);

  return res.data;
};

export const getStoreItemDetails = async (url: string) => {
  const res = await api.get(url);
  console.log(res);
  return res.data;
};

export const getUserCart = async (url: string) => {
  const res = await api.get(url);
  if (res.status !== 200) {
    throw new Error("couldn't fetch cart");
  }
  console.log(res);
  return res.data.data.result;
};

export const addItemToCartApi = async (
  item_id: number,
  store_id: number,
  cart_id?: number
) => {
  const res = await api.post(`/carts/${cart_id}/items/`, {
    item_id: item_id,
    store_id: store_id,
  });
  console.log(res);
  return res.data;
};

export const removeItemFromCartApi = async (
  cart_id: number,
  item_id: number
) => {
  const res = await api.delete(`/carts/${cart_id}/items/${item_id}`);
  console.log(res);
  return res.data;
};

export const increaseCartQuantity = async (
  cart_id: number,
  item_id: number,
  quantity: number
) => {
  const res = await api.put(`/carts/${cart_id}/items/${item_id}/increase`, {
    increase_amount: quantity,
  });
  console.log(res);
  return res.data;
};

export const getStoreInfo = async (store_id: number) => {
  const res = await api.get(`stores/${store_id}`);
  console.log(res);
  return res.data;
};

export const decreaseCartQuantity = async (
  cart_id: number,
  item_id: number,
  quantity: number
) => {
  const res = await api.put(`/carts/${cart_id}/items/${item_id}/decrease`, {
    decrease_amount: quantity,
  });
  console.log(res);
  return res.data;
};
