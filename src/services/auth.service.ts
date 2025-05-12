import api from "@/api/api";
import { LoginRequest, LoginResponse, LoginError } from "@/types/auth.types";
import { AxiosError } from "axios";
import Cookies from "js-cookie";

export const authService = {
  login: async (data: LoginRequest): Promise<LoginResponse> => {
    try {
      const response = await api.post<LoginResponse>("/auth/login", data);

      if (response.data.access_token) {
        Cookies.set("jwt", response.data.access_token);
      }

      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        const status = error.response?.status || 500;

        if (status === 401) {
          throw {
            message: "Invalid credentials",
            error: "Unauthorized",
            statusCode: 401,
          } as LoginError;
        }

        if (error.response?.data) {
          const responseData = error.response.data;
          throw {
            message: responseData.message || "Login failed",
            error: responseData.error || "Error",
            statusCode: responseData.statusCode || status,
          } as LoginError;
        }
      }

      throw {
        message: "Network error or server unavailable",
        error: "Error",
        statusCode: 500,
      } as LoginError;
    }
  },

  googleLogin: (): void => {
    const apiUrl = import.meta.env.VITE_API_URL;
    window.location.href = `${apiUrl}/auth/google`;
  },

  handleGoogleCallback: (token: string): void => {
    if (token) {
      Cookies.set("jwt", token);
    }
  },

  logout: () => {
    Cookies.remove("jwt");
    Cookies.remove("refreshToken");
  },
};
