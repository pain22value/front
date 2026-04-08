"use client";

import { Card } from "@/components/ui/card";
import { RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/shared/utils/cn";

export default function ShowDetailScheduleItem({
  schedule,
  index,
  isSelected,
  onSelect,
}: {
  schedule: Schedule;
  index: number;
  isSelected: boolean;
  onSelect?: (value: string) => void;
}) {
  // 출연진 목록 가공 (한 줄 주석)
  const castNames = Object.values(schedule.casts)
    .map((c) => c.artistName)
    .filter(Boolean)
    .join(", ");

  const handleSelect = () => {
    onSelect?.(schedule.scheduleId.toString());
  };

  return (
    <Card
      onClick={handleSelect}
      className={cn(
        "flex flex-row items-start gap-3 p-4 cursor-pointer rounded-xl border transition",
        isSelected ? "border-red-500 bg-red-50/50 dark:bg-red-900/10" : "border-muted hover:border-accent-foreground/20",
      )}
    >
      <RadioGroupItem
        id={`round-${schedule.scheduleId}`}
        value={schedule.scheduleId.toString()}
        className={cn(
          "mt-1",
          isSelected && "border-red-500 text-red-500 [&_[data-slot=radio-group-indicator]_svg]:fill-red-500",
        )}
        onClick={(e) => {
          // 라디오 버튼을 직접 클릭했을 때 버블링으로 인한 중복 실행 방지는 필요 없음 (같은 값이므로)
          // 그래도 명시적으로 둠 (한 줄 주석)
          e.stopPropagation();
          handleSelect();
        }}
      />
      <div className="space-y-1">
        <p className="font-semibold">
          {index + 1}회차 {schedule.showTimeLabel}
        </p>
        <p className="text-sm text-muted-foreground">{castNames}</p>
        {/* 하드코딩된 잔여 좌석 정보 (서버 데이터 없을 시 사용) */}
        <p className="text-sm font-medium text-muted-foreground">VIP 759 | R 759 | S 75 | A 75</p>
      </div>
    </Card>
  );
}
