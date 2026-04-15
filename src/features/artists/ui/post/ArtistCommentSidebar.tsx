"use client";

import { useState } from "react";
import CommentSection from "./CommentSection";
import ArtistCommentDetail from "./ArtistCommentDetail";
import { useArtistStore } from "../../stores/useArtistStore";
import useCommentSidebarAnimation from "../../hooks/useCommentSidebarAnimation";

export default function ArtistCommentSidebar({ artistId }: { artistId: string | number }) {
  const { selectedPostId } = useArtistStore();
  const [showDetail, setShowDetail] = useState(false);
  const [selectedCommentId, setSelectedCommentId] = useState<number | null>(null);
  const { detailRef, backdropRef } = useCommentSidebarAnimation(showDetail);

  const handleCommentClick = (commentId: number) => {
    setSelectedCommentId(commentId);
    setShowDetail(true);
  };

  const handleBack = () => {
    setShowDetail(false);
  };

  return (
    <div className="relative w-full h-full overflow-hidden bg-background border rounded-xl shadow-sm/">
      {/* 댓글 목록 섹션 */}
      <div className="w-full h-full overflow-y-auto">
        <CommentSection artistId={artistId} postId={selectedPostId} onCommentClick={handleCommentClick} />
      </div>

      {/* 외부 클릭 감지용 백드롭 (나머지 10% 영역 및 오버레이 배경) */}
      <div
        ref={backdropRef}
        onClick={handleBack}
        className="absolute inset-0 z-10 bg-black/40 opacity-0 pointer-events-none transition-opacity duration-300"
      />

      {/* 게시글 상세/답글 섹션 (부모의 90% 너비 차지) */}
      <div
        ref={detailRef}
        style={{ transform: "translateX(100%)" }}
        className="absolute top-0 right-0 z-20 w-[90%] h-full bg-background/"
      >
        <ArtistCommentDetail
          artistId={artistId}
          postId={selectedPostId}
          commentId={selectedCommentId}
          onBack={handleBack}
        />
      </div>
    </div>
  );
}
