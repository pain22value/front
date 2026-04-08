"use client";

import { useRef } from "react";
import ArtistPostCard from "./ArtistPostCard";
import MusicalPostDetail from "../MusicalPostDetail";
import useArtistPostAnimation from "../../hooks/useArtistPostAnimation";
import { useArtistPosts } from "../../hooks/useArtistPostQuery";
import { Skeleton } from "@/components/ui/skeleton";
import { useArtistStore } from "../../stores/useArtistStore";

export default function ArtistPostsTab({ artistId }: { artistId: string }) {
  const { selectedPostId, selectPost, clearPost } = useArtistStore();

  const detailRef = useRef<HTMLDivElement>(null);
  const { activePostId } = useArtistPostAnimation({ selectedPostId, detailRef });

  const { data: posts, isLoading } = useArtistPosts(artistId);

  if (isLoading) {
    return <ArtistPostsSkeleton />;
  }

  return (
    <div className="relative w-full overflow-hidden min-h-[600px]">
      {/* 포스트 목록 섹션 (애니메이션 중에도 레이아웃 유지를 위해 항상 렌더링) */}
      <div>
        {/* 전체 목록 레이아웃 레이블 */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground font-medium px-1 mb-6">전체 포스트</div>
        <div className="flex flex-col gap-8">
          {posts?.map((post) => (
            <ArtistPostCard key={post.id} postId={post.id} onClick={selectPost} />
          ))}
        </div>
      </div>

      {/* 포스트 상세 섹션 (좌측에서 100% 너비로 슬라이딩 오버레이) */}
      <div
        ref={detailRef}
        style={{ transform: "translateX(-100%)" }}
        className="absolute inset-0 z-20 w-full h-full bg-background"
      >
        {activePostId !== null && <MusicalPostDetail postId={activePostId} onBack={clearPost} />}
      </div>
    </div>
  );
}

function ArtistPostsSkeleton() {
  return (
    <div className="flex flex-col gap-8">
      <Skeleton className="h-6 w-32 mb-6" />
      {[...Array(3)].map((_, i) => (
        <Skeleton key={i} className="h-[400px] w-full rounded-xl" />
      ))}
    </div>
  );
}
