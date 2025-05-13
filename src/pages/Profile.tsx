import { JSX, useEffect, useState } from "react";
import { useProfile } from "@/hooks/use-profile";
import ProfileHeader from "@/components/profile/ProfileHeader";
import ProfileForm from "@/components/profile/ProfileForm";
import ProfileAlert from "@/components/profile/ProfileAlert";
import { Info, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Toaster } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProfileSkeleton from "@/components/profile/ProfileSkeleton";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import UserPostCard from "@/components/profile/UserPostCard";
import EditPostDialog from "@/components/profile/EditPostDialog";
import DeletePostDialog from "@/components/profile/DeletePostDialog";
import { UpdatePostRequest } from "@/types/post.types";
import { Post } from "@/types/auth.types";

const Profile = (): JSX.Element => {
  const {
    profile,
    posts,
    isLoading,
    error,
    updateProfile,
    isUpdating,
    updateAvatar,
    isAvatarUploading,
    updatePost,
    isUpdatingPost,
    deletePost,
    isDeletingPost,
  } = useProfile();

  const [alertOpen, setAlertOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [deletingPost, setDeletingPost] = useState<Post | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  useEffect(() => {
    if (profile) {
      const isIncomplete =
        profile.fakultas === "Not specified" || !profile.avatar;
      if (isIncomplete) {
        setAlertOpen(true);
      }
    }
  }, [profile]);

  if (isLoading) {
    return <ProfileSkeleton />;
  }

  if (error || !profile) {
    return (
      <div className="container max-w-6xl mx-auto px-4 py-8">
        <Alert variant="destructive" className="mb-6">
          <Info className="h-4 w-4" />
          <AlertDescription>
            Failed to load profile. Please try again later.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  const handleAvatarChange = async (file: File) => {
    await updateAvatar(file);
  };

  const handleEditPost = (postId: string) => {
    const postToEdit = posts.find((post) => post.id === postId);
    if (postToEdit) {
      setEditingPost(postToEdit);
      setIsEditDialogOpen(true);
    }
  };

  const handleDeletePost = (postId: string) => {
    const postToDelete = posts.find((post) => post.id === postId);
    if (postToDelete) {
      setDeletingPost(postToDelete);
      setIsDeleteDialogOpen(true);
    }
  };

  const handleUpdatePost = (postId: string, data: UpdatePostRequest) => {
    updatePost({ postId, data });
    setIsEditDialogOpen(false);
  };

  const handleConfirmDelete = (postId: string) => {
    deletePost(postId);
    setIsDeleteDialogOpen(false);
  };

  return (
    <>
      <ScrollArea className="h-[calc(100vh-4rem)]">
        <div className="container max-w-6xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 gap-8">
            <ProfileHeader
              user={profile}
              onAvatarChange={handleAvatarChange}
              isUploading={isAvatarUploading}
            />

            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto mb-8">
                <TabsTrigger value="profile">Profile</TabsTrigger>
                <TabsTrigger value="posts">Posts</TabsTrigger>
              </TabsList>

              <TabsContent
                value="profile"
                className="space-y-8 animate-in fade-in-50"
              >
                <ProfileForm
                  user={profile}
                  onSubmit={updateProfile}
                  isSubmitting={isUpdating}
                />
              </TabsContent>

              <TabsContent
                value="posts"
                className="space-y-8 animate-in fade-in-50"
              >
                <Card>
                  <CardHeader>
                    <CardTitle>My Posts</CardTitle>
                    <CardDescription>
                      View and manage your posts
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {posts && posts.length > 0 ? (
                      <div className="space-y-6">
                        {posts.map((post) => (
                          <UserPostCard
                            key={post.id}
                            post={post}
                            onEdit={handleEditPost}
                            onDelete={handleDeletePost}
                          />
                        ))}
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center text-center py-12">
                        <AlertCircle className="h-10 w-10 text-muted-foreground/50 mb-4" />
                        <p className="text-muted-foreground font-medium">
                          You haven't created any posts yet
                        </p>
                        <p className="text-sm text-muted-foreground/70 mt-1 max-w-sm">
                          Share your knowledge, ask questions, or start a
                          discussion with your peers
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </ScrollArea>

      <ProfileAlert
        user={profile}
        open={alertOpen}
        onOpenChange={setAlertOpen}
        onAction={() => {
          setActiveTab("profile");
          setAlertOpen(false);
          setTimeout(() => {
            document.getElementById("fakultas")?.scrollIntoView({
              behavior: "smooth",
              block: "center",
            });
          }, 100);
        }}
      />

      {editingPost && (
        <EditPostDialog
          post={editingPost}
          isOpen={isEditDialogOpen}
          onClose={() => setIsEditDialogOpen(false)}
          onUpdate={handleUpdatePost}
          isUpdating={isUpdatingPost}
        />
      )}

      {deletingPost && (
        <DeletePostDialog
          postId={deletingPost.id}
          postTitle={deletingPost.title}
          isOpen={isDeleteDialogOpen}
          onClose={() => setIsDeleteDialogOpen(false)}
          onDelete={handleConfirmDelete}
          isDeleting={isDeletingPost}
        />
      )}

      <Toaster position="top-right" richColors />
    </>
  );
};

export default Profile;
