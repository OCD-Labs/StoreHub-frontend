import api from "./apiClient";

export const getStores = async () => {
  const res = await api.get("/inventory/stores");
  return res.data;
};
