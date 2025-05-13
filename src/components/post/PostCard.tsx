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
    <Card className="mb-4 shadow-sm hover:shadow-md transition-shadow overflow-hidden">
      <CardHeader className="flex flex-row items-start sm:items-center gap-2 sm:gap-3 pb-2 p-3 sm:p-4">
        <Avatar className="h-8 w-8 sm:h-10 sm:w-10 border border-primary/10 flex-shrink-0">
          <AvatarImage
            src={post.author.avatar || undefined}
            alt={post.author.name}
          />
          <AvatarFallback className="bg-primary/10 text-primary font-medium text-xs sm:text-sm">
            {getInitials(post.author.name)}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col min-w-0">
          <div className="flex flex-wrap items-center gap-1 sm:gap-2">
            <p className="font-medium text-xs sm:text-sm truncate max-w-[120px] sm:max-w-none">
              {post.author.name}
            </p>
            <Badge
              variant="outline"
              className="font-normal text-xs hidden sm:inline-flex"
            >
              {post.author.fakultas}
            </Badge>
          </div>
          <p className="text-[10px] sm:text-xs text-muted-foreground">
            {formattedDate}
          </p>
        </div>

        <div className="ml-auto">
          <Badge
            className={`${getCategoryColor(
              post.kategori
            )} text-[10px] sm:text-xs px-1.5 py-0.5 sm:px-2 sm:py-1`}
          >
            {post.kategori}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="pb-2 px-3 sm:px-6">
        <h3 className="text-base sm:text-lg font-semibold mb-1 sm:mb-2">
          {post.title}
        </h3>
        <div className="text-xs sm:text-sm text-gray-700 whitespace-pre-line">
          {isContentLong && !isExpanded ? (
            <>
              <p>{post.content.substring(0, 300)}...</p>
              <Button
                variant="link"
                className="p-0 h-auto text-[10px] sm:text-xs text-primary"
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
          <div className="mt-2 sm:mt-3 rounded-md overflow-hidden">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-auto max-h-[300px] sm:max-h-[400px] object-cover"
            />
          </div>
        )}
      </CardContent>

      <CardFooter className="pt-0 flex justify-between border-t border-gray-100 px-2 sm:px-4 py-1 sm:py-2">
        <Button
          variant="ghost"
          size="sm"
          className={`gap-1 px-2 sm:px-3 ${
            post.isLiked ? "text-red-500" : "text-gray-600 hover:text-red-500"
          }`}
          onClick={() => onLike(post.id, !post.isLiked)}
        >
          <Heart
            className={`h-3.5 w-3.5 sm:h-4 sm:w-4 ${
              post.isLiked ? "fill-red-500" : ""
            }`}
          />
          <span className="text-[10px] sm:text-xs">{post.likesCount}</span>
        </Button>

        <Button
          variant="ghost"
          size="sm"
          className="gap-1 text-gray-600 px-2 sm:px-3"
        >
          <MessageCircle className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
          <span className="text-[10px] sm:text-xs">{post.commentsCount}</span>
        </Button>

        <Button
          variant="ghost"
          size="sm"
          className="gap-1 text-gray-600 px-2 sm:px-3"
        >
          <Share className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PostCard;
