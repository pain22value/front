"use client";

import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/shared/utils/cn";
import { ko } from "date-fns/locale";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

// 임시 목업 데이터 가져오기 함수
const fetchSchedules = async (date: Date | undefined) => {
  if (!date) return [];
  // API 호출 시뮬레이션 (0.5초 딜레이)
  await new Promise((resolve) => setTimeout(resolve, 500));

  return [
    { id: "1", round: 1, time: "오후 7:00", cast: "이재환, 백형훈, 허윤슬, 신승환" },
    { id: "2", round: 2, time: "오후 9:00", cast: "이재환, 백형훈, 허윤슬, 신승환" },
  ];
};

export function TicketingDateTimePicker() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [round, setRound] = useState("1");

  const { data: schedules, isLoading } = useQuery({
    queryKey: ["schedules", date],
    queryFn: () => fetchSchedules(date),
    enabled: !!date,
  });

  return (
    <div className="rounded-2xl p-4 space-y-4 max-w-[300] border">
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
        className="w-full rounded-md border"
        classNames={{
          day_button:
            "rounded-full! data-[selected-single=true]:bg-red-600! data-[selected-single=true]:text-white! data-[selected-single=true]:dark:bg-red-400! data-[selected-single=true]:group-data-[focused=true]/day:ring-red-600/20 data-[selected-single=true]:dark:group-data-[focused=true]/day:ring-red-400/40",
          today: "rounded-full! bg-accent!",
        }}
      />

      {/* 회차 선택 */}
      <RadioGroup value={round} onValueChange={setRound} className="space-y-3">
        {isLoading ? (
          <div className="py-8 text-center text-sm text-muted-foreground">일정을 불러오는 중입니다...</div>
        ) : (
          schedules?.map((schedule) => (
            <label key={schedule.id} htmlFor={`round-${schedule.id}`}>
              <Card
                className={cn(
                  "flex items-start gap-3 p-4 cursor-pointer rounded-xl border transition",
                  round === schedule.id ? "border-red-500" : "border-muted",
                )}
              >
                <RadioGroupItem
                  id={`round-${schedule.id}`}
                  value={schedule.id}
                  className={cn("mt-1", round === schedule.id && "border-red-500 text-red-500")}
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

      <Button className="w-full h-12 bg-red-500 hover:bg-red-600 text-white">예매하기</Button>
    </div>
  );
}
