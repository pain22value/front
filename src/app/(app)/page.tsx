"use client";

// import { MusicalCarousel } from "@/components/MusicalCarousel";
import { MusicalCarousel2 } from "@/components/MusicalCarousel2";
import { PerformanceHero } from "@/components/PerformanceHero";

export default function Home() {
  return (
    <div className="flex-1 min-h-screen">
      <PerformanceHero />

      <div className="pl-20">
        <MusicalCarousel2 />
      </div>

      <div className="h-[200vh]"></div>
    </div>
  );
}
