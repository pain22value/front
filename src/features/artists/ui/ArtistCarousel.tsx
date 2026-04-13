"use client";

import AutoScroll from "embla-carousel-auto-scroll";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { ARTIST_LIST } from "@/shared/data/artists";
import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";

const allArtists = [...ARTIST_LIST, ...ARTIST_LIST]; // 무한 루프를 위해 데이터 복제

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
              key={`${artist.artistId}-${index}`}
              className="pl-3 md:pl-4 basis-[45%] md:basis-1/4 lg:basis-1/5 xl:basis-1/6"
            >
              <Link
                href={`/artists/${artist.artistId}`}
                className="group relative block aspect-3/4 overflow-hidden rounded-lg bg-slate-200 dark:bg-zinc-900 transition-all duration-500 hover:scale-[1.02]"
              >
                <Image
                  src={artist.profileImageUrl}
                  alt={artist.artistName}
                  width={300}
                  height={400}
                  className="w-full h-full object-cover grayscale-[0.3] transition-all duration-700 group-hover:grayscale-0 group-hover:scale-110"
                  priority
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent opacity-60 transition-opacity group-hover:opacity-90" />
                <div className="absolute bottom-4 left-4 right-4 translate-y-2 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                  <p className="text-white font-bold text-lg">{artist.artistName}</p>
                  <p className="text-zinc-300 dark:text-zinc-400 text-xs">뮤지컬 배우</p>
                </div>
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
