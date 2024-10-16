import { BASE_URL } from "@constants";
import axios from "axios";
import { getCookie } from "@lib/cookie";
// create an axios instance
const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${getCookie("token")}`,
  },
});

export default api;
