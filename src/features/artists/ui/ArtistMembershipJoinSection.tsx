"use client";

import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState } from "react";
import { useArtistLike } from "../../show/hooks/useArtistLike";

export default function ArtistMembershipJoinSection({ artist }: { artist: Artist }) {
  // 좋아요 로컬 상태
  const [liked, setLiked] = useState(artist.isLiked ?? false);
  const [prevId, setPrevId] = useState(artist.artistId);
  const [prevIsLiked, setPrevIsLiked] = useState(artist.isLiked);

  // artist ID가 바뀌었거나 서버의 좋아요 상태가 변경되었을 때 로컬 상태 동기화
  if (artist.artistId !== prevId || artist.isLiked !== prevIsLiked) {
    setLiked(artist.isLiked ?? false);
    setPrevId(artist.artistId);
    setPrevIsLiked(artist.isLiked);
  }

  const { toggle, isPending } = useArtistLike(artist.artistId, liked);

  const handleLike = () => {
    setLiked((prev: boolean) => !prev);
    toggle();
  };

  return (
    <div className="space-y-6 py-6 font-geist">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-medium">{artist.artistName}</h1>
      <div className="flex items-center gap-4">
        <Link href={`/artists/${artist.artistId}/membership`}>
          <Button
            size="lg"
            className="relative px-8 py-6 text-xl font-bold bg-white text-black hover:bg-white/90 border-none transition-colors"
          >
            멤버십 가입하기
          </Button>
        </Link>
        <button
          onClick={handleLike}
          disabled={isPending}
          className="p-2 transition-transform active:scale-90 focus:outline-hidden"
        >
          <Heart
            className={`w-8 h-8 transition-colors duration-300 cursor-pointer ${
              liked
                ? "text-pink-500 fill-pink-500"
                : "text-slate-300 fill-slate-300 hover:text-pink-300 hover:fill-pink-300"
            }`}
          />
        </button>
      </div>
    </div>
  );
}
