"use client";

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import DatePicker from "react-datepicker";
import { ko } from "date-fns/locale";
import { format } from "date-fns";
import { cn } from "@/shared/utils/cn";
import { useState } from "react";

import "react-datepicker/dist/react-datepicker.css";

export default function MyDatePicker() {
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [endDate, setEndDate] = useState<Date | null>(null);

  const onChange = (dates: [Date | null, Date | null]) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  return (
    <div className="space-y-2">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" id="dates" className="w-[280px] justify-start text-left font-normal">
            {startDate ? (
              endDate ? (
                `${format(startDate, "yyyy-MM-dd")} ~ ${format(endDate, "yyyy-MM-dd")}`
              ) : (
                format(startDate, "yyyy-MM-dd")
              )
            ) : (
              <span>날짜 선택</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-4 overflow-hidden shadow-2xl scale-105" align="start">
          <DatePicker
            selected={startDate}
            startDate={startDate}
            endDate={endDate}
            onChange={onChange}
            selectsRange
            inline
            monthsShown={2}
            minDate={new Date()}
            locale={ko}
            calendarClassName={cn("rounded-none! border-0! flex! shadow-none!")}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
