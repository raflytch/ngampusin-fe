import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const ProfileSkeleton = () => {
  return (
    <div className="container max-w-6xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 gap-8">
        <div className="relative bg-gradient-to-r from-blue-500/40 to-purple-600/40 rounded-lg p-8 mb-6 animate-pulse">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <Skeleton className="h-24 w-24 rounded-full" />
            <div className="space-y-3">
              <Skeleton className="h-6 w-48" />
              <Skeleton className="h-4 w-64" />
              <Skeleton className="h-6 w-32" />
            </div>
          </div>
        </div>

        <Card>
          <CardHeader className="space-y-2">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-4 w-full max-w-md" />
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-10 w-full" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-10 w-full" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-10 w-full" />
            </div>
            <Skeleton className="h-10 w-32" />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProfileSkeleton;
