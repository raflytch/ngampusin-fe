import { User } from "@/types/auth.types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Camera, Mail, GraduationCap } from "lucide-react";
import { useState, useRef } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface ProfileHeaderProps {
  user: User;
  onAvatarChange: (file: File) => Promise<void>;
  isUploading: boolean;
}

const ProfileHeader = ({
  user,
  onAvatarChange,
  isUploading,
}: ProfileHeaderProps) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
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

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setPreviewUrl(reader.result as string);
    };
    reader.readAsDataURL(file);

    await onAvatarChange(file);
    setPreviewUrl(null);
  };

  return (
    <Card className="bg-white overflow-hidden shadow-md border-border/30 ">
      <div className="relative bg-white p-8">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="relative group">
            <Avatar className="h-32 w-32 border-4 border-white shadow-xl bg-white">
              <AvatarImage
                src={previewUrl || user.avatar}
                alt={user.name}
                className="object-cover"
              />
              <AvatarFallback className="text-3xl bg-primary/10 text-primary font-semibold">
                {getInitials(user.name)}
              </AvatarFallback>
            </Avatar>
            <Button
              onClick={handleAvatarClick}
              variant="secondary"
              size="icon"
              className="absolute bottom-1 right-1 h-8 w-8 rounded-full opacity-90 shadow-md border border-white"
              disabled={isUploading}
            >
              {isUploading ? (
                <div className="animate-spin">
                  <Camera className="h-4 w-4" />
                </div>
              ) : (
                <Camera className="h-4 w-4" />
              )}
            </Button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
              accept="image/*"
            />
          </div>

          <div className="text-center md:text-left flex-1">
            <h1 className="text-3xl font-bold tracking-tight">{user.name}</h1>

            <div className="mt-3 flex flex-wrap gap-2 justify-center md:justify-start">
              <Badge variant="secondary" className="font-medium px-2 py-1">
                {user.role}
              </Badge>
              {user.fakultas !== "Not specified" && (
                <Badge variant="outline" className="font-medium px-2 py-1">
                  Student
                </Badge>
              )}
            </div>

            <Separator className="my-4" />

            <div className="flex flex-col md:flex-row gap-5 text-muted-foreground items-center md:items-start">
              <div className="flex items-center">
                <Mail className="h-4 w-4 mr-2 flex-shrink-0 text-primary" />
                <span>{user.email}</span>
              </div>
              <div className="flex items-center">
                <GraduationCap className="h-4 w-4 mr-2 flex-shrink-0 text-primary" />
                <span>
                  {user.fakultas === "Not specified"
                    ? "No Faculty"
                    : user.fakultas}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ProfileHeader;
