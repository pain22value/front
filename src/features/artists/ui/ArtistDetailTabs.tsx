"use client";

import { useArtistDetail } from "../hooks/useArtist";
import ArtistSectionSkeleton from "./ArtistSectionSkeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ArtistNotice from "./ArtistNotice";
import ArtistShowList from "./ArtistShowList";
import { NOTICE_LIST } from "@/shared/constants/notices";
import ArtistPostsTab from "./ArtistPostsTab";

export default function ArtistDetailTabs({ artistId }: { artistId: string }) {
  const { data, isLoading } = useArtistDetail(artistId);

  if (isLoading) return <ArtistSectionSkeleton />;
  if (!data) return null;

  const { notices, currentShows, pastShows } = data;

  // 기존 Show 타입과 맞추기 위해 title을 showTitle로 매핑
  const mappedCurrentShows = currentShows.map((show) => ({ ...show, showTitle: show.title }));
  const mappedPastShows = pastShows.shows.map((show) => ({ ...show, showTitle: show.title }));

  const tabs = [
    {
      value: "intro",
      label: "아티스트 소개",
      content: (
        <div className="space-y-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <ArtistNotice notices={notices.length > 0 ? notices.map((n) => n.content) : NOTICE_LIST} />
          </div>
          <ArtistShowList
            artistId={artistId}
            nowShows={mappedCurrentShows}
            pastShows={mappedPastShows}
            isNowLoading={isLoading}
            isPastLoading={isLoading}
            hasMorePast={pastShows.hasMore}
          />
        </div>
      ),
    },
    {
      value: "posts",
      label: "아티스트 포스트",
      content: <ArtistPostsTab artistId={artistId} />,
    },
  ];

  return (
    <Tabs defaultValue="intro" className="w-full">
      <div className="w-full border-b mb-8">
        <TabsList variant="line" className="px-0 gap-0">
          {tabs.map((tab) => (
            <TabsTrigger key={tab.value} value={tab.value}>
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </div>

      {tabs.map((tab) => (
        <TabsContent key={tab.value} value={tab.value}>
          {tab.content}
        </TabsContent>
      ))}
    </Tabs>
  );
}
