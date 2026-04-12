"use client";

import useHomeShows from "../hooks/useHomeShows";
import { BaseCarousel } from "@/components/common/BaseCarousel";
import { cn } from "@/shared/utils/cn";
import Image from "next/image";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";

export default function HomeRecommendations() {
  const { data, isLoading } = useHomeShows("DAILY_BOOKING", "ALL", 1, 12);
  // console.log({ data });

  if (isLoading || !data?.shows?.length) return <HomeRecommendSectionSkeleton />;

  const displayShows = data.shows;

  return (
    <section className="space-y-8">
      <h1 className="font-semibold text-2xl">이 뮤지컬 어떠세요?</h1>
      <BaseCarousel
        items={displayShows}
        className="max-w-7xl mx-auto"
        itemClassName="sm:basis-1/3 md:basis-1/4 lg:basis-1/5"
        showPagination
        showButtonsOnHover
        autoplay
        stopOnInteraction={false}
        stopOnMouseEnter
        renderItem={(item: Show, index, isSelected) => (
          <Link
            href={`/shows/${item.showId}`}
            className={cn(
              "group relative overflow-hidden rounded-xl transition-all duration-300 ease-in-out block",
              isSelected ? "scale-100 z-10 shadow-xl border-2 border-white/" : "scale-90 opacity-50",
            )}
          >
            <div className="relative aspect-2/3 w-full">
              <Image
                src={item.posterUrl}
                alt={item.showTitle}
                width={400}
                height={600}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute bottom-0 w-full bg-linear-to-t from-black/80 to-transparent p-4">
              <h3 className="text-lg font-semibold text-white">{item.showTitle}</h3>
              <p className="text-sm text-white/80">{item.venueName}</p>
              <p className="text-sm text-white/70">{item.date}</p>
            </div>
          </Link>
        )}
      />
    </section>
  );
}

function HomeRecommendSectionSkeleton() {
  return (
    <section className="max-w-[1200px] mx-auto space-y-8">
      <Skeleton className="h-8 w-48 bg-accent/50" />
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="aspect-2/3 w-full relative rounded-xl overflow-hidden bg-accent/20">
            <div className="absolute bottom-0 w-full p-4 space-y-2">
              <Skeleton className="h-5 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-4 w-1/3" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
