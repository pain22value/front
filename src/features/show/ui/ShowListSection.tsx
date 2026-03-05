"use client";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import ShowCard from "@/features/show/ui/now/ShowCard";
import { useShows } from "../hooks/useShows";
import { Skeleton } from "@/components/ui/skeleton";

export default function ShowListSection({ title }: { title: string }) {
  const { data: shows, isLoading } = useShows("now");

  return (
    <section className="max-w-[1200] mx-auto px-2 sm:px-4 md:px-8 space-y-6 mt-8">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">{title}</h2>
      </div>

      {/* 상단 필터 */}
      <div className="flex gap-4">
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="정렬 순서" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="latest">최신순</SelectItem>
            <SelectItem value="popular">인기순</SelectItem>
          </SelectContent>
        </Select>

        <Select>
          <SelectTrigger>
            <SelectValue placeholder="지역 선택" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="seoul">서울</SelectItem>
            <SelectItem value="busan">부산</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {isLoading ? (
        <ShowListSkeleton />
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {shows?.map((item) => (
            <ShowCard {...item} key={item.id} />
          ))}
        </div>
      )}
    </section>
  );
}

const ShowListSkeleton = () => (
  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
    {[...Array(10)].map((_, i) => (
      <div key={i} className="space-y-2">
        <Skeleton className="aspect-[3/4] w-full" />
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
      </div>
    ))}
  </div>
);
