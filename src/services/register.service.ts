import api from "@/api/api";
import { RegisterRequest, RegisterResponse } from "@/types/register.types";

export const registerService = {
  register: async (data: RegisterRequest): Promise<RegisterResponse> => {
    const response = await api.post<RegisterResponse>("/auth/register", data);
    return response.data;
  },
};
