import api from "@/api/api";
import {
  CreatePostRequest,
  Post,
  PostsResponse,
  UpdatePostRequest,
} from "@/types/post.types";

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

  createPost: async (data: CreatePostRequest): Promise<Post> => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("content", data.content);
    formData.append("fakultas", data.fakultas);
    formData.append("kategori", data.kategori);
    formData.append(
      "isAnonymous",
      data.isAnonymous === true ? "true" : "false"
    );

    if (data.image) {
      formData.append("image", data.image);
    }

    const response = await api.post<Post>("/posts", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },

  updatePost: async (
    postId: string,
    data: UpdatePostRequest
  ): Promise<Post> => {
    const response = await api.patch<Post>(`/posts/${postId}`, data);
    return response.data;
  },

  deletePost: async (postId: string): Promise<{ message: string }> => {
    const response = await api.delete<{ message: string }>(`/posts/${postId}`);
    return response.data;
  },

  likePost: async (postId: string): Promise<void> => {
    await api.post(`/likes`, { postId });
  },

  unlikePost: async (postId: string): Promise<void> => {
    await api.delete(`/likes/${postId}`);
  },
};
