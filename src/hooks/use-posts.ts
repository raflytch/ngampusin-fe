import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { postService } from "@/services/post.service";
import { PostsResponse } from "@/types/post.types";

export const usePosts = () => {
  const queryClient = useQueryClient();

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error,
    refetch,
  } = useInfiniteQuery({
    queryKey: ["posts"],
    queryFn: ({ pageParam = 1 }) => postService.getPosts(pageParam, 5),
    getNextPageParam: (lastPage) => {
      return lastPage.meta.hasNextPage ? lastPage.meta.page + 1 : undefined;
    },
    initialPageParam: 1,
  });

  const likeMutation = useMutation({
    mutationFn: (postId: string) => postService.likePost(postId),
    onMutate: async (postId) => {
      await queryClient.cancelQueries({ queryKey: ["posts"] });

      const previousData = queryClient.getQueryData<{
        pages: PostsResponse[];
        pageParams: number[];
      }>(["posts"]);

      queryClient.setQueryData<{
        pages: PostsResponse[];
        pageParams: number[];
      }>(["posts"], (old) => {
        if (!old) return { pages: [], pageParams: [] };

        return {
          ...old,
          pages: old.pages.map((page) => ({
            ...page,
            data: page.data.map((post) =>
              post.id === postId
                ? { ...post, isLiked: true, likesCount: post.likesCount + 1 }
                : post
            ),
          })),
        };
      });

      return { previousData };
    },
    onError: (_, __, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(["posts"], context.previousData);
      }
    },
  });

  const unlikeMutation = useMutation({
    mutationFn: (postId: string) => postService.unlikePost(postId),
    onMutate: async (postId) => {
      await queryClient.cancelQueries({ queryKey: ["posts"] });

      const previousData = queryClient.getQueryData<{
        pages: PostsResponse[];
        pageParams: number[];
      }>(["posts"]);

      queryClient.setQueryData<{
        pages: PostsResponse[];
        pageParams: number[];
      }>(["posts"], (old) => {
        if (!old) return { pages: [], pageParams: [] };

        return {
          ...old,
          pages: old.pages.map((page) => ({
            ...page,
            data: page.data.map((post) =>
              post.id === postId
                ? { ...post, isLiked: false, likesCount: post.likesCount - 1 }
                : post
            ),
          })),
        };
      });

      return { previousData };
    },
    onError: (_, __, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(["posts"], context.previousData);
      }
    },
  });

  const posts = data?.pages.flatMap((page) => page.data) || [];

  const toggleLike = (postId: string, isLiked: boolean) => {
    if (isLiked) {
      unlikeMutation.mutate(postId);
    } else {
      likeMutation.mutate(postId);
    }
  };

  return {
    posts,
    fetchNextPage,
    hasNextPage: !!hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error,
    refetch,
    toggleLike,
  };
};
