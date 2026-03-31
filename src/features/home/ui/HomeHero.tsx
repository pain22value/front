"use client";

import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from "@/components/ui/carousel";
import { useRef, useState } from "react";
import { useHomeBanners } from "@/features/home/hooks/useHomeBanners";
import useCarouselPagination from "@/shared/hooks/useCarouselPagination";

import { Skeleton } from "@/components/ui/skeleton";

export default function HomeHero() {
  const [api, setApi] = useState<CarouselApi>();
  const { data: banners, isLoading } = useHomeBanners();
  const plugin = useRef(Autoplay({ delay: 3000, stopOnInteraction: false, stopOnMouseEnter: true }));
  const { current, count, scrollTo } = useCarouselPagination(api);

  if (isLoading || !banners?.length) {
    return (
      <section className="relative w-full pl-20 bg-black text-white rounded-b-4xl overflow-hidden pb-10">
        <Skeleton className="relative w-10/12 mx-auto aspect-21/9 bg-neutral-800 rounded-xl" />
      </section>
    );
  }

  const displayBanners = banners;

  return (
    <section className="relative w-full pl-20 bg-black text-white rounded-b-4xl overflow-hidden">
      <Carousel plugins={[plugin.current]} setApi={setApi} opts={{ loop: true }} className="relative w-10/12 mx-auto">
        <CarouselContent>
          {displayBanners?.map((banner) => (
            <CarouselItem key={banner.bannerId}>
              <div className="relative w-full aspect-21/9">
                <Image
                  src={banner.posterUrl}
                  alt={banner.showTitle}
                  width={2100}
                  height={900}
                  className="w-full h-full object-contain object-bottom"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* 페이지네이션 도트 — 이미지 하단 중앙 */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex justify-center gap-2 pt-3 pb-4">
          {Array.from({ length: count }).map((_, index) => (
            <button
              key={index}
              onClick={() => scrollTo(index)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                index === current ? "w-6 bg-white" : "w-1.5 bg-white/40 hover:bg-white/70"
              }`}
              aria-label={`슬라이드 ${index + 1}로 이동`}
            />
          ))}
        </div>
      </Carousel>
    </section>
  );
}
