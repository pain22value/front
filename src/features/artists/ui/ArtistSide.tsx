"use client";

import { useArtistPostStore } from "../stores/useArtistPostStore";
import ArtistLiveChat from "./ArtistLiveChat";
import CommentSection from "./CommentSection";

// selectedPostId에 따라 라이브챗 또는 댓글섹션을 표시
export default function ArtistSide() {
  const { selectedPostId } = useArtistPostStore();

  if (selectedPostId !== null) {
    return <CommentSection />;
  }

  return <ArtistLiveChat />;
}
