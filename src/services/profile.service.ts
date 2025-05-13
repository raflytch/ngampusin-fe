import api from "@/api/api";
import {
  ProfileResponse,
  ProfileUpdateRequest,
  User,
} from "@/types/auth.types";
import { AxiosError } from "axios";

export const profileService = {
  getProfile: async (): Promise<ProfileResponse> => {
    try {
      const response = await api.get<ProfileResponse>("/auth/profile");
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new Error(
          error.response?.data?.message || "Failed to fetch profile"
        );
      }
      throw new Error("Failed to fetch profile");
    }
  },

  updateProfile: async (data: ProfileUpdateRequest): Promise<User> => {
    try {
      const response = await api.patch<User>("/auth/profile", data);
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new Error(
          error.response?.data?.message || "Failed to update profile"
        );
      }
      throw new Error("Failed to update profile");
    }
  },

  updateAvatar: async (file: File): Promise<User> => {
    try {
      const formData = new FormData();
      formData.append("avatar", file);

      const response = await api.patch<User>("/auth/avatar", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new Error(
          error.response?.data?.message || "Failed to update avatar"
        );
      }
      throw new Error("Failed to update avatar");
    }
  },
};
