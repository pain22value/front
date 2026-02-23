"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useState } from "react";
import ShowSchedulePicker from "./ShowSchedulePicker";
import { DateRange } from "react-day-picker";
import { addDays, format } from "date-fns";
import { ko } from "date-fns/locale";

const casts = [
  "김호영",
  "이재환",
  "신재범",
  "강홍석",
  "백형훈",
  "서경수",
  "한재아",
  "허윤슬",
  "신승환",
  "심재현",
  "김동현",
  "이도현",
];

const today = new Date();
const schedule = [
  {
    date: format(today, "MM/dd(eee)", { locale: ko }),
    time: "오후 7:00",
    찰리: "김호영",
    롤라: "강홍석",
    로렌: "한재아",
    돈: "신승환",
  },
  {
    date: format(addDays(today, 1), "MM/dd(eee)", { locale: ko }),
    time: "오후 7:00",
    찰리: "신재범",
    롤라: "백형훈",
    로렌: "허윤슬",
    돈: "심재현",
  },
  {
    date: format(addDays(today, 1), "MM/dd(eee)", { locale: ko }),
    time: "오후 9:00",
    찰리: "이재환",
    롤라: "서경수",
    로렌: "한재아",
    돈: "김동현",
  },
  {
    date: format(addDays(today, 2), "MM/dd(eee)", { locale: ko }),
    time: "오후 7:00",
    찰리: "김호영",
    롤라: "강홍석",
    로렌: "한재아",
    돈: "신승환",
  },
  {
    date: format(addDays(today, 3), "MM/dd(eee)", { locale: ko }),
    time: "오후 7:00",
    찰리: "신재범",
    롤라: "백형훈",
    로렌: "허윤슬",
    돈: "심재현",
  },
];

export default function ShowScheduleTap() {
  const [selectedCast, setSelectedCast] = useState<string | null>(null);
  const [range, setRange] = useState<DateRange | undefined>({ from: new Date(), to: addDays(new Date(), 7) });

  /*
  // React Query를 사용하여 서버에서 스케줄을 조회하는 로직 예시
  const { data: scheduleData } = useQuery({
    queryKey: ["schedules", range?.from, range?.to, selectedCast],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (range?.from) params.append("startDate", range.from.toISOString());
      if (range?.to) params.append("endDate", range.to.toISOString());
      if (selectedCast) params.append("cast", selectedCast);
      
      const response = await fetch(`/api/schedules?${params.toString()}`);
      return response.json();
    },
  });
  */

  const filteredSchedule = schedule.filter((row) => {
    // 캐스팅 필터
    const isCastMatch = selectedCast ? Object.values(row).includes(selectedCast) : true;

    // 날짜 필터 (mock 데이터 형식 "MM/dd" 파싱)
    let isDateMatch = true;
    if (range?.from) {
      const [month, day] = row.date.split("(")[0].split("/").map(Number);
      const rowDate = new Date(new Date().getFullYear(), month - 1, day);
      const from = new Date(range.from.setHours(0, 0, 0, 0));
      const to = range.to ? new Date(range.to.setHours(23, 59, 59, 999)) : from;
      isDateMatch = rowDate >= from && rowDate <= to;
    }

    return isCastMatch && isDateMatch;
  });

  return (
    <Card className="p-0! bg-transparent! border-none! shadow-none!">
      <CardContent className="space-y-6 p-0!">
        <ShowSchedulePicker range={range} setRange={setRange} />

        {/* 캐스팅 필터 */}
        <div className="flex flex-wrap gap-2">
          {casts.map((name) => (
            <Badge
              key={name}
              variant={selectedCast === name ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => setSelectedCast(name === selectedCast ? null : name)}
            >
              {name}
            </Badge>
          ))}
        </div>

        {/* 스케줄 테이블 */}
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>관람일</TableHead>
              <TableHead>시간</TableHead>
              <TableHead>찰리</TableHead>
              <TableHead>롤라</TableHead>
              <TableHead>로렌</TableHead>
              <TableHead>돈</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredSchedule.map((row, idx) => (
              <TableRow key={idx}>
                <TableCell>{row.date}</TableCell>
                <TableCell>{row.time}</TableCell>
                <TableCell>{row.찰리}</TableCell>
                <TableCell>{row.롤라}</TableCell>
                <TableCell>{row.로렌}</TableCell>
                <TableCell>{row.돈}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
