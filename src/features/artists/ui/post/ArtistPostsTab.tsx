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

  const { data: posts, isLoading, isError } = useArtistPosts(artistId);

  if (isLoading || isError || !posts || posts.length === 0) {
    return <ArtistPostsSkeleton />;
  }

  const handlePostClick = (postId: number) => {
    selectPost(postId);
    
    // 모바일 등 환경에서 탭 최상단으로 스크롤하여 상세 내용이 보이도록 함
    setTimeout(() => {
      const isMobile = window.innerWidth < 768;
      const offset = isMobile ? 80 : 150; // 헤더나 탭 높이 등을 고려한 여백
      
      if (detailRef.current) {
        const topPos = detailRef.current.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top: topPos, behavior: "smooth" });
      }
    }, 50);
  };

  return (
    <div className="relative w-full overflow-hidden min-h-[600px] pb-10">
      {/* 포스트 목록 섹션 (애니메이션 중에도 레이아웃 유지를 위해 항상 렌더링) */}
      <div>
        {/* 전체 목록 레이아웃 레이블 */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground font-medium px-1 mb-6">전체 포스트</div>
        <div className="flex flex-col gap-8">
          {posts?.map((post) => (
            <ArtistPostCard key={post.postId} post={post} onClick={handlePostClick} />
          ))}
        </div>
      </div>

      <div
        ref={detailRef}
        style={{ transform: "translateX(-100%)" }}
        className="absolute inset-0 z-20 w-full h-full bg-background"
      >
        {activePostId !== null && (
          <MusicalPostDetail
            post={posts.find((p) => p.postId === activePostId)!}
            onBack={clearPost}
          />
        )}
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
