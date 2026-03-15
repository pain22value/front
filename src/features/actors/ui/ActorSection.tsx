"use client";

import { useActorShows } from "@/features/show/hooks/useShows";
import ActorLiveChatSection from "./ActorLiveChatSection";
import ActorSectionSkeleton from "./ActorSectionSkeleton";
import ActorShowListSection from "./ActorShowListSection";
import { getRandomActor } from "@/shared/data/actors";
import ActorNoticeSection from "./ActorNoticeSection";
import ActorHeroSection from "./ActorHeroSection";
import { notices } from "@/shared/data/notices";
import { useActor } from "../hooks/useActors";
import { shows } from "@/shared/data/shows";

export default function ActorSection({ actorId }: { actorId: string }) {
  const { data: actor, isLoading: isActorLoading } = useActor(actorId);
  const { data: nowShows, isLoading: isNowLoading } = useActorShows(actorId, "now");
  const { data: pastShows, isLoading: isPastLoading } = useActorShows(actorId, "closed");

  if (isActorLoading) return <ActorSectionSkeleton />;

  return (
    <section>
      <ActorHeroSection actor={actor || getRandomActor()} />
      <section className="pl-20">
        <section className="max-w-[1200] mx-auto px-4 py-8 space-y-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <ActorNoticeSection notices={notices} />
            <ActorLiveChatSection />
          </div>
          <ActorShowListSection
            nowShows={nowShows || shows.slice(0, 2)}
            pastShows={pastShows || shows.slice(2, 6)}
            isNowLoading={isNowLoading}
            isPastLoading={isPastLoading}
          />
        </section>
      </section>
    </section>
  );
}
