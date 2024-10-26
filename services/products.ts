import api from "./apiClient";

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
