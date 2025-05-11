import api from "@/api/api";
import { PostsResponse } from "@/types/post.types";

export const postService = {
  getPosts: async (
    page: number = 1,
    limit: number = 5
  ): Promise<PostsResponse> => {
    const response = await api.get<PostsResponse>(
      `/posts?page=${page}&limit=${limit}`
    );
    return response.data;
  },

  likePost: async (postId: string): Promise<void> => {
    await api.post(`/likes`, { postId });
  },

  unlikePost: async (postId: string): Promise<void> => {
    await api.delete(`/likes/${postId}`);
  },
};
