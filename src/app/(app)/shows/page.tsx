"use client";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import ShowCardList from "@/features/show/ui/ShowCardList";
import { useShows } from "@/features/show/hooks/useShows";

export default function ShowListPage() {
  const { data: shows, isLoading } = useShows("all");

  return (
    <section className="pl-20">
      <section className="max-w-[1200] mx-auto px-2 sm:px-4 md:px-8 space-y-6 mt-8">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">전체 공연 목록</h1>
        </div>

        <div className="flex gap-4">
          <Select>
            <SelectTrigger className="w-[140px] bg-white text-black border-none">
              <SelectValue placeholder="정렬 순서" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="latest">최신순</SelectItem>
              <SelectItem value="popular">인기순</SelectItem>
            </SelectContent>
          </Select>

          <Select>
            <SelectTrigger className="w-[140px] bg-white text-black border-none">
              <SelectValue placeholder="지역 선택" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="seoul">서울</SelectItem>
              <SelectItem value="busan">부산</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <ShowCardList shows={shows} isLoading={isLoading} />
      </section>
    </section>
  );
}
