"use client";

import { SeatMap } from "@/features/show/ui/seat/SeatMap";
import { useTicketingStore } from "@/features/ticketing/stores/useTicketingStore";
import { useRouter } from "next/navigation";
import { use, useEffect } from "react";

interface SeatPageProps {
  params: Promise<{ showId: string }>;
}

export default function SeatPage({ params }: SeatPageProps) {
  const { showId } = use(params);
  const router = useRouter();
  const { scheduleId, challengeComplete, hasValidAdmissionToken } = useTicketingStore();

  const canEnterSeatPage = hasValidAdmissionToken(showId, scheduleId) && challengeComplete && scheduleId != null;

  useEffect(() => {
    if (canEnterSeatPage) return;
    router.replace(`/shows/${showId}`);
  }, [canEnterSeatPage, router, showId]);

  if (!canEnterSeatPage || scheduleId == null) {
    return <div className="flex h-[calc(100vh-64px)] items-center justify-center">입장 정보를 확인하는 중...</div>;
  }

  return (
    <div className="h-[calc(100vh-64px)] w-full">
      <SeatMap showScheduleId={Number(scheduleId)} />
    </div>
  );
}
