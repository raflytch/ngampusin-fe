import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { User } from "@/types/auth.types";
import { AlertCircle } from "lucide-react";

interface ProfileAlertProps {
  user: User;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAction: () => void;
}

const ProfileAlert = ({
  user,
  open,
  onOpenChange,
  onAction,
}: ProfileAlertProps) => {
  const isIncomplete = user.fakultas === "Not specified" || !user.avatar;

  if (!isIncomplete) return null;

  const missingInfo = [];
  if (user.fakultas === "Not specified")
    missingInfo.push("faculty information");
  if (!user.avatar) missingInfo.push("profile picture");

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="max-w-md">
        <AlertDialogHeader>
          <div className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-amber-500" />
            <AlertDialogTitle>Complete Your Profile</AlertDialogTitle>
          </div>
          <AlertDialogDescription className="pt-2">
            Your profile is missing {missingInfo.join(" and ")}. Complete your
            profile to enhance your experience on ngampus.in.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="gap-2">
          <AlertDialogCancel className="mt-0">Maybe Later</AlertDialogCancel>
          <AlertDialogAction
            onClick={onAction}
            className="bg-primary hover:bg-primary/90"
          >
            Complete Profile
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ProfileAlert;
