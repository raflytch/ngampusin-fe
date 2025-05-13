import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { profileService } from "@/services/profile.service";
import { postService } from "@/services/post.service";
import { useDispatch } from "react-redux";
import { loginSuccess } from "@/features/auth/authSlice";
import { toast } from "sonner";
import { ProfileUpdateRequest } from "@/types/auth.types";
import { UpdatePostRequest } from "@/types/post.types";

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

  const updatePostMutation = useMutation({
    mutationFn: ({
      postId,
      data,
    }: {
      postId: string;
      data: UpdatePostRequest;
    }) => postService.updatePost(postId, data),
    onMutate: async ({ postId, data }) => {
      await queryClient.cancelQueries({ queryKey: ["profile"] });

      const previousData = queryClient.getQueryData(["profile"]);

      if (profileData && profileData.posts) {
        const updatedPosts = profileData.posts.map((post) =>
          post.id === postId
            ? {
                ...post,
                ...data,
              }
            : post
        );

        const optimisticData = {
          ...profileData,
          posts: updatedPosts,
        };

        queryClient.setQueryData(["profile"], optimisticData);
      }

      return { previousData };
    },
    onSuccess: () => {
      toast.success("Post updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
    onError: (error: any, _variables, context) => {
      toast.error(error.message || "Failed to update post");
      if (context?.previousData) {
        queryClient.setQueryData(["profile"], context.previousData);
      }
    },
  });

  const deletePostMutation = useMutation({
    mutationFn: (postId: string) => postService.deletePost(postId),
    onMutate: async (postId) => {
      await queryClient.cancelQueries({ queryKey: ["profile"] });

      const previousData = queryClient.getQueryData(["profile"]);

      if (profileData && profileData.posts) {
        const filteredPosts = profileData.posts.filter(
          (post) => post.id !== postId
        );

        const optimisticData = {
          ...profileData,
          posts: filteredPosts,
        };

        queryClient.setQueryData(["profile"], optimisticData);
      }

      return { previousData };
    },
    onSuccess: () => {
      toast.success("Post deleted successfully!");
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
    onError: (error: any, _variables, context) => {
      toast.error(error.message || "Failed to delete post");
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
    posts: profileData?.posts || [],
    isLoading,
    error,
    updateProfile: updateProfileMutation.mutate,
    isUpdating: updateProfileMutation.isPending,
    updatePost: updatePostMutation.mutate,
    isUpdatingPost: updatePostMutation.isPending,
    deletePost: deletePostMutation.mutate,
    isDeletingPost: deletePostMutation.isPending,
    updateAvatar,
    isAvatarUploading,
    refetchProfile: refetch,
  };
};
