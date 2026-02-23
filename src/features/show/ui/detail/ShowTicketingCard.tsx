"use client";

import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/shared/utils/cn";
import { ko } from "date-fns/locale";
import { useState } from "react";
import { Separator } from "@/components/ui/separator";
import { useSchedules } from "../../hooks/useSchedules";
import ShowTicketOpenNoticeModal from "./ShowTicketOpenNoticeModal";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/features/auth/store/useAuthStore";
import CaptchaModal from "./CaptchaModal";

export function ShowTicketingCard() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [round, setRound] = useState("1");
  const [isNoticeModalOpen, setIsNoticeModalOpen] = useState(true);
  const [isCaptchaModalOpen, setIsCaptchaModalOpen] = useState(false);

  const { data: schedules, isLoading } = useSchedules(date);
  const router = useRouter();
  const user = useAuthStore((state) => state.user);

  const handleTicketing = () => {
    if (!user) {
      router.push("/login");
      return;
    }
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
        {/* 회차 선택 */}
        <RadioGroup value={round} onValueChange={setRound} className="space-y-3/">
          {isLoading ? (
            <div className="py-8 text-center text-sm text-muted-foreground">일정을 불러오는 중입니다...</div>
          ) : (
            schedules?.map((schedule) => (
              <label key={schedule.id} htmlFor={`round-${schedule.id}`}>
                <Card
                  className={cn(
                    "flex flex-row items-start gap-3 p-4 cursor-pointer rounded-xl border transition",
                    round === schedule.id ? "border-red-500" : "border-muted",
                  )}
                >
                  <RadioGroupItem
                    id={`round-${schedule.id}`}
                    value={schedule.id}
                    className={cn(
                      "mt-1",
                      round === schedule.id &&
                        "border-red-500 text-red-500 [&_[data-slot=radio-group-indicator]_svg]:fill-red-500",
                    )}
                  />
                  <div>
                    <p className="font-semibold">
                      {schedule.round}회차 {schedule.time}
                    </p>
                    <p className="text-sm text-muted-foreground">{schedule.cast}</p>
                  </div>
                </Card>
              </label>
            ))
          )}
        </RadioGroup>
      </div>

      <Button onClick={handleTicketing} className="w-full h-12 bg-red-500 hover:bg-red-600 text-white">
        예매하기
      </Button>

      <ShowTicketOpenNoticeModal open={isNoticeModalOpen} onOpenChange={setIsNoticeModalOpen} />
      <CaptchaModal open={isCaptchaModalOpen} onOpenChange={setIsCaptchaModalOpen} />
    </div>
  );
}
