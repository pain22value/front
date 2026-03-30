"use client";

import { useShows } from "@/features/show/hooks/useShows";
import ShowCardList from "@/features/show/ui/ShowCardList";

export default function ShowNowPage() {
  const { data: showsData, isLoading } = useShows(undefined, "now");
  const shows = showsData?.shows || [];

  return (
    <main className="show-now-page">
      <section>
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">지금 예매 가능</h2>
        </div>
        <ShowCardList shows={shows} isLoading={isLoading} />
      </section>
    </main>
  );
}
