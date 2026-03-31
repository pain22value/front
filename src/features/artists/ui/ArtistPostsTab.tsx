"use client";

import { useArtistPostStore } from "../stores/useArtistPostStore";
import MusicalPostCard from "./MusicalPostCard";
import MusicalPostDetail from "./MusicalPostDetail";

export default function ArtistPostsTab({ artistId }: { artistId: string }) {
  const { selectedPostId, selectPost, clearPost } = useArtistPostStore();

  // 실제로는 artistId를 기반으로 포스트 목록을 가져와야 하지만 마중물 목업 데이터입니다.
  const mockPosts = [1, 2, 3];

  // 포스트 선택 시 상세 뷰 표시
  if (selectedPostId !== null) {
    return <MusicalPostDetail postId={selectedPostId} onBack={clearPost} />;
  }

  return (
    <div className="flex flex-col gap-8 py-4">
      {mockPosts.map((id) => (
        <MusicalPostCard key={id} postId={id} onClick={selectPost} />
      ))}
    </div>
  );
}
