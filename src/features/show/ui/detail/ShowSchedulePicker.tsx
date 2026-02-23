"use client";

import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ko } from "date-fns/locale";
import { type DateRange } from "react-day-picker";

export default function ShowSchedulePicker({
  range,
  setRange,
}: {
  range: DateRange | undefined;
  setRange: (range: DateRange | undefined) => void;
}) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" id="dates" className="w-[300] justify-start text-left font-normal">
          <CalendarIcon className="mr-2" />
          {range?.from && range?.to ? (
            <>
              {format(range.from, "yyyy-MM-dd")} ~ {format(range.to, "yyyy-MM-dd")}
            </>
          ) : (
            "Pick a date"
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto overflow-hidden p-0" align="start">
        <Calendar mode="range" selected={range} onSelect={setRange} numberOfMonths={2} locale={ko} />
      </PopoverContent>
    </Popover>
  );
}
