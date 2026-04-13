"use client";

import ShowCardList from "@/features/show/ui/ShowCardList";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

export default function ArtistShowList({
  artistId,
  isLoading,
  data,
  pastShowsData,
}: {
  artistId: string | number;
  isLoading: boolean;
  data: ArtistDetail;
  pastShowsData?: ArtistPastShowsResponse;
}) {
  const { currentShows, pastShows, artist } = data;

  // 쿼리로 받아온 데이터가 있다면 우선적으로 사용하고, 없으면 detail API의 기존 응답 폴백 사용
  const pastShowsContent = pastShowsData ? pastShowsData.content : pastShows.shows;
  const hasMorePastShows = pastShowsData ? pastShowsData.hasNext : pastShows.hasMore;

  // 기존 Show 타입과 맞추기 위해 title을 showTitle로 매핑
  const mappedCurrentShows: ArtistShow[] = currentShows?.map((show) => ({ ...show, showTitle: show.title })) || [];
  const mappedPastShows: ArtistShow[] = pastShowsContent?.map((show) => ({ ...show, showTitle: show.title })) || [];

  return (
    <section className="space-y-16 pt-8">
      <section>
        <div className="space-y-2 mb-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold tracking-tight">현재 상영중인 작품</h2>
          <Link
            href={`/search?query=${encodeURIComponent(artist?.artistName || "")}`}
            className="gap-1 text-muted-foreground flex items-center hover:text-white transition-colors"
          >
            더보기 <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
        <ShowCardList shows={mappedCurrentShows} isLoading={isLoading} />
      </section>
      <section>
        <div className="space-y-2 mb-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold tracking-tight">지난 출연 작품</h2>
          {hasMorePastShows && (
            <Link
              href={`/artists/${artistId}/past-shows`}
              className="gap-1 text-muted-foreground flex items-center hover:text-white transition-colors"
            >
              더보기 <ChevronRight className="h-4 w-4" />
            </Link>
          )}
        </div>
        <ShowCardList shows={mappedPastShows} isLoading={isLoading} />
      </section>
    </section>
  );
}
