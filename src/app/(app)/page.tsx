"use client";

import HeroSection from "@/features/show/ui/home/HeroSection";
import RecommendSection1 from "@/features/show/ui/home/RecommendSection1";
import RecommendSection2 from "@/features/show/ui/home/RecommendSection2";
import TicketingAvailableSection from "@/features/show/ui/home/TicketingAvailableSection";
import ActorsChatSection from "@/features/show/ui/home/ActorsChatSection";

export default function Home() {
  return (
    <section>
      <HeroSection />
      <div className="pl-20 my-30 space-y-20">
        <RecommendSection1 />
        <TicketingAvailableSection />
        <RecommendSection2 />
        <ActorsChatSection />
      </div>

      <div className="h-[200vh]"></div>
    </section>
  );
}
