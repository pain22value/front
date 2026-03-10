"use client";

import ShowCardList from "@/features/show/ui/ShowCardList";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

export default function ActorShowListSection({
  nowShows,
  isNowLoading,
  pastShows,
  isPastLoading,
}: {
  nowShows?: Show[];
  isNowLoading: boolean;
  pastShows?: Show[];
  isPastLoading: boolean;
}) {
  return (
    <section className="space-y-16 pt-8">
      <section>
        <div className="space-y-2 mb-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold tracking-tight">현재 상영중인 작품</h2>
          <Button variant="ghost" className="gap-1 text-muted-foreground">
            더보기 <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
        <ShowCardList shows={nowShows} isLoading={isNowLoading} />
      </section>
      <section>
        <div className="space-y-2 mb-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold tracking-tight">지난 출연 작품</h2>
          <Button variant="ghost" className="gap-1 text-muted-foreground">
            더보기 <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
        <ShowCardList shows={pastShows} isLoading={isPastLoading} />
      </section>
    </section>
  );
}
