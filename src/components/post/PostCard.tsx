import { formatDistanceToNow } from "date-fns";
import { Heart, MessageCircle, Share } from "lucide-react";
import { Post } from "@/types/post.types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

interface PostCardProps {
  post: Post;
  onLike: (postId: string, isLiked: boolean) => void;
}

const getInitials = (name: string) => {
  if (!name) return "U";
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .substring(0, 2);
};

const getCategoryColor = (category: string) => {
  switch (category.toUpperCase()) {
    case "TUGAS":
      return "bg-blue-100 text-blue-800";
    case "DISKUSI":
      return "bg-green-100 text-green-800";
    case "PENGUMUMAN":
      return "bg-orange-100 text-orange-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const PostCard = ({ post, onLike }: PostCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const formattedDate = formatDistanceToNow(new Date(post.createdAt), {
    addSuffix: true,
  });
  const isContentLong = post.content.length > 300;

  return (
    <Card className="mb-4 shadow-sm hover:shadow-md transition-shadow">
      <CardHeader className="flex flex-row items-center gap-3 pb-2">
        <Avatar className="h-10 w-10 border border-primary/10">
          <AvatarImage
            src={post.author.avatar || undefined}
            alt={post.author.name}
          />
          <AvatarFallback className="bg-primary/10 text-primary font-medium">
            {getInitials(post.author.name)}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <p className="font-medium text-sm">{post.author.name}</p>
            <Badge variant="outline" className="font-normal text-xs">
              {post.author.fakultas}
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground">{formattedDate}</p>
        </div>

        <div className="ml-auto">
          <Badge className={`${getCategoryColor(post.kategori)}`}>
            {post.kategori}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="pb-3">
        <h3 className="text-lg font-semibold mb-2">{post.title}</h3>
        <div className="text-sm text-gray-700 whitespace-pre-line">
          {isContentLong && !isExpanded ? (
            <>
              <p>{post.content.substring(0, 300)}...</p>
              <Button
                variant="link"
                className="p-0 h-auto text-xs text-primary"
                onClick={() => setIsExpanded(true)}
              >
                Read more
              </Button>
            </>
          ) : (
            <p>{post.content}</p>
          )}
        </div>

        {post.image && (
          <div className="mt-3 rounded-md overflow-hidden">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-auto max-h-[400px] object-cover"
            />
          </div>
        )}
      </CardContent>

      <CardFooter className="pt-0 flex justify-between border-t border-gray-100 px-4 py-2">
        <Button
          variant="ghost"
          size="sm"
          className={`gap-1 ${
            post.isLiked ? "text-red-500" : "text-gray-600 hover:text-red-500"
          }`}
          onClick={() => onLike(post.id, post.isLiked)}
        >
          <Heart className={`h-4 w-4 ${post.isLiked ? "fill-red-500" : ""}`} />
          <span className="text-xs">{post.likesCount}</span>
        </Button>

        <Button variant="ghost" size="sm" className="gap-1 text-gray-600">
          <MessageCircle className="h-4 w-4" />
          <span className="text-xs">{post.commentsCount}</span>
        </Button>

        <Button variant="ghost" size="sm" className="gap-1 text-gray-600">
          <Share className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PostCard;
