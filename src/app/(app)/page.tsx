"use client";

import HomeHero from "@/features/home/ui/HomeHero";
import HomeRecommendations from "@/features/home/ui/HomeRecommendations";
import HomePromotions from "@/features/home/ui/HomePromotions";
import HomeRightNows from "@/features/home/ui/HomeRightNows";
import HomeArtists from "@/features/home/ui/HomeArtists";

export default function Home() {
  return (
    <main className="home-page">
      <HomeHero />
      <section>
        <section className="space-y-20">
          <HomeRecommendations />
          <HomeRightNows />
          <HomePromotions />
          <HomeArtists />
        </section>
      </section>
    </main>
  );
}
