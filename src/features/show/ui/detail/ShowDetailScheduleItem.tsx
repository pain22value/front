"use client";

import { Card } from "@/components/ui/card";
import { RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/shared/utils/cn";

export default function ShowDetailScheduleItem({
  schedule,
  index,
  isSelected,
  onSelect,
  isDisabled,
}: {
  schedule: Schedule;
  index: number;
  isSelected: boolean;
  onSelect?: (value: string) => void;
  isDisabled?: boolean;
}) {
  // 출연진 목록 가공 (한 줄 주석)
  const castNames = Object.values(schedule.casts)
    .map((c) => c.artistName)
    .filter(Boolean)
    .join(", ");

  // 잔여 좌석 정보 가공 (VIP > R > S > A 순서)
  const seatPriority = ["VIP", "R", "S", "A"];
  const seatInfo = schedule.remainingSeats
    ?.slice()
    .sort((a, b) => {
      const aIdx = seatPriority.indexOf(a.gradeName);
      const bIdx = seatPriority.indexOf(b.gradeName);
      return (aIdx === -1 ? 999 : aIdx) - (bIdx === -1 ? 999 : bIdx);
    })
    .map((s) => `${s.gradeName} ${s.remainingSeatCount}`)
    .join(" | ");

  const handleSelect = () => {
    if (isDisabled) return;
    onSelect?.(schedule.scheduleId.toString());
  };

  return (
    <Card
      onClick={handleSelect}
      className={cn(
        "flex flex-row items-start gap-3 p-4 rounded-xl border transition mb-0",
        isDisabled ? "opacity-50 cursor-not-allowed bg-muted/30" : "cursor-pointer",
        isSelected && !isDisabled ? "border-red-500 bg-red-50/50 dark:bg-red-900/10" : "border-muted",
        !isDisabled && !isSelected && "hover:border-accent-foreground/20",
      )}
    >
      <RadioGroupItem
        id={`round-${schedule.scheduleId}`}
        value={schedule.scheduleId.toString()}
        disabled={isDisabled}
        className={cn(
          "mt-1",
          isSelected &&
            !isDisabled &&
            "border-red-500 text-red-500 [&_[data-slot=radio-group-indicator]_svg]:fill-red-500",
        )}
        onClick={(e) => {
          if (isDisabled) return;
          e.stopPropagation();
          handleSelect();
        }}
      />
      <div className="space-y-1">
        <p className="font-semibold">
          {index + 1}회차 {schedule.showTimeLabel}
        </p>
        <p className="text-sm text-muted-foreground">{castNames}</p>
        <p className="text-sm font-medium text-muted-foreground">{seatInfo}</p>
      </div>
    </Card>
  );
}
