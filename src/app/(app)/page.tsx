"use client";

import HomeHeroSection from "@/features/show/ui/home/HomeHeroSection";
import HomeRecommendSection1 from "@/features/show/ui/home/HomeRecommendSection1";
import HomeRecommendSection2 from "@/features/show/ui/home/HomeRecommendSection2";
import HomeRightNowSection from "@/features/show/ui/home/HomeRightNowSection";
import HomeActorsSection from "@/features/show/ui/home/HomeActorsSection";

export default function Home() {
  return (
    <section>
      <HomeHeroSection />
      <section className="pl-20 my-30 space-y-20">
        <HomeRecommendSection1 />
        <HomeRightNowSection />
        <HomeRecommendSection2 />
        <HomeActorsSection />
      </section>
    </section>
  );
}
