import { useState, useEffect, JSX } from "react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Post, UpdatePostRequest } from "@/types/post.types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2, PenLine } from "lucide-react";

interface EditPostDialogProps {
  post: Post;
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (postId: string, data: UpdatePostRequest) => void;
  isUpdating: boolean;
}

const EditPostDialog = ({
  post,
  isOpen,
  onClose,
  onUpdate,
  isUpdating,
}: EditPostDialogProps): JSX.Element => {
  const [formData, setFormData] = useState<UpdatePostRequest>({
    title: "",
    content: "",
    kategori: "",
  });

  useEffect(() => {
    if (post) {
      setFormData({
        title: post.title,
        content: post.content,
        kategori: post.kategori,
      });
    }
  }, [post]);

  const handleChange = (field: keyof UpdatePostRequest, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate(post.id, formData);
  };

  const isFormChanged =
    formData.title !== post.title ||
    formData.content !== post.content ||
    formData.kategori !== post.kategori;

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <AlertDialogHeader>
          <AlertDialogTitle>Edit Post</AlertDialogTitle>
          <AlertDialogDescription>
            Update your post details below
          </AlertDialogDescription>
        </AlertDialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => handleChange("title", e.target.value)}
              placeholder="Post title"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">Content</Label>
            <Textarea
              id="content"
              value={formData.content}
              onChange={(e) => handleChange("content", e.target.value)}
              placeholder="Post content"
              required
              className="min-h-[120px]"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="kategori">Category</Label>
            <Select
              value={formData.kategori}
              onValueChange={(value) => handleChange("kategori", value)}
            >
              <SelectTrigger id="kategori" className="w-full">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="TUGAS">TUGAS</SelectItem>
                <SelectItem value="CURHAT">CURHAT</SelectItem>
                <SelectItem value="MEME">MEME</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <AlertDialogFooter className="pt-4">
            <AlertDialogCancel type="button" onClick={onClose}>
              Cancel
            </AlertDialogCancel>
            <Button
              type="submit"
              disabled={isUpdating || !isFormChanged}
              className="bg-primary hover:bg-primary/90"
            >
              {isUpdating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Updating...
                </>
              ) : (
                <>
                  <PenLine className="mr-2 h-4 w-4" />
                  Update Post
                </>
              )}
            </Button>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default EditPostDialog;
