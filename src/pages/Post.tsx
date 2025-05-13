import { JSX } from "react";
import PostList from "@/components/post/PostList";
import CreatePostForm from "@/components/post/CreatePostForm";
import { usePosts } from "@/hooks/use-posts";
import { Toaster } from "sonner";

const Post = (): JSX.Element => {
  const { createPost, isCreatingPost } = usePosts();

  return (
    <div className="container mx-auto py-8 px-4 max-w-2xl">
      <h1 className="text-2xl font-bold mb-6">Posts Feed</h1>
      <CreatePostForm onCreatePost={createPost} isCreating={isCreatingPost} />
      <PostList />
      <Toaster position="top-right" richColors />
    </div>
  );
};

export default Post;
