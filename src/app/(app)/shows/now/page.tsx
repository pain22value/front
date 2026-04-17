"use client";

import { useState } from "react";
import { useShows } from "@/features/show/hooks/useShows";
import ShowCardList from "@/features/show/ui/ShowCardList";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Pagination from "@/shared/ui/Pagination";

export default function ShowNowPage() {
  const [order, setOrder] = useState<ShowsOrder>("DAILY_BOOKING");
  const [region, setRegion] = useState<ShowsRegion>("ALL");
  const [page, setPage] = useState(1);
  const size = 12;

  const { data: showsData, isLoading } = useShows(
    {
      order,
      region,
      page,
      size,
    },
    "now",
  );

  const shows = showsData?.shows || [];
  const totalPages = showsData?.page?.totalPages || 1;

  const handleOrderChange = (value: string) => {
    setOrder(value as ShowsOrder);
    setPage(1);
  };

  const handleRegionChange = (value: string) => {
    setRegion(value as ShowsRegion);
    setPage(1);
  };

  return (
    <main className="show-now-page">
      <section>
        <div className="flex flex-col gap-6">
          <h2 className="text-2xl font-bold">지금 예매 가능</h2>

          <div className="flex gap-3">
            <Select value={order} onValueChange={handleOrderChange}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="정렬 순서" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="DAILY_BOOKING">일간 예매순</SelectItem>
                <SelectItem value="WEEKLY_BOOKING">주간 예매순</SelectItem>
                <SelectItem value="ENDING_SOON">종료 임박 순</SelectItem>
                <SelectItem value="MOST_REVIEWED">리뷰 많은 순</SelectItem>
              </SelectContent>
            </Select>

            <Select value={region} onValueChange={handleRegionChange}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="지역 선택" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ALL">전체 지역</SelectItem>
                <SelectItem value="SEOUL">서울</SelectItem>
                <SelectItem value="GYEONGGI">경기</SelectItem>
                <SelectItem value="GANGWON">강원</SelectItem>
                <SelectItem value="CHUNGCHEONG">충청</SelectItem>
                <SelectItem value="JEOLLA">전라</SelectItem>
                <SelectItem value="GYEONGSANG">경상</SelectItem>
                <SelectItem value="JEJU">제주</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <ShowCardList shows={shows} isLoading={isLoading} />

        <div className="mt-8">
          <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} isLoading={isLoading} />
        </div>
      </section>
    </main>
  );
}
