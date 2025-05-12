import { JSX, useEffect, useState } from "react";
import { useProfile } from "@/hooks/use-profile";
import ProfileHeader from "@/components/profile/ProfileHeader";
import ProfileForm from "@/components/profile/ProfileForm";
import ProfileAlert from "@/components/profile/ProfileAlert";
import { Info } from "lucide-react";
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

const Profile = (): JSX.Element => {
  const {
    profile,
    isLoading,
    error,
    updateProfile,
    isUpdating,
    updateAvatar,
    isAvatarUploading,
  } = useProfile();

  const [alertOpen, setAlertOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");

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
                    <div className="text-center py-12 text-muted-foreground">
                      <p>You haven't created any posts yet.</p>
                    </div>
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

      <Toaster position="top-right" richColors />
    </>
  );
};

export default Profile;
