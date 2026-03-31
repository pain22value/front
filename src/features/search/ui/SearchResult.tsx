"use client";

import Image from "next/image";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import ArtistCard from "@/features/artists/ui/ArtistCard";
import { Skeleton } from "@/components/ui/skeleton";
import { useSearch } from "../hooks/useSearch";

export default function SearchResult({ query }: { query?: string }) {
  const { data, isLoading } = useSearch({
    keyword: query || "",
    artistOffset: 0,
    artistLimit: 20,
    showOffset: 0,
    showLimit: 20,
  });

  if (isLoading) {
    return <SearchSkeleton />;
  }

  const artistsList = data?.artists || [];
  const showsList = data?.shows || [];

  return (
    <div className="space-y-10 md:space-y-16 mt-8">
      <h2 className="text-2xl font-semibold">검색 &apos;{query}&apos;</h2>
      <section>
        <div className="relative aspect-21/9">
          <Image
            src="https://res.cloudinary.com/dfiaqyaug/image/upload/v1770427942/Frame_2085665719_r3hpi9.png"
            alt="데스노트 더 뮤지컬"
            width={1000}
            height={1000}
            className="w-full h-full object-contain object-bottom"
          />
        </div>
      </section>
      <section>
        <h2 className="text-2xl font-semibold">배우({data?.artistCount || 0})</h2>
        <Separator className="mt-4! mb-6!" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {artistsList.map((artist: Artist) => (
            <ArtistCard
              key={artist.artistId}
              artist={{
                artistId: artist.artistId,
                artistName: artist.artistName,
                profileImageUrl: artist.profileImageUrl || "",
                isLiked: artist.isLiked,
              }}
            />
          ))}
        </div>
      </section>
      <section>
        <h2 className="text-2xl font-semibold">티켓({data?.showCount || 0})</h2>
        <Separator className="mt-4 my-6" />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {showsList.map((show: SearchShow) => (
            <Link key={show.showId} href={`/shows/${show.showId}`} className="block group">
              <div className="relative w-full aspect-3/4 rounded-xl overflow-hidden mb-4 bg-muted">
                {show.posterUrl && (
                  <Image
                    src={show.posterUrl}
                    alt={show.title}
                    width={300}
                    height={400}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                )}
              </div>
              <p className="font-semibold group-hover:underline">{show.title}</p>
              <p className="text-sm text-muted-foreground">{show.venueName}</p>
              <p className="text-sm text-muted-foreground">{show.date}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

const SearchSkeleton = () => (
  <div className="space-y-10 md:space-y-16 mt-8">
    <Skeleton className="h-8 w-48" />
    <section>
      <Skeleton className="relative aspect-21/9 w-full" />
    </section>
    <section>
      <Skeleton className="h-8 w-32" />
      <Separator className="mt-4! mb-6!" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <Skeleton key={i} className="h-[420px] w-full" />
        ))}
      </div>
    </section>
    <section>
      <Skeleton className="h-8 w-32" />
      <Separator className="mt-4 my-6" />
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {[...Array(4)].map((_, i) => (
          <Skeleton key={i} className="h-[280px] w-full" />
        ))}
      </div>
    </section>
  </div>
);
