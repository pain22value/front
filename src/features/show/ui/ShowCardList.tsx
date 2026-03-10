"use client";

import ShowCard from "./now/ShowCard";
import { Skeleton } from "@/components/ui/skeleton";

export default function ShowCardList({ shows, isLoading }: { shows?: Show[]; isLoading?: boolean }) {
  if (isLoading) {
    return <ShowListSkeleton />;
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
      {shows?.map((item) => (
        <ShowCard {...item} key={item.id} />
      ))}
    </div>
  );
}

const ShowListSkeleton = () => (
  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
    {[...Array(10)].map((_, i) => (
      <div key={i} className="space-y-2">
        <Skeleton className="aspect-3/4 w-full rounded-xl" />
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-4 w-1/3" />
      </div>
    ))}
  </div>
);
