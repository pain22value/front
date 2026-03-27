"use client";

import { useShows } from "@/features/show/hooks/useShows";
import ShowCardList from "@/features/show/ui/ShowCardList";
import { SHOW_LIST } from "@/shared/data/shows";

export default function ShowNowPage() {
  const { data: showsData, isLoading } = useShows(undefined, "now");
  const shows = showsData?.shows || [];

  return (
    <section className="pl-20">
      <section className="max-w-[1200] mx-auto px-2 sm:px-4 md:px-8 space-y-6 mt-8">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">지금 예매 가능</h2>
        </div>
        <ShowCardList shows={shows || SHOW_LIST} isLoading={isLoading} />
      </section>
    </section>
  );
}
