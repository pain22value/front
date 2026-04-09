"use client";

import { SeatMap } from "@/features/show/ui/seat/SeatMap";
import { useTicketingStore } from "@/features/ticketing/stores/useTicketingStore";
import { use } from "react";

interface SeatPageProps {
  params: Promise<{ showId: string }>;
}

export default function SeatPage({ params }: SeatPageProps) {
  // const { showId } = use(params);
  const { scheduleId } = useTicketingStore();

  return (
    <div className="h-[calc(100vh-64px)] w-full">
      <SeatMap showScheduleId={Number(scheduleId)} />
    </div>
  );
}
