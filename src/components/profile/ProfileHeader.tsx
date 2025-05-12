import { User } from "@/types/auth.types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Camera, Mail, GraduationCap } from "lucide-react";
import { useState, useRef } from "react";
import { Badge } from "@/components/ui/badge";

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
    <div className="relative bg-gradient-to-r from-blue-600 to-purple-700 rounded-xl overflow-hidden shadow-xl">
      <div className="absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(0deg,#fff1,transparent)]"></div>

      <div className="relative p-8">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="relative group">
            <Avatar className="h-28 w-28 ring-4 ring-white/30 shadow-xl">
              <AvatarImage
                src={previewUrl || user.avatar}
                alt={user.name}
                className="object-cover"
              />
              <AvatarFallback className="text-2xl bg-primary/10 text-primary font-semibold">
                {getInitials(user.name)}
              </AvatarFallback>
            </Avatar>
            <button
              onClick={handleAvatarClick}
              className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity rounded-full"
              disabled={isUploading}
            >
              {isUploading ? (
                <div className="animate-spin">
                  <Camera className="h-8 w-8 text-white" />
                </div>
              ) : (
                <Camera className="h-8 w-8 text-white" />
              )}
            </button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
              accept="image/*"
            />
          </div>

          <div className="text-center md:text-left text-white flex-1">
            <h1 className="text-3xl font-bold tracking-tight">{user.name}</h1>
            <div className="mt-2 flex flex-col md:flex-row gap-y-2 gap-x-6 text-white/80 items-center md:items-start">
              <div className="flex items-center">
                <Mail className="h-4 w-4 mr-2 flex-shrink-0" />
                <span className="text-sm">{user.email}</span>
              </div>
              <div className="flex items-center">
                <GraduationCap className="h-4 w-4 mr-2 flex-shrink-0" />
                <span className="text-sm">
                  {user.fakultas === "Not specified"
                    ? "No Faculty"
                    : user.fakultas}
                </span>
              </div>
            </div>

            <div className="mt-5 flex flex-wrap gap-2 justify-center md:justify-start">
              <Badge
                variant="secondary"
                className="bg-white/20 hover:bg-white/30 text-white border-transparent"
              >
                {user.role}
              </Badge>
              {user.fakultas !== "Not specified" && (
                <Badge
                  variant="secondary"
                  className="bg-white/20 hover:bg-white/30 text-white border-transparent"
                >
                  Student
                </Badge>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
