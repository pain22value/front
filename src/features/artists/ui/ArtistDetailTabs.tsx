"use client";

import { useArtistDetail } from "../hooks/useArtist";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ArtistNotice from "./ArtistNotice";
import ArtistShowList from "./ArtistShowList";
import { NOTICE_LIST } from "@/shared/constants/notices";
import ArtistPostsTab from "./post/ArtistPostsTab";
import { Skeleton } from "@/components/ui/skeleton";

export default function ArtistDetailTabs({ artistId }: { artistId: string }) {
  const { data, isLoading } = useArtistDetail(artistId);

  if (isLoading) return <ArtistDetailSkeleton />;
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

function ArtistDetailSkeleton() {
  return (
    <div className="w-full">
      {/* 탭 리스트 스켈레톤 */}
      <div className="w-full border-b mb-8">
        <div className="flex gap-10">
          <Skeleton className="h-10 w-32" />
          <Skeleton className="h-10 w-32" />
        </div>
      </div>

      <div className="space-y-12">
        {/* 공지사항 스켈레톤 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 h-64 rounded-2xl border border-muted bg-muted/5 p-6 space-y-4">
            <Skeleton className="h-8 w-32" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-4/5" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          </div>
        </div>

        {/* 작품 리스트 스켈레톤 */}
        <div className="space-y-16 pt-8">
          {[1, 2].map((section) => (
            <section key={section}>
              <div className="mb-4 flex items-center justify-between">
                <Skeleton className="h-8 w-48" />
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="space-y-3">
                    <Skeleton className="aspect-3/4 w-full rounded-2xl" />
                    <Skeleton className="h-5 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
