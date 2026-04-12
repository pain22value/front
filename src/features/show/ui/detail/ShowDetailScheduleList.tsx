"use client";

import { RadioGroup } from "@/components/ui/radio-group";
import ShowDetailScheduleItem from "./ShowDetailScheduleItem";
import { Skeleton } from "@/components/ui/skeleton";
import { isBefore } from "date-fns";

export default function ShowDetailScheduleList({
  schedules,
  isLoading,
  value,
  onValueChange,
}: {
  schedules?: Schedule[];
  isLoading: boolean;
  value: string;
  onValueChange: (value: string) => void;
}) {
  if (isLoading) {
    return (
      <div className="space-y-3">
        {[...Array(3)].map((_, i) => (
          <Skeleton key={i} className="h-10 w-full rounded-md" />
        ))}
      </div>
    );
  }

  // 일정이 없을 때 표시 (한 줄 주석)
  if (!schedules || schedules.length === 0) {
    return <div className="py-8 text-center text-sm text-muted-foreground">선택하신 날짜에 공연이 없습니다.</div>;
  }

  const now = new Date();

  return (
    <RadioGroup value={value} onValueChange={onValueChange} className="space-y-3">
      {schedules.map((schedule, index) => {
        const isDisabled = isBefore(new Date(schedule.showTime), now);
        return (
          <ShowDetailScheduleItem
            key={schedule.scheduleId}
            schedule={schedule}
            index={index}
            isSelected={value === schedule.scheduleId.toString()}
            onSelect={onValueChange}
            isDisabled={isDisabled}
          />
        );
      })}
    </RadioGroup>
  );
}
