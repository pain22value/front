"use client";

import { RadioGroup } from "@/components/ui/radio-group";
import ShowDetailScheduleItem from "./ShowDetailScheduleItem";

interface ShowDetailScheduleListProps {
  schedules?: Schedule[];
  isLoading: boolean;
  value: string;
  onValueChange: (value: string) => void;
}

export default function ShowDetailScheduleList({
  schedules,
  isLoading,
  value,
  onValueChange,
}: ShowDetailScheduleListProps) {
  // 로딩 중일 때 표시 (한 줄 주석)
  if (isLoading) {
    return (
      <div className="py-8 text-center text-sm text-muted-foreground">
        일정을 불러오는 중입니다...
      </div>
    );
  }

  // 일정이 없을 때 표시 (한 줄 주석)
  if (!schedules || schedules.length === 0) {
    return (
      <div className="py-8 text-center text-sm text-muted-foreground">
        선택하신 날짜에 공연이 없습니다.
      </div>
    );
  }

  return (
    <RadioGroup value={value} onValueChange={onValueChange} className="space-y-3">
      {schedules.map((schedule, index) => (
        <ShowDetailScheduleItem
          key={schedule.scheduleId}
          schedule={schedule}
          index={index}
          isSelected={value === schedule.scheduleId.toString()}
        />
      ))}
    </RadioGroup>
  );
}
