import { Skeleton } from "@/components/ui/skeleton";

const PharmacyCardSkeleton = () => (
  <div className="bg-card rounded-2xl border border-border overflow-hidden">
    <Skeleton className="h-48 w-full" />
    <div className="p-5 space-y-3">
      <div className="flex items-start justify-between gap-2">
        <Skeleton className="h-6 w-2/3" />
        <Skeleton className="h-5 w-16" />
      </div>
      <Skeleton className="h-4 w-full" />
      <div className="flex items-center justify-between pt-2">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-5 w-20" />
      </div>
      <div className="pt-4 border-t border-border flex items-center justify-between">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-5 w-5 rounded-full" />
      </div>
    </div>
  </div>
);

export default PharmacyCardSkeleton;
