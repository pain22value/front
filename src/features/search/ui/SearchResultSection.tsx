"use client";

import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import ActorCard from "@/features/show/ui/ActorCard";
import { Skeleton } from "@/components/ui/skeleton";
import { formatShowPeriod } from "@/shared/utils/date";
import { shows as allShows } from "@/shared/data/shows";
import { actors as allActors } from "@/shared/data/actors";
import { useSearch } from "../hooks/useSearch";

export default function SearchResultSection({ query }: { query?: string }) {
  const { data, isLoading } = useSearch(query || "");
  console.log({ data });

  if (isLoading) {
    return <SearchSkeleton />;
  }

  const actorsList = data?.actors || allActors.slice(0, 4);
  const showsList = data?.shows || allShows.slice(0, 4);

  return (
    <section className="max-w-[1200] mx-auto px-2 sm:px-4 md:px-8 space-y-10 md:space-y-16 mt-8">
      <h2 className="text-2xl font-semibold">검색 &apos;{query}&apos;</h2>
      <section>
        <div className="relative aspect-21/9">
          <Image
            src="https://res.cloudinary.com/dfiaqyaug/image/upload/v1770427942/Frame_2085665719_r3hpi9.png"
            alt="데스노트 더 뮤지컬"
            fill
            priority
            className="object-contain object-bottom"
          />
        </div>
      </section>
      <section className="bg-neutral-950 text-white p-8 rounded-2xl overflow-hidden">
        <div className="max-w-6xl mx-auto flex gap-8">
          <div className="mt-auto">
            <h1 className="text-3xl font-bold">데스노트</h1>
            <p className="text-neutral-400">디큐브 링크아트센터</p>
            <p>2025.12.17 ~ 2026.03.29</p>
          </div>
          <div className="flex-1 grid grid-cols-3 md:grid-cols-6 gap-2">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="aspect-2/3 bg-neutral-800 rounded-sm overflow-hidden relative border border-neutral-700"
              >
                <div className="absolute inset-0 bg-linear-to-t from-black/80 to-transparent" />
                <span className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[10px] font-medium text-white/90">
                  {i % 2 === 0 ? "김준수" : "규현"}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section>
        <h2 className="text-2xl font-semibold">배우({actorsList.length})</h2>
        <Separator className="mt-4! mb-6!" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {actorsList.map((actor: Actor) => (
            <ActorCard key={actor.id} actor={actor} />
          ))}
        </div>
      </section>
      <section>
        <h2 className="text-2xl font-semibold">티켓({showsList.length})</h2>
        <Separator className="mt-4 my-6" />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {showsList.map((show: Show) => (
            <div key={show.id}>
              <div className="relative w-full aspect-3/4 rounded-xl overflow-hidden mb-4">
                <Image src={show.image} alt={show.title} fill className="object-cover" />
              </div>
              <p className="font-semibold">{show.title}</p>
              <p className="text-sm text-muted-foreground">{show.venue}</p>
              <p className="text-sm text-muted-foreground">{formatShowPeriod(show.startTime, show.endTime)}</p>
            </div>
          ))}
        </div>
      </section>
    </section>
  );
}

const SearchSkeleton = () => (
  <section className="max-w-[1200] mx-auto px-2 sm:px-4 md:px-8 space-y-10 md:space-y-16 mt-8">
    {/* Hero Skeleton */}
    <Skeleton className="h-8 w-48" />
    <section>
      <Skeleton className="relative aspect-21/9 w-full" />
    </section>
    <section className="bg-neutral-950 p-8 rounded-2xl">
      <div className="max-w-6xl mx-auto flex gap-8">
        <div className="mt-auto space-y-2">
          <Skeleton className="h-9 w-40" />
          <Skeleton className="h-5 w-32" />
          <Skeleton className="h-5 w-48" />
        </div>
        <div className="flex-1 grid grid-cols-3 md:grid-cols-6 gap-2">
          {[...Array(6)].map((_, i) => (
            <Skeleton key={i} className="aspect-2/3 bg-neutral-800" />
          ))}
        </div>
      </div>
    </section>

    {/* Actors Skeleton */}
    <section>
      <Skeleton className="h-8 w-32" />
      <Separator className="mt-4! mb-6!" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <Skeleton key={i} className="h-[420px] w-full" />
        ))}
      </div>
    </section>

    {/* Shows Skeleton */}
    <section>
      <Skeleton className="h-8 w-32" />
      <Separator className="mt-4 my-6" />
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {[...Array(4)].map((_, i) => (
          <Skeleton key={i} className="h-[280px] w-full" />
        ))}
      </div>
    </section>
  </section>
);
