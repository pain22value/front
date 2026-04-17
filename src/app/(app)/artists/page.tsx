"use client";

import useShowDetail from "@/features/show/hooks/useShowDetail";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";

export default function ArtistsPage() {
  const { data, isLoading } = useShowDetail(1);
  const artists = data?.castings || [];

  return (
    <main className="artists-page">
      <section>
        <div className="flex flex-col gap-6 mb-10">
          <h2 className="text-2xl font-bold">아티스트 목록</h2>
          <p className="text-muted-foreground">좋아하는 아티스트와 소통해보세요!</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
          {isLoading
            ? Array.from({ length: 12 }).map((_, i) => (
                <div key={i} className="flex flex-col items-center gap-3 p-4 rounded-xl border animate-pulse">
                  <Skeleton className="h-24 w-24 rounded-full" />
                  <Skeleton className="h-4 w-20" />
                </div>
              ))
            : artists.map((artist) => (
                <Link
                  key={artist.artistId}
                  href={`/artists/${artist.artistId}`}
                  className="flex flex-col items-center gap-4 p-5 rounded-2xl border bg-card/50 backdrop-blur-sm transition-all hover:bg-accent hover:border-primary group no-underline text-foreground shadow-sm hover:shadow-md"
                >
                  <Avatar className="h-28 w-28 border-4 border-transparent group-hover:border-primary transition-all duration-300">
                    <AvatarImage src={artist.profileImageUrl} alt={artist.artistName} className="object-cover" />
                    <AvatarFallback className="text-lg">{artist.artistName.slice(0, 1)}</AvatarFallback>
                  </Avatar>
                  <div className="text-center space-y-1">
                    <span className="block font-bold text-lg group-hover:text-primary transition-colors">
                      {artist.artistName}
                    </span>
                    <span className="block text-xs text-muted-foreground font-medium uppercase tracking-wider">
                      Musical Artist
                    </span>
                  </div>
                </Link>
              ))}
        </div>

        {!isLoading && artists.length === 0 && (
          <div className="text-center py-40 bg-muted/20 rounded-3xl border-2 border-dashed">
            <p className="text-muted-foreground text-lg">아티스트 정보가 없습니다.</p>
          </div>
        )}
      </section>
    </main>
  );
}
