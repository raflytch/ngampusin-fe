import axios from "axios";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { store } from "@/store";
import { logout } from "@/features/auth/authSlice";

const API_URL = import.meta.env.VITE_API_URL;

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const isTokenExpired = (token: string): boolean => {
  try {
    const decoded: any = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    return decoded.exp < currentTime;
  } catch (error) {
    return true;
  }
};

api.interceptors.request.use(
  (config) => {
    const token = Cookies.get("jwt");
    if (token) {
      if (isTokenExpired(token)) {
        Cookies.remove("jwt");
      } else {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      Cookies.remove("jwt");
      store.dispatch(logout());
    }
    return Promise.reject(error);
  }
);

export default api;
