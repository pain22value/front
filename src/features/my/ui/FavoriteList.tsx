"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useFavoriteStore } from "@/features/artists/stores/useFavoriteStore";
import { useArtistLike } from "@/features/show/hooks/useArtistLike";
import { useArtistDetail } from "@/features/artists/hooks/useArtist";
import { Heart } from "lucide-react";
import Link from "next/link";

// 즐겨찾기 아이템 컴포넌트 (각 아티스트별 좋아요 훅 사용)
function FavoriteArtistItem({
  artistId,
  artistName,
  profileImageUrl,
}: {
  artistId: number;
  artistName: string;
  profileImageUrl?: string;
}) {
  // favorites 배열에서 현재 아티스트 존재 여부 확인 (있으면 = 좋아요)
  const isLiked = useFavoriteStore((state) => state.favorites.some((a) => a.artistId === artistId));
  const { toggle, isPending } = useArtistLike(artistId, isLiked, artistName, profileImageUrl);

  // 아티스트 상세 정보에서 멤버십 가입 여부 확인
  const { data: artistDetail } = useArtistDetail(artistId);
  const isMembershipJoined = artistDetail?.membership?.joined ?? false;

  return (
    <div className="flex items-center justify-between p-4 hover:bg-accent transition-colors">
      <Link href={`/artists/${artistId}`} className="flex items-center space-x-4 flex-1">
        <Avatar className="h-12 w-12 border">
          <AvatarImage src={profileImageUrl} alt={artistName} className="object-cover" />
          <AvatarFallback>{artistName[0]}</AvatarFallback>
        </Avatar>
        <span className="text-lg font-medium text-foreground hover:underline">{artistName}</span>
      </Link>

      <div className="flex items-center space-x-3">
        {isMembershipJoined && (
          <Badge
            variant="outline"
            className="px-4 py-1.5 text-teal-600 border-teal-500/50 font-medium rounded-lg hover:bg-teal-500/10 cursor-default"
          >
            멤버십 가입중
          </Badge>
        )}

        <Button variant="ghost" size="icon" className="hover:bg-transparent" onClick={toggle} disabled={isPending}>
          <Heart
            className={`h-6 w-6 transition-colors ${isLiked ? "fill-red-500 text-red-500" : "fill-muted-foreground/30 text-muted-foreground/30"}`}
          />
        </Button>
      </div>
    </div>
  );
}

export default function FavoriteList() {
  // favorites 배열 직접 구독 (배열 참조가 바뀔때만 리렌더)
  const { favorites } = useFavoriteStore();

  return (
    <div className="w-full mt-10">
      <h2 className="text-2xl font-bold p-4">즐겨찾기</h2>

      {favorites.length === 0 ? (
        // 좋아요한 아티스트가 없을 때 빈 상태 표시
        <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
          <Heart className="h-12 w-12 mb-4 text-red-500/10" />
          <p className="text-base font-medium">좋아요한 아티스트가 없어요</p>
          <p className="text-sm mt-1">아티스트 페이지에서 하트를 눌러보세요</p>
        </div>
      ) : (
        <div className="divide-y divide-border mt-8">
          {favorites.map((artist) => (
            <FavoriteArtistItem
              key={artist.artistId}
              artistId={artist.artistId}
              artistName={artist.artistName}
              profileImageUrl={artist.profileImageUrl}
            />
          ))}
        </div>
      )}
    </div>
  );
}
