"use client";

import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/shared/utils/cn";
import { ko } from "date-fns/locale";
import { useState } from "react";
import { Separator } from "@/components/ui/separator";
import { isSameDay } from "date-fns";
import { useCastingSchedules } from "../../hooks/useCastingSchedules";
import ShowTicketOpenNoticeModal from "./ShowTicketOpenNoticeModal";
// import { useAuthStore } from "@/features/auth/store/useAuthStore";
import { useTelemetryStore } from "@/shared/stores/useTelemetryStore";
import CaptchaModal from "@/features/ticketing/ui/captcha/CaptchaModal";

export function ShowDetailScheduleCard({ show }: { show?: ShowDetail }) {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [round, setRound] = useState("1");
  const [isNoticeModalOpen, setIsNoticeModalOpen] = useState(true);
  const [isCaptchaModalOpen, setIsCaptchaModalOpen] = useState(false);

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
    startTracking();
    setPageStage("captcha");

    // if (!accessToken) {
    //   router.push("/signin");
    //   return;
    // }
    setIsCaptchaModalOpen(true); // 모달이 떠도 위에서 설정한 10초 타이머는 계속 돌아갑니다.
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
        {/* 회차 선택 */}
        <RadioGroup value={round} onValueChange={setRound} className="space-y-3">
          {isLoading ? (
            <div className="py-8 text-center text-sm text-muted-foreground">일정을 불러오는 중입니다...</div>
          ) : filteredSchedules && filteredSchedules.length > 0 ? (
            filteredSchedules.map((schedule, index) => (
              <label key={schedule.scheduleId} htmlFor={`round-${schedule.scheduleId}`}>
                <Card
                  className={cn(
                    "flex flex-row items-start gap-3 p-4 cursor-pointer rounded-xl border transition",
                    round === schedule.scheduleId.toString() ? "border-red-500" : "border-muted",
                  )}
                >
                  <RadioGroupItem
                    id={`round-${schedule.scheduleId}`}
                    value={schedule.scheduleId.toString()}
                    className={cn(
                      "mt-1",
                      round === schedule.scheduleId.toString() &&
                        "border-red-500 text-red-500 [&_[data-slot=radio-group-indicator]_svg]:fill-red-500",
                    )}
                  />
                  <div>
                    <p className="font-semibold">
                      {index + 1}회차 {schedule.showTimeLabel}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {Object.values(schedule.casts)
                        .map((c) => c.artistName)
                        .filter(Boolean)
                        .join(", ")}
                    </p>
                  </div>
                </Card>
              </label>
            ))
          ) : (
            <div className="py-8 text-center text-sm text-muted-foreground">선택하신 날짜에 공연이 없습니다.</div>
          )}
        </RadioGroup>
      </div>

      <Button onClick={handleTicketing} className="w-full h-12 bg-red-500 hover:bg-red-600 text-white">
        예매하기
      </Button>

      {/* <ShowTicketOpenNoticeModal open={isNoticeModalOpen} onOpenChange={setIsNoticeModalOpen} /> */}
      <CaptchaModal open={isCaptchaModalOpen} onOpenChange={setIsCaptchaModalOpen} />
    </div>
  );
}
