"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import useShowDetail from "../../show/hooks/useShowDetail";
import { Skeleton } from "@/components/ui/skeleton";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

export default function HomeArtists() {
  const { data, isLoading } = useShowDetail(1);
  const artists = data?.castings || [];

  return (
    <section className="space-y-8 rounded-2xl border bg-background p-6">
      {/* 아티스트와 라이브 채팅 안내 */}
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold">아티스트와 라이브 채팅을 시작해보세요!</h2>
        <Button variant="ghost" className="gap-1 text-muted-foreground">
          더보기 <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      {/* 배우 목록 */}
      <div className="flex gap-3 flex-wrap pb-2">
        {isLoading
          ? Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="flex h-14 w-32 animate-pulse items-center gap-3 rounded-full border bg-muted px-4 py-2" />
            ))
          : artists.map((artist) => (
              <Link
                key={artist.artistId}
                href={`/artists/${artist.artistId}`}
                className="flex shrink-0 items-center gap-3 rounded-full border px-4 py-2 transition hover:bg-accent no-underline text-foreground"
              >
                <Avatar className="h-10 w-10">
                  <AvatarImage src={artist.profileImageUrl} alt={artist.artistName} />
                  <AvatarFallback>{artist.artistName.slice(0, 1)}</AvatarFallback>
                </Avatar>
                <span className="whitespace-nowrap text-sm font-medium">{artist.artistName}</span>
              </Link>
            ))}
      </div>
    </section>
  );
}
