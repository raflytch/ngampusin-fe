import { useEffect, useRef } from "react";
import { usePosts } from "@/hooks/use-posts";
import PostCard from "./PostCard";
import PostSkeleton from "./PostSkeleton";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

const PostList = () => {
  const {
    posts,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    toggleLike,
  } = usePosts();

  const observerTarget = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 1.0 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current);
      }
    };
  }, [observerTarget, fetchNextPage, hasNextPage, isFetchingNextPage]);

  if (isLoading) {
    return (
      <div className="space-y-4 mx-auto max-w-full md:max-w-3xl px-2 sm:px-4">
        {[...Array(3)].map((_, index) => (
          <PostSkeleton key={index} />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4 mx-auto max-w-full md:max-w-3xl px-2 sm:px-4">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} onLike={toggleLike} />
      ))}

      {isFetchingNextPage && (
        <div className="flex justify-center my-4">
          <Button variant="ghost" disabled>
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            Loading more posts...
          </Button>
        </div>
      )}

      <div ref={observerTarget} className="h-4" />
    </div>
  );
};

export default PostList;
