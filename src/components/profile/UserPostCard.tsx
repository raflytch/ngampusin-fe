import { Post } from "@/types/auth.types";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, ThumbsUp, Calendar, Edit, Trash2 } from "lucide-react";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import { JSX } from "react";

interface UserPostCardProps {
  post: Post;
  onEdit?: (postId: string) => void;
  onDelete?: (postId: string) => void;
}

const UserPostCard = ({
  post,
  onEdit,
  onDelete,
}: UserPostCardProps): JSX.Element => {
  const getInitials = (name: string) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "MMM d, yyyy • h:mm a");
    } catch {
      return dateString;
    }
  };

  const truncateContent = (content: string, maxLength = 150) => {
    if (content.length <= maxLength) return content;
    return content.slice(0, maxLength) + "...";
  };

  const getKategoriColor = (kategori: string) => {
    const colors: Record<string, string> = {
      TUGAS: "bg-blue-100 text-blue-800 hover:bg-blue-200",
      MATERI: "bg-green-100 text-green-800 hover:bg-green-200",
      DISKUSI: "bg-purple-100 text-purple-800 hover:bg-purple-200",
      PERTANYAAN: "bg-amber-100 text-amber-800 hover:bg-amber-200",
      INFO: "bg-red-100 text-red-800 hover:bg-red-200",
    };
    return colors[kategori] || "bg-gray-100 text-gray-800 hover:bg-gray-200";
  };

  return (
    <Card className="overflow-hidden border-border/40 shadow-sm hover:shadow-md transition-all">
      <CardHeader className="pb-2 sm:pb-3 p-3 sm:p-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-2 sm:space-x-4">
            <Avatar className="h-8 w-8 sm:h-10 sm:w-10 border-2 border-white shadow-sm">
              <AvatarImage
                src={post.author.avatar || ""}
                alt={post.author.name}
              />
              <AvatarFallback className="bg-primary/10 text-primary text-xs sm:text-sm">
                {getInitials(post.author.name)}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="font-semibold leading-tight text-xs sm:text-sm">
                {post.isAnonymous ? "Anonymous" : post.author.name}
              </div>
              <div className="flex items-center text-[10px] sm:text-xs text-muted-foreground">
                <Calendar className="h-2.5 w-2.5 sm:h-3 sm:w-3 mr-1" />
                {formatDate(post.createdAt)}
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <Badge
              variant="secondary"
              className={`rounded-full px-2 py-0 sm:px-3 sm:py-0.5 text-[10px] sm:text-xs ${getKategoriColor(
                post.kategori
              )}`}
            >
              {post.kategori}
            </Badge>
          </div>
        </div>
        <CardTitle className="text-base sm:text-lg mt-2 sm:mt-3">
          {post.title}
        </CardTitle>
      </CardHeader>
      <CardContent className="pb-2 sm:pb-3 px-3 sm:px-4">
        <div className="prose prose-sm max-w-none text-muted-foreground text-xs sm:text-sm">
          {truncateContent(post.content)}
        </div>
        {post.image && (
          <div className="mt-2 sm:mt-3 overflow-hidden rounded-md">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-auto object-cover max-h-[150px] sm:max-h-[200px]"
            />
          </div>
        )}
      </CardContent>
      <CardFooter className="pt-0 pb-2 sm:pb-3 px-3 sm:px-4 flex flex-col sm:flex-row sm:justify-between gap-2 sm:gap-0">
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <ThumbsUp className="h-3 w-3 sm:h-4 sm:w-4 mr-1 text-muted-foreground" />
            <span className="text-xs sm:text-sm text-muted-foreground">
              {post.likesCount}
            </span>
          </div>
          <div className="flex items-center">
            <MessageSquare className="h-3 w-3 sm:h-4 sm:w-4 mr-1 text-muted-foreground" />
            <span className="text-xs sm:text-sm text-muted-foreground">
              {post.commentsCount}
            </span>
          </div>
        </div>
        <div className="flex space-x-2 justify-end w-full sm:w-auto">
          {onEdit && (
            <Button
              size="sm"
              variant="ghost"
              className="h-7 sm:h-8 text-[10px] sm:text-xs p-1 sm:p-2"
              onClick={() => onEdit(post.id)}
            >
              <Edit className="h-3 w-3 sm:h-3.5 sm:w-3.5 mr-1" />
              Edit
            </Button>
          )}
          {onDelete && (
            <Button
              size="sm"
              variant="ghost"
              className="h-7 sm:h-8 text-[10px] sm:text-xs p-1 sm:p-2 text-destructive hover:bg-destructive/10"
              onClick={() => onDelete(post.id)}
            >
              <Trash2 className="h-3 w-3 sm:h-3.5 sm:w-3.5 mr-1" />
              Delete
            </Button>
          )}
          <Button
            asChild
            size="sm"
            variant="outline"
            className="h-7 sm:h-8 text-[10px] sm:text-xs border-border/50 p-1 sm:p-2"
          >
            <Link to={`/post/${post.id}`}>View</Link>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default UserPostCard;
