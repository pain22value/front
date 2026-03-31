"use client";

import ShowCardList from "@/features/show/ui/ShowCardList";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

export default function ArtistShowList({
  artistId,
  nowShows,
  isNowLoading,
  pastShows,
  isPastLoading,
  hasMorePast,
}: {
  artistId: string | number;
  nowShows?: Show[];
  isNowLoading: boolean;
  pastShows?: Show[];
  isPastLoading: boolean;
  hasMorePast?: boolean;
}) {
  return (
    <section className="space-y-16 pt-8">
      <section>
        <div className="space-y-2 mb-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold tracking-tight">현재 상영중인 작품</h2>
          <Link href={`#`} className="gap-1 text-muted-foreground flex items-center">
            더보기 <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
        <ShowCardList shows={nowShows} isLoading={isNowLoading} />
      </section>
      <section>
        <div className="space-y-2 mb-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold tracking-tight">지난 출연 작품</h2>
          {hasMorePast && (
            <Link
              href={`/artists/${artistId}/past-shows`}
              className="gap-1 text-muted-foreground flex items-center hover:text-white transition-colors"
            >
              더보기 <ChevronRight className="h-4 w-4" />
            </Link>
          )}
        </div>
        <ShowCardList shows={pastShows} isLoading={isPastLoading} />
      </section>
    </section>
  );
}
