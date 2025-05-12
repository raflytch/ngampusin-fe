import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  profileService,
  ProfileUpdateRequest,
} from "@/services/profile.service";
import { useDispatch } from "react-redux";
import { loginSuccess } from "@/features/auth/authSlice";
import { toast } from "sonner";

export const useProfile = () => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const [isAvatarUploading, setIsAvatarUploading] = useState(false);

  const {
    data: profileData,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["profile"],
    queryFn: profileService.getProfile,
    staleTime: 5 * 60 * 1000,
  });

  const updateProfileMutation = useMutation({
    mutationFn: (data: ProfileUpdateRequest) =>
      profileService.updateProfile(data),
    onMutate: async (newData) => {
      await queryClient.cancelQueries({ queryKey: ["profile"] });

      const previousData = queryClient.getQueryData(["profile"]);

      if (profileData) {
        const updatedProfile = {
          ...profileData,
          user: {
            ...profileData.user,
            ...newData,
          },
        };

        queryClient.setQueryData(["profile"], updatedProfile);
        dispatch(loginSuccess(updatedProfile.user));
      }

      return { previousData };
    },
    onSuccess: (updatedUser) => {
      toast.success("Profile updated successfully!");
      dispatch(loginSuccess(updatedUser));
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
    onError: (error: any, _variables, context) => {
      toast.error(error.message || "Failed to update profile");
      if (context?.previousData) {
        queryClient.setQueryData(["profile"], context.previousData);
      }
    },
  });

  const updateAvatar = async (file: File) => {
    if (!file) return;

    try {
      setIsAvatarUploading(true);

      if (profileData) {
        const tempUrl = URL.createObjectURL(file);

        const optimisticData = {
          ...profileData,
          user: {
            ...profileData.user,
            avatar: tempUrl,
          },
        };

        queryClient.setQueryData(["profile"], optimisticData);
        dispatch(loginSuccess(optimisticData.user));

        const updatedUser = await profileService.updateAvatar(file);

        queryClient.setQueryData(["profile"], {
          ...profileData,
          user: updatedUser,
        });

        dispatch(loginSuccess(updatedUser));
        toast.success("Avatar updated successfully!");

        URL.revokeObjectURL(tempUrl);
        return updatedUser;
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to update avatar");
      if (profileData) {
        queryClient.setQueryData(["profile"], profileData);
      }
    } finally {
      setIsAvatarUploading(false);
    }
  };

  return {
    profile: profileData?.user,
    isLoading,
    error,
    updateProfile: updateProfileMutation.mutate,
    isUpdating: updateProfileMutation.isPending,
    updateAvatar,
    isAvatarUploading,
    refetchProfile: refetch,
  };
};
