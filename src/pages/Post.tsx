import { JSX } from "react";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";

const Post = (): JSX.Element => {
  const { logout } = useAuth();

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-4">Hello, this is post page</h1>
      <p className="mb-6">Welcome to the post page of our application.</p>

      <Button onClick={logout} variant="destructive">
        Logout
      </Button>
    </div>
  );
};

export default Post;
