"use client";

import { useShows } from "@/features/show/hooks/useShows";
import ShowCardList from "@/features/show/ui/ShowCardList";

export default function ShowNowPage() {
  const { data: shows, isLoading } = useShows("now");

  return (
    <section className="pl-20">
      <section className="max-w-[1200] mx-auto px-2 sm:px-4 md:px-8 space-y-6 mt-8">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">지금 예매 가능</h2>
        </div>
        <ShowCardList shows={shows} isLoading={isLoading} />
      </section>{" "}
    </section>
  );
}
