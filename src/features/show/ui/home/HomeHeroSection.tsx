"use client";

import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from "@/components/ui/carousel";
import { HERO_BANNER_LIST } from "@/shared/data/heroBanners";
import { useEffect, useRef, useState } from "react";

export default function HomeHeroSection() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  const plugin = useRef(Autoplay({ delay: 3000, stopOnInteraction: false, stopOnMouseEnter: true }));

  // carouselApi가 준비되면 슬라이드 수 및 현재 인덱스 초기화
  useEffect(() => {
    if (!api) return;
    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());
    api.on("select", () => setCurrent(api.selectedScrollSnap()));
  }, [api]);

  return (
    <section className="relative w-full pl-20 bg-black text-white rounded-b-4xl overflow-hidden">
      <Carousel plugins={[plugin.current]} setApi={setApi} opts={{ loop: true }} className="relative w-10/12 mx-auto">
        <CarouselContent>
          {HERO_BANNER_LIST.map((banner) => (
            <CarouselItem key={banner.id}>
              <div className="relative w-full aspect-21/9">
                <Image src={banner.src} alt={banner.alt} fill priority className="object-contain object-bottom" />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* 페이지네이션 도트 — 이미지 하단 중앙 */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex justify-center gap-2 pt-3 pb-4">
          {Array.from({ length: count }).map((_, index) => (
            <button
              key={index}
              onClick={() => api?.scrollTo(index)}
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
