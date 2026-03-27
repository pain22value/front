"use client";

import ArtistLiveChatSection from "./ArtistLiveChatSection";
import ArtistSectionSkeleton from "./ArtistSectionSkeleton";
import ArtistShowListSection from "./ArtistShowListSection";
import ArtistNoticeSection from "./ArtistNoticeSection";
import ArtistHeroSection from "./ArtistHeroSection";
import { useArtistDetail } from "../hooks/useArtist";
import { NOTICE_LIST } from "@/shared/constants/notices";

export default function ArtistSection({ artistId }: { artistId: string }) {
  const { data, isLoading } = useArtistDetail(artistId);

  if (isLoading) return <ArtistSectionSkeleton />;
  if (!data) return null;

  const { artist, membership, notices, currentShows, pastShows } = data;
  console.log({ data });

  // 기존 Show 타입과 맞추기 위해 title을 showTitle로 매핑
  const mappedCurrentShows = currentShows.map((show) => ({ ...show, showTitle: show.title }));
  const mappedPastShows = pastShows.shows.map((show) => ({ ...show, showTitle: show.title }));

  return (
    <section>
      <ArtistHeroSection artist={artist} />
      <section className="pl-20">
        <section className="max-w-[1200] mx-auto px-4 py-8 space-y-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <ArtistNoticeSection notices={notices.length > 0 ? notices.map((n) => n.content) : NOTICE_LIST} />
            <ArtistLiveChatSection />
          </div>
          <ArtistShowListSection
            artistId={artistId}
            nowShows={mappedCurrentShows}
            pastShows={mappedPastShows}
            isNowLoading={isLoading}
            isPastLoading={isLoading}
            hasMorePast={pastShows.hasMore}
          />
        </section>
      </section>
    </section>
  );
}
