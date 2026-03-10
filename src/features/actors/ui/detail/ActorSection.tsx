"use client";

import { useActor, useActorShows } from "@/features/show/hooks/useShows";
import NoticeSection from "./NoticeSection";
import ActorHeroSection from "./ActorHeroSection";
import ActorLiveChatSection from "./ActorLiveChatSection";
import ActorShowListSection from "./ActorShowListSection";
import ActorSectionSkeleton from "./ActorSectionSkeleton";
import { notices } from "@/shared/data/notices";

export default function ActorSection({ actorId }: { actorId: string }) {
  const { data: actor, isLoading: isActorLoading } = useActor(actorId);
  const { data: nowShows, isLoading: isNowLoading } = useActorShows(actorId, "now");
  const { data: pastShows, isLoading: isPastLoading } = useActorShows(actorId, "past");

  if (isActorLoading) return <ActorSectionSkeleton />;
  if (!actor) {
    return (
      <div className="flex min-h-[60svh] items-center justify-center text-xl font-bold text-muted-foreground">
        배우를 찾을 수 없습니다.
      </div>
    );
  }

  return (
    <section>
      <ActorHeroSection actor={actor} />
      <section className="pl-20">
        <section className="max-w-[1200] mx-auto px-4 py-8 space-y-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <NoticeSection notices={notices} />
            <ActorLiveChatSection />
          </div>
          <ActorShowListSection
            nowShows={nowShows}
            isNowLoading={isNowLoading}
            pastShows={pastShows}
            isPastLoading={isPastLoading}
          />
        </section>
      </section>
    </section>
  );
}
