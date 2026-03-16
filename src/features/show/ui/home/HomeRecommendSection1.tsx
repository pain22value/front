"use client";

import { useRecommendShows } from "../../hooks/useRecommendShows";
import { BaseCarousel } from "@/components/common/BaseCarousel";
import { formatShowPeriod } from "@/shared/utils/date";
import { recommendShows } from "@/shared/data/shows";
import { cn } from "@/shared/utils/cn";
import Image from "next/image";
import Link from "next/link";

export default function HomeRecommendSection1() {
  const { data: shows, isLoading } = useRecommendShows();

  return (
    <section className="max-w-[1200] mx-auto space-y-8">
      <h1 className="font-semibold text-2xl">이 뮤지컬 어떠세요?</h1>
      <BaseCarousel
        items={shows || recommendShows}
        className="max-w-7xl mx-auto"
        itemClassName="sm:basis-1/3 md:basis-1/4 lg:basis-1/5"
        showPagination
        showButtonsOnHover
        renderItem={(item: Show, index, isSelected) => (
          <Link
            href={`/shows/${item.id}`}
            className={cn(
              "group relative overflow-hidden rounded-xl transition-all duration-300 ease-in-out block",
              isSelected ? "scale-100 z-10 shadow-xl border-2 border-white/" : "scale-90 opacity-50",
            )}
          >
            <Image src={item.image} alt={item.title} width={400} height={600} className="w-full object-cover" />
            <div className="absolute bottom-0 w-full bg-linear-to-t from-black/80 to-transparent p-4">
              <h3 className="text-lg font-semibold text-white">{item.title}</h3>
              <p className="text-sm text-white/80">{item.venue}</p>
              <p className="text-sm text-white/70">{formatShowPeriod(item.startTime, item.endTime)}</p>
            </div>
          </Link>
        )}
      />
    </section>
  );
}
