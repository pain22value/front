"use client";

import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { ko } from "date-fns/locale";
import { useState, useMemo } from "react";
import { Separator } from "@/components/ui/separator";
import { isSameDay } from "date-fns";
import { useCastingSchedules } from "../../hooks/useCastingSchedules";
import ShowOpenNoticeModal from "./ShowOpenNoticeModal";
import ShowWaitingModal from "@/features/ticketing/ui/ShowWaitingModal";
import useTicketing from "@/features/ticketing/hooks/useTicketing";
import ShowDetailScheduleList from "./ShowDetailScheduleList";
import ShowNoticeModal from "./ShowNoticeModal";
import { useShowNotice } from "../../hooks/useShowNotice";

export default function ShowDetailScheduleCard({ show }: { show?: ShowDetail }) {
  const showId = show?.showId.toString() || "";
  const { isWaitingModalOpen, setIsWaitingModalOpen, handleTicketing } = useTicketing(showId);
  const { isNotice, setIsNotice, setIsOpenTimeNotice, canShowOpenTimeNotice } = useShowNotice(show);

  const [date, setDate] = useState<Date | undefined>(new Date());
  const [round, setRound] = useState("1");
  const { data: scheduleData, isLoading } = useCastingSchedules(showId);

  // 선택된 날짜에 해당하는 스케줄 필터링
  const filteredSchedules = useMemo(() => {
    if (!scheduleData || !date) return [];
    return scheduleData.rows.filter((s) => isSameDay(new Date(s.showTime), date));
  }, [scheduleData, date]);

  // 필터링된 스케줄이 변경될 때 선택된 회차를 검증 및 업데이트 (렌더링 도중 상태 조정)
  if (filteredSchedules.length > 0) {
    const isValidRound = filteredSchedules.some((s) => s.scheduleId.toString() === round);
    if (!isValidRound) {
      setRound(filteredSchedules[0].scheduleId.toString());
    }
  } else if (round !== "") {
    setRound("");
  }

  return (
    <div className="space-y-4 max-w-[300]">
      <div className="border p-4 rounded-2xl space-y-4">
        <h2 className="text-base font-semibold">관람일 선택</h2>
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

      {/* 공지 모달 */}
      <ShowNoticeModal open={isNotice} onOpenChange={setIsNotice} />
      <ShowOpenNoticeModal
        open={canShowOpenTimeNotice}
        onOpenChange={() => setIsOpenTimeNotice(true)}
        title={show?.title}
        openDate={show?.startTime || (show?.date ? `${show.date.replaceAll(".", "-")}T00:00:00` : undefined)}
      />

      {/* 대기열 모달 (캡차 -> 대기열 -> 입장 성공) */}
      <ShowWaitingModal open={isWaitingModalOpen} onOpenChange={setIsWaitingModalOpen} showId={showId} />
    </div>
  );
}
