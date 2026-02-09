"use client";

import Image from "next/image";
import {
  type CarouselApi,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { musicals } from "@/shared/data/musicals";
import { cn } from "@/shared/utils/cn";
import { useCallback, useEffect, useState } from "react";

export function MusicalCarousel() {
  const [api, setApi] = useState<CarouselApi | null>(null);
  const [current, setCurrent] = useState(0);

  // ✅ api 최초 설정 시 current 초기화
  const handleSetApi = useCallback((carouselApi: CarouselApi) => {
    if (!carouselApi) return;

    setApi(carouselApi);
    setCurrent(carouselApi.selectedScrollSnap());
  }, []);

  // ✅ effect에서는 "구독"만
  useEffect(() => {
    if (!api) return;

    const onSelect = () => {
      setCurrent(api.selectedScrollSnap());
    };

    api.on("select", onSelect);

    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  // useEffect(() => {
  //   if (!api) return;
  //   setCurrent(api.selectedScrollSnap());
  //   api.on("select", () => {
  //     setCurrent(api.selectedScrollSnap());
  //   });
  // }, [api]);

  return (
    <div className="relative w-full max-w-7xl mx-auto">
      <Carousel
        setApi={handleSetApi}
        // setApi={setApi}
        opts={{
          align: "center",
          loop: true,
        }}
        className={cn("border border-amber-500")}
      >
        <CarouselContent className="-ml-4">
          {musicals.map((item, index) => (
            <CarouselItem key={item.id} className="pl-4 sm:basis-1/3 md:basis-1/4 lg:basis-1/5">
              <div
                className={cn(
                  "group relative overflow-hidden rounded-xl transition-all duration-300 ease-in-out",
                  index === current ? "scale-100 z-10 shadow-xl border-2 border-white" : "scale-90 opacity-50",
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
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious className="left-0" />
        <CarouselNext className="right-0" />
      </Carousel>
    </div>
  );
}
