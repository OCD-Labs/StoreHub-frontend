import api from "./apiClient";

export const getUserStores = async (url: string) => {
  console.log(url, "url");

  const res = await api.get(url);

  if (res.status !== 200) {
    throw new Error("couldn't fetch stores");
  }
  console.log(res.data);

  const data = res.data.data.result.stores;
  return data;
};
