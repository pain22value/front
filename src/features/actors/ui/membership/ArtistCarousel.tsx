"use client";

import AutoScroll from "embla-carousel-auto-scroll";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { useRef } from "react";

const artists = [
  {
    id: 1,
    name: "고은성",
    category: "뮤지컬 배우",
    img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=500&fit=crop",
  },
  {
    id: 2,
    name: "박은태",
    category: "뮤지컬 배우",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop",
  },
  {
    id: 3,
    name: "김소현",
    category: "뮤지컬 배우",
    img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=500&fit=crop",
  },
  {
    id: 4,
    name: "홍광호",
    category: "뮤지컬 배우",
    img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=500&fit=crop",
  },
  {
    id: 5,
    name: "전동석",
    category: "뮤지컬 배우",
    img: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&h=500&fit=crop",
  },
  {
    id: 6,
    name: "최정원",
    category: "뮤지컬 배우",
    img: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=500&fit=crop",
  },
];

const allArtists = [...artists, ...artists]; // 무한 루프를 위해 데이터 복제

export default function ArtistCarousel() {
  const plugin = useRef(AutoScroll({ speed: 0.8, stopOnInteraction: false, stopOnMouseEnter: true }));

  return (
    <div className="w-full py-16 mt-20 space-y-6">
      <div>
        <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight mb-2">
          이런 아티스트도 있어요
        </h2>
        <p className="text-slate-500 dark:text-zinc-500 text-sm font-medium">
          당신이 좋아할만한 다른 아티스트를 탐색해보세요
        </p>
      </div>
      <Carousel opts={{ align: "start", loop: true, dragFree: true }} plugins={[plugin.current]} className="w-full">
        <CarouselContent className="-ml-3 md:-ml-4">
          {allArtists.map((artist, index) => (
            <CarouselItem
              key={`${artist.id}-${index}`}
              className="pl-3 md:pl-4 basis-[45%] md:basis-1/4 lg:basis-1/5 xl:basis-1/6"
            >
              <div className="group relative overflow-hidden rounded-lg bg-slate-200 dark:bg-zinc-900 transition-all duration-500">
                <div className="aspect-3/4 w-full relative">
                  <img
                    src={artist.img}
                    alt={artist.name}
                    className="h-full w-full object-cover grayscale-[0.3] transition-all duration-700 group-hover:grayscale-0 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent opacity-60 transition-opacity group-hover:opacity-90" />
                  <div className="absolute bottom-4 left-4 right-4 translate-y-2 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                    <p className="text-white font-bold text-lg">{artist.name}</p>
                    <p className="text-zinc-300 dark:text-zinc-400 text-xs">{artist.category}</p>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
