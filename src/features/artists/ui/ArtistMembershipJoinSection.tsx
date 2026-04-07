"use client";

import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useArtistLike } from "../../show/hooks/useArtistLike";
import { useFavoriteStore } from "@/features/artists/stores/useFavoriteStore";

export default function ArtistMembershipJoinSection({ artist }: { artist: Artist }) {
  // 전역 상태에서 좋아요 여부 가져오기 (없으면 서버 상태 사용)
  // favorites 배열에서 현재 아티스트 존재 여부 확인 (Array 구조 대응)
  const isLiked = useFavoriteStore((state) => state.favorites.some((a) => a.artistId === artist.artistId));
  const { toggle, isPending } = useArtistLike(artist.artistId, isLiked, artist.artistName, artist.profileImageUrl);

  const handleLike = () => {
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
              isLiked
                ? "text-red-500 fill-red-500"
                : "text-slate-300 fill-slate-300 hover:text-red-300 hover:fill-red-300"
            }`}
          />
        </button>
      </div>
    </div>
  );
}
