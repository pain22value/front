"use client";

import Image from "next/image";
import { BaseCarousel } from "@/components/common/BaseCarousel";
// import { shows } from "@/shared/data/shows";
import { cn } from "@/shared/utils/cn";
import { shows } from "@/shared/data/shows";

export default function RecommendSection1() {
  return (
    <section className="max-w-[1200] mx-auto space-y-8">
      <h1 className="font-semibold text-2xl">이 뮤지컬 어떠세요?</h1>
      <BaseCarousel
        items={shows}
        className="max-w-7xl mx-auto"
        itemClassName="sm:basis-1/3 md:basis-1/4 lg:basis-1/5"
        showPagination
        showButtonsOnHover
        renderItem={(item, index, isSelected) => (
          <div
            className={cn(
              "group relative overflow-hidden rounded-xl transition-all duration-300 ease-in-out",
              isSelected ? "scale-100 z-10 shadow-xl border-2 border-white/" : "scale-90 opacity-50",
            )}
          >
            {/* 포스터 */}
            <Image
              src={item.image}
              alt={item.title}
              width={400}
              height={600}
              className="w-full h-[500]/ object-cover border-red-500"
            />

            {/* 하단 정보 */}
            <div className="absolute bottom-0 w-full bg-gradient-to-t from-black/80 to-transparent p-4">
              <h3 className="text-lg font-semibold text-white">{item.title}</h3>
              <p className="text-sm text-white/80">{item.venue}</p>
              <p className="text-sm text-white/70">{item.period}</p>
            </div>
          </div>
        )}
      />
    </section>
  );
}
