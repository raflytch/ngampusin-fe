import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const PostSkeleton = () => {
  return (
    <Card className="mb-4">
      <CardHeader className="flex flex-row items-center gap-2 sm:gap-3 pb-2 p-3 sm:p-4">
        <Skeleton className="h-8 w-8 sm:h-10 sm:w-10 rounded-full" />
        <div className="flex flex-col gap-1 sm:gap-2 flex-1">
          <Skeleton className="h-3 sm:h-4 w-[120px] sm:w-[150px]" />
          <Skeleton className="h-2 sm:h-3 w-[80px] sm:w-[100px]" />
        </div>
        <Skeleton className="h-4 sm:h-5 w-16 sm:w-20 ml-auto" />
      </CardHeader>
      <CardContent className="px-3 sm:px-6 pb-2 sm:pb-3">
        <Skeleton className="h-5 sm:h-6 w-3/4 mb-1 sm:mb-2" />
        <Skeleton className="h-3 sm:h-4 w-full mb-1 sm:mb-2" />
        <Skeleton className="h-3 sm:h-4 w-full mb-1 sm:mb-2" />
        <Skeleton className="h-3 sm:h-4 w-2/3" />
        <Skeleton className="h-[150px] sm:h-[200px] w-full mt-2 sm:mt-3 rounded-md" />
      </CardContent>
      <CardFooter className="pt-0 flex justify-between border-t border-gray-100 px-2 sm:px-4 py-1 sm:py-2">
        <Skeleton className="h-6 sm:h-8 w-12 sm:w-16" />
        <Skeleton className="h-6 sm:h-8 w-12 sm:w-16" />
        <Skeleton className="h-6 sm:h-8 w-12 sm:w-16" />
      </CardFooter>
    </Card>
  );
};

export default PostSkeleton;
