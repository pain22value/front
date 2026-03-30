"use client";

import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { ko } from "date-fns/locale";
import { useState, useEffect, useMemo } from "react";
import { Separator } from "@/components/ui/separator";
import { isSameDay } from "date-fns";
import { useCastingSchedules } from "../../hooks/useCastingSchedules";
import ShowTicketOpenNoticeModal from "./ShowTicketOpenNoticeModal";
// import { useAuthStore } from "@/features/auth/store/useAuthStore";
import { useTelemetryStore } from "@/shared/stores/useTelemetryStore";
import CaptchaModal from "@/features/ticketing/ui/captcha/CaptchaModal";
import ShowDetailScheduleList from "./ShowDetailScheduleList";
import ShowNoticeModal from "./ShowNoticeModal";
import { useRouter } from "next/navigation";
import { useTicketingStore } from "@/features/ticketing/stores/useTicketingStore";
import { toast } from "sonner";

export default function ShowDetailScheduleCard({ show }: { show?: ShowDetail }) {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [round, setRound] = useState("1");
  const [hasDismissedTicketNotice, setHasDismissedTicketNotice] = useState(false);
  const isTicketOpenNoticeOpen = useMemo(() => {
    if (hasDismissedTicketNotice || !show?.date) return false;

    // show.startTime이 이미 "2026-04-16T00:00:00" 형태의 풀 타임스탬프인 경우 최우선 사용
    const targetDateStr = show?.startTime || (show?.date ? `${show.date.replaceAll(".", "-")}T00:00:00` : null);
    if (!targetDateStr) return false;

    const openDate = new Date(targetDateStr);
    return !isNaN(openDate.getTime()) && new Date() < openDate;
  }, [show, hasDismissedTicketNotice]);

  const [isNoticeModalOpen, setIsNoticeModalOpen] = useState(true);
  const [isCaptchaModalOpen, setIsCaptchaModalOpen] = useState(false);
  // console.log({ show });

  const router = useRouter();
  const { admissionToken, clearTicketing, getIsValid } = useTicketingStore();

  const showId = show?.showId.toString() || "";
  const { data: scheduleData, isLoading } = useCastingSchedules(showId);

  const filteredSchedules = scheduleData?.rows.filter((s) => {
    if (!date) return false;
    return isSameDay(new Date(s.showTime), date);
  });

  const firstScheduleId = filteredSchedules?.[0]?.scheduleId.toString() || "";

  // 현재 선택된 회차가 필터링된 결과에 없으면 첫 번째 회차로 자동 리셋 (렌더링 중 상태 조정)
  if (filteredSchedules && filteredSchedules.length > 0) {
    if (!round || !filteredSchedules.some((s) => s.scheduleId.toString() === round)) {
      setRound(firstScheduleId);
    }
  } else if (round !== "") {
    setRound("");
  }
  const { startTracking, setPageStage } = useTelemetryStore();
  // const user = useAuthStore((state) => state.user);

  const handleTicketing = () => {
    // 1. 스토어 내부 함수를 통해 유효성 검사 (만료 여부 및 현재 공연 ID 일치 여부)
    if (getIsValid(showId)) {
      toast.success("이미 유효한 입장 토큰이 있습니다.");
      // router.push(`/shows/${showId}/seat`);
      return;
    }

    // 2. 만약 유효하지 않은 토큰이 있다면 초기화
    if (admissionToken) {
      clearTicketing();
    }

    startTracking();
    setPageStage("captcha");

    setIsCaptchaModalOpen(true);
  };

  return (
    <div className="space-y-4 max-w-[300]">
      <div className="border p-4 rounded-2xl space-y-4">
        <h2 className="text-base font-semibold">관람일 선택</h2>

        {/* 
          selected: 예약 날짜 (클릭하여 선택된 날짜) 설정
          onSelect: 날짜 선택 시 상태 업데이트 함수
          today: 현재 날짜 설정 (기본값: new Date(), 오늘 날짜 표시 기준)
        */}
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          locale={ko}
          className="w-full rounded-md p-0"
          classNames={{
            day_button:
              "rounded-full! data-[selected-single=true]:bg-red-600! data-[selected-single=true]:text-white! data-[selected-single=true]:dark:bg-red-400! data-[selected-single=true]:group-data-[focused=true]/day:ring-red-600/20 data-[selected-single=true]:dark:group-data-[focused=true]/day:ring-red-400/40",
            today: "rounded-full! bg-accent!",
          }}
        />
        <Separator />

        {/* 회차 선택 리스트 (컴포넌트로 분리됨) */}
        <ShowDetailScheduleList
          schedules={filteredSchedules}
          isLoading={isLoading}
          value={round}
          onValueChange={setRound}
        />
      </div>

      <Button onClick={handleTicketing} className="w-full h-12 bg-red-500 hover:bg-red-600 text-white mb-0">
        예매하기
      </Button>

      <ShowNoticeModal open={isNoticeModalOpen} onOpenChange={setIsNoticeModalOpen} />
      <ShowTicketOpenNoticeModal
        open={isTicketOpenNoticeOpen}
        onOpenChange={() => setHasDismissedTicketNotice(true)}
        title={show?.title}
        openDate={show?.startTime || (show?.date ? `${show.date.replaceAll(".", "-")}T00:00:00` : undefined)}
      />
      <CaptchaModal open={isCaptchaModalOpen} onOpenChange={setIsCaptchaModalOpen} showId={showId} />
    </div>
  );
}
