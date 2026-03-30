"use client";

import { Card } from "@/components/ui/card";
import { RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/shared/utils/cn";

interface ShowDetailScheduleItemProps {
  schedule: Schedule;
  index: number;
  isSelected: boolean;
}

export default function ShowDetailScheduleItem({
  schedule,
  index,
  isSelected,
}: ShowDetailScheduleItemProps) {
  // 출연진 목록 가공 (한 줄 주석)
  const castNames = Object.values(schedule.casts)
    .map((c) => c.artistName)
    .filter(Boolean)
    .join(", ");

  return (
    <label htmlFor={`round-${schedule.scheduleId}`}>
      <Card
        className={cn(
          "flex flex-row items-start gap-3 p-4 cursor-pointer rounded-xl border transition",
          isSelected ? "border-red-500" : "border-muted",
        )}
      >
        <RadioGroupItem
          id={`round-${schedule.scheduleId}`}
          value={schedule.scheduleId.toString()}
          className={cn(
            "mt-1",
            isSelected &&
              "border-red-500 text-red-500 [&_[data-slot=radio-group-indicator]_svg]:fill-red-500",
          )}
        />
        <div className="space-y-1">
          <p className="font-semibold">
            {index + 1}회차 {schedule.showTimeLabel}
          </p>
          <p className="text-sm text-muted-foreground">{castNames}</p>
          {/* 하드코딩된 잔여 좌석 정보 (서버 데이터 없을 시 사용) */}
          <p className="text-sm font-medium text-muted-foreground">
            VIP 759 | R 759 | S 75 | A 75
          </p>
        </div>
      </Card>
    </label>
  );
}
