"use client";

import HomeHeroSection from "@/features/home/ui/HomeHeroSection";
import HomeRecommendSection1 from "@/features/home/ui/HomeRecommendSection1";
import HomeRecommendSection2 from "@/features/home/ui/HomeRecommendSection2";
import HomeShowNowSection from "@/features/home/ui/HomeShowNowSection";
import HomeArtistSection from "@/features/home/ui/HomeArtistSection";

export default function Home() {
  return (
    <section>
      <HomeHeroSection />
      <section className="pl-20 my-30 space-y-20">
        <HomeRecommendSection1 />
        <HomeShowNowSection />
        <HomeRecommendSection2 />
        <HomeArtistSection />
      </section>
    </section>
  );
}
