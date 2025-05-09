import api from "@/api/api";
import {
  RegisterRequest,
  RegisterResponse,
  RegisterError,
} from "@/types/register.types";
import { AxiosError } from "axios";

export const registerService = {
  register: async (data: RegisterRequest): Promise<RegisterResponse> => {
    try {
      const response = await api.post<RegisterResponse>("/auth/register", data);
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError && error.response?.data) {
        throw {
          message: error.response.data.message || "Registration failed",
          status: error.response.status || 500,
          statusCode: error.response.data.statusCode || 500,
        } as RegisterError;
      }
      throw {
        message: "Network error or server unavailable",
        status: 500,
        statusCode: 500,
      } as RegisterError;
    }
  },
};
