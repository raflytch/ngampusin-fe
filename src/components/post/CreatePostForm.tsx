import { useState, useRef, JSX } from "react";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Image,
  Loader2,
  PenLine,
  X,
  BookOpen,
  Eye,
  EyeOff,
  Hash,
  Building2,
  Info,
} from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { CreatePostRequest } from "@/types/post.types";
import { cn } from "@/lib/utils";

interface CreatePostFormProps {
  onCreatePost: (postData: CreatePostRequest) => void;
  isCreating: boolean;
}

const CreatePostForm = ({
  onCreatePost,
  isCreating,
}: CreatePostFormProps): JSX.Element => {
  const { user } = useAuth();
  const [showFullForm, setShowFullForm] = useState(false);
  const [formData, setFormData] = useState<CreatePostRequest>({
    title: "",
    content: "",
    fakultas: user?.fakultas || "",
    kategori: "TUGAS",
    isAnonymous: false,
  });
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const getInitials = (name: string) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  const handleChange = (field: keyof CreatePostRequest, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: field === "isAnonymous" ? Boolean(value) : value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleChange("image", file);
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }
  };

  const removeImage = () => {
    setImagePreview(null);
    handleChange("image", undefined);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCreatePost({
      ...formData,
      isAnonymous: Boolean(formData.isAnonymous),
    });
    resetForm();
    setShowFullForm(false);
  };

  const resetForm = () => {
    setFormData({
      title: "",
      content: "",
      fakultas: user?.fakultas || "",
      kategori: "TUGAS",
      isAnonymous: false,
    });
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const onOpenChange = (open: boolean) => {
    setShowFullForm(open);
    if (!open) resetForm();
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "TUGAS":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "DISKUSI":
        return "bg-green-100 text-green-800 border-green-200";
      case "PENGUMUMAN":
        return "bg-orange-100 text-orange-800 border-orange-200";
      case "CURHAT":
        return "bg-purple-100 text-purple-800 border-purple-200";
      case "MEME":
        return "bg-pink-100 text-pink-800 border-pink-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <Card className="mb-6 shadow-sm border-border/40 mx-auto rounded-xl">
      <CardContent className="p-3 sm:p-4">
        <div className="flex items-center gap-2 sm:gap-3">
          <Avatar className="h-8 w-8 sm:h-10 sm:w-10 border border-primary/10 flex-shrink-0">
            <AvatarImage src={user?.avatar || undefined} alt={user?.name} />
            <AvatarFallback className="bg-primary/10 text-primary font-medium text-xs sm:text-sm">
              {getInitials(user?.name || "")}
            </AvatarFallback>
          </Avatar>

          <AlertDialog open={showFullForm} onOpenChange={onOpenChange}>
            <AlertDialogTrigger asChild className="flex-1">
              <Button
                variant="outline"
                className="text-muted-foreground max-w-full h-auto py-2 sm:py-2.5 px-3 sm:px-4 justify-start font-normal text-xs sm:text-sm rounded-full border-input/80 hover:bg-muted/70"
              >
                Share something with your peers...
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="max-w-full sm:max-w-2xl max-h-[90vh] overflow-y-auto p-0 gap-0 rounded-xl w-[95%] sm:w-auto">
              <div className="sticky top-0 z-10 bg-background border-b px-4 sm:px-6 py-3 sm:py-4 rounded-t-xl">
                <AlertDialogHeader className="pb-0 text-center">
                  <AlertDialogTitle className="text-lg sm:text-xl">
                    Create a post
                  </AlertDialogTitle>
                  <AlertDialogDescription className="text-xs sm:text-sm">
                    Share knowledge, ask questions, or connect with other
                    students
                  </AlertDialogDescription>
                </AlertDialogHeader>
              </div>

              <div className="px-4 sm:px-6 py-3 sm:py-4 overflow-y-auto max-h-[calc(90vh-120px)]">
                <form
                  onSubmit={handleSubmit}
                  className="space-y-4 sm:space-y-5"
                >
                  <div className="flex items-center gap-2 sm:gap-3 bg-muted/30 p-2 sm:p-3 rounded-lg">
                    <Avatar className="h-8 w-8 sm:h-10 sm:w-10 border border-primary/10 flex-shrink-0">
                      <AvatarImage
                        src={user?.avatar || undefined}
                        alt={user?.name}
                      />
                      <AvatarFallback className="bg-primary/10 text-primary font-medium text-xs sm:text-sm">
                        {getInitials(user?.name || "")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-medium text-xs sm:text-sm truncate">
                          {formData.isAnonymous ? "Anonymous" : user?.name}
                        </span>
                        {!formData.isAnonymous && user?.fakultas && (
                          <Badge
                            variant="outline"
                            className="font-normal text-[10px] sm:text-xs truncate hidden sm:inline-flex"
                          >
                            {user.fakultas}
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-2 mt-0.5 sm:mt-1">
                        <div className="flex items-center gap-1 sm:gap-1.5">
                          <Switch
                            id="anonymous-mode"
                            checked={formData.isAnonymous}
                            onCheckedChange={(checked) =>
                              handleChange("isAnonymous", checked)
                            }
                            className="scale-70 sm:scale-75"
                          />
                          <Label
                            htmlFor="anonymous-mode"
                            className="text-[10px] sm:text-xs text-muted-foreground cursor-pointer"
                          >
                            {formData.isAnonymous ? (
                              <span className="flex items-center gap-0.5 sm:gap-1">
                                <EyeOff className="h-2.5 w-2.5 sm:h-3 sm:w-3" />{" "}
                                Anonymous
                              </span>
                            ) : (
                              <span className="flex items-center gap-0.5 sm:gap-1">
                                <Eye className="h-2.5 w-2.5 sm:h-3 sm:w-3" />{" "}
                                Public
                              </span>
                            )}
                          </Label>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center gap-1 sm:gap-2 mb-1 sm:mb-1.5">
                      <Label
                        htmlFor="title"
                        className="text-xs sm:text-sm font-medium flex items-center gap-1"
                      >
                        <PenLine className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                        Title
                      </Label>
                      <span className="text-[10px] sm:text-xs text-red-500">
                        *
                      </span>
                    </div>
                    <Input
                      id="title"
                      placeholder="Write a descriptive title"
                      value={formData.title}
                      onChange={(e) => handleChange("title", e.target.value)}
                      required
                      className="border-input/50 focus-visible:ring-primary/40 text-xs sm:text-sm h-8 sm:h-10"
                    />
                  </div>

                  <div>
                    <div className="flex items-center gap-1 sm:gap-2 mb-1 sm:mb-1.5">
                      <Label
                        htmlFor="content"
                        className="text-xs sm:text-sm font-medium flex items-center gap-1"
                      >
                        <Info className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                        Content
                      </Label>
                      <span className="text-[10px] sm:text-xs text-red-500">
                        *
                      </span>
                    </div>
                    <Textarea
                      id="content"
                      placeholder="What's on your mind?"
                      value={formData.content}
                      onChange={(e) => handleChange("content", e.target.value)}
                      required
                      className="min-h-[100px] sm:min-h-[120px] border-input/50 focus-visible:ring-primary/40 resize-none text-xs sm:text-sm"
                    />
                  </div>

                  <div className="grid grid-cols-1 gap-3 sm:gap-4 md:gap-6">
                    <div>
                      <div className="flex items-center gap-1 sm:gap-2 mb-1 sm:mb-1.5">
                        <Label
                          htmlFor="kategori"
                          className="text-xs sm:text-sm font-medium flex items-center gap-1"
                        >
                          <Hash className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                          Category
                        </Label>
                        <span className="text-[10px] sm:text-xs text-red-500">
                          *
                        </span>
                      </div>
                      <Select
                        value={formData.kategori}
                        onValueChange={(value) =>
                          handleChange("kategori", value)
                        }
                      >
                        <SelectTrigger
                          id="kategori"
                          className="border-input/50 focus-visible:ring-primary/40 w-full h-8 sm:h-10 text-xs sm:text-sm"
                        >
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem
                            value="TUGAS"
                            className="text-xs sm:text-sm"
                          >
                            <div className="flex items-center gap-2">
                              <Badge
                                className={cn(
                                  "text-[10px] sm:text-xs px-1.5 sm:px-2 py-0 sm:py-0.5",
                                  getCategoryColor("TUGAS")
                                )}
                              >
                                TUGAS
                              </Badge>
                              <span className="text-[10px] sm:text-xs text-muted-foreground">
                                Assignments & study material
                              </span>
                            </div>
                          </SelectItem>
                          <SelectItem
                            value="CURHAT"
                            className="text-xs sm:text-sm"
                          >
                            <div className="flex items-center gap-2">
                              <Badge
                                className={cn(
                                  "text-[10px] sm:text-xs px-1.5 sm:px-2 py-0 sm:py-0.5",
                                  getCategoryColor("CURHAT")
                                )}
                              >
                                CURHAT
                              </Badge>
                              <span className="text-[10px] sm:text-xs text-muted-foreground">
                                Share your feelings
                              </span>
                            </div>
                          </SelectItem>
                          <SelectItem
                            value="MEME"
                            className="text-xs sm:text-sm"
                          >
                            <div className="flex items-center gap-2">
                              <Badge
                                className={cn(
                                  "text-[10px] sm:text-xs px-1.5 sm:px-2 py-0 sm:py-0.5",
                                  getCategoryColor("MEME")
                                )}
                              >
                                MEME
                              </Badge>
                              <span className="text-[10px] sm:text-xs text-muted-foreground">
                                Fun and entertainment
                              </span>
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <div className="flex items-center gap-1 sm:gap-2 mb-1 sm:mb-1.5">
                        <Label
                          htmlFor="fakultas"
                          className="text-xs sm:text-sm font-medium flex items-center gap-1"
                        >
                          <Building2 className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                          Faculty
                        </Label>
                        <span className="text-[10px] sm:text-xs text-red-500">
                          *
                        </span>
                      </div>
                      <Select
                        value={formData.fakultas}
                        onValueChange={(value) =>
                          handleChange("fakultas", value)
                        }
                      >
                        <SelectTrigger
                          id="fakultas"
                          className="border-input/50 focus-visible:ring-primary/40 w-full h-8 sm:h-10 text-xs sm:text-sm"
                        >
                          <SelectValue placeholder="Select your faculty" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem
                            value="Fakultas Ilmu Komputer"
                            className="text-xs sm:text-sm"
                          >
                            <div className="flex items-center">
                              <BookOpen className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2 text-blue-500" />
                              Fakultas Ilmu Komputer
                            </div>
                          </SelectItem>
                          <SelectItem
                            value="Fakultas Matematika dan Ilmu Pengetahuan Alam"
                            className="text-xs sm:text-sm"
                          >
                            <div className="flex items-center">
                              <BookOpen className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2 text-green-500" />
                              FMIPA
                            </div>
                          </SelectItem>
                          <SelectItem
                            value="Fakultas Teknik"
                            className="text-xs sm:text-sm"
                          >
                            <div className="flex items-center">
                              <BookOpen className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2 text-amber-500" />
                              Fakultas Teknik
                            </div>
                          </SelectItem>
                          <SelectItem
                            value="Fakultas Ekonomi dan Bisnis"
                            className="text-xs sm:text-sm"
                          >
                            <div className="flex items-center">
                              <BookOpen className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2 text-purple-500" />
                              Fakultas Ekonomi dan Bisnis
                            </div>
                          </SelectItem>
                          <SelectItem
                            value="Fakultas Ilmu Budaya"
                            className="text-xs sm:text-sm"
                          >
                            <div className="flex items-center">
                              <BookOpen className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2 text-red-500" />
                              Fakultas Ilmu Budaya
                            </div>
                          </SelectItem>
                          <SelectItem
                            value="Fakultas Hukum"
                            className="text-xs sm:text-sm"
                          >
                            <div className="flex items-center">
                              <BookOpen className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2 text-indigo-500" />
                              Fakultas Hukum
                            </div>
                          </SelectItem>
                          <SelectItem
                            value="Fakultas Ilmu Sosial dan Politik"
                            className="text-xs sm:text-sm"
                          >
                            <div className="flex items-center">
                              <BookOpen className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2 text-cyan-500" />
                              Fakultas Ilmu Sosial dan Politik
                            </div>
                          </SelectItem>
                          <SelectItem
                            value="Fakultas Psikologi"
                            className="text-xs sm:text-sm"
                          >
                            <div className="flex items-center">
                              <BookOpen className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2 text-pink-500" />
                              Fakultas Psikologi
                            </div>
                          </SelectItem>
                          <SelectItem
                            value="Fakultas Kesehatan Masyarakat"
                            className="text-xs sm:text-sm"
                          >
                            <div className="flex items-center">
                              <BookOpen className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2 text-teal-500" />
                              Fakultas Kesehatan Masyarakat
                            </div>
                          </SelectItem>
                          <SelectItem
                            value="Fakultas Kedokteran"
                            className="text-xs sm:text-sm"
                          >
                            <div className="flex items-center">
                              <BookOpen className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2 text-blue-500" />
                              Fakultas Kedokteran
                            </div>
                          </SelectItem>
                          <SelectItem
                            value="Fakultas Kedokteran Gigi"
                            className="text-xs sm:text-sm"
                          >
                            <div className="flex items-center">
                              <BookOpen className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2 text-emerald-500" />
                              Fakultas Kedokteran Gigi
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center gap-1 sm:gap-2 mb-1 sm:mb-1.5">
                      <Label
                        htmlFor="image"
                        className="text-xs sm:text-sm font-medium flex items-center gap-1"
                      >
                        <Image className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                        Image
                      </Label>
                      <span className="text-[10px] sm:text-xs text-muted-foreground">
                        (optional)
                      </span>
                    </div>
                    <div className="grid gap-1 sm:gap-1.5">
                      <input
                        ref={fileInputRef}
                        id="image"
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={handleFileChange}
                      />
                      <Button
                        type="button"
                        variant="outline"
                        className="h-16 sm:h-20 border-dashed border-2 justify-center flex-col gap-1 sm:gap-2 hover:bg-muted/50 border-input/50 w-full"
                        onClick={() => fileInputRef.current?.click()}
                      >
                        <Image className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground" />
                        <span className="text-[10px] sm:text-xs text-muted-foreground">
                          Click to upload an image
                        </span>
                      </Button>
                    </div>

                    {imagePreview && (
                      <div className="relative mt-2 sm:mt-3 rounded-md overflow-hidden border border-border">
                        <Button
                          type="button"
                          size="icon"
                          variant="destructive"
                          className="h-5 w-5 sm:h-6 sm:w-6 absolute top-1 sm:top-2 right-1 sm:right-2 rounded-full opacity-90 hover:opacity-100"
                          onClick={removeImage}
                        >
                          <X className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                        </Button>
                        <img
                          src={imagePreview}
                          alt="Preview"
                          className="w-full h-auto max-h-[150px] sm:max-h-[200px] object-cover"
                        />
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2 bg-blue-50 rounded-lg">
                    <Info className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-blue-600 flex-shrink-0" />
                    <p className="text-blue-700 text-[10px] sm:text-xs">
                      Your post will be visible to all students once published.
                    </p>
                  </div>
                </form>
              </div>

              <div className="sticky bottom-0 z-10 bg-background border-t px-4 sm:px-6 py-3 sm:py-4 rounded-b-xl">
                <AlertDialogFooter className="flex flex-col sm:flex-row gap-2 pt-0 sm:space-x-2">
                  <AlertDialogCancel
                    type="button"
                    onClick={() => onOpenChange(false)}
                    className="sm:w-auto w-full mt-0 h-8 sm:h-10 text-xs sm:text-sm"
                  >
                    Cancel
                  </AlertDialogCancel>
                  <Button
                    type="submit"
                    onClick={handleSubmit}
                    disabled={isCreating}
                    className="sm:w-auto w-full bg-primary hover:bg-primary/90 h-8 sm:h-10 text-xs sm:text-sm"
                  >
                    {isCreating ? (
                      <>
                        <Loader2 className="mr-1.5 sm:mr-2 h-3.5 w-3.5 sm:h-4 sm:w-4 animate-spin" />
                        Creating...
                      </>
                    ) : (
                      <>
                        <PenLine className="mr-1.5 sm:mr-2 h-3.5 w-3.5 sm:h-4 sm:w-4" />
                        Create post
                      </>
                    )}
                  </Button>
                </AlertDialogFooter>
              </div>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </CardContent>
    </Card>
  );
};

export default CreatePostForm;
