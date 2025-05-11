import { JSX } from "react";
import PostList from "@/components/post/PostList";

const Post = (): JSX.Element => {
  return (
    <div className="container mx-auto py-8 px-4 max-w-2xl">
      <h1 className="text-2xl font-bold mb-6">Posts Feed</h1>
      <PostList />
    </div>
  );
};

export default Post;
