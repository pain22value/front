"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import ShowSchedulePicker from "./ShowSchedulePicker";
import { format } from "date-fns";
import { ko } from "date-fns/locale";

import { useCastingSchedules } from "../../hooks/useCastingSchedules";
import useShowScheduleFilter from "../../hooks/useShowScheduleFilter";
import { useParams } from "next/navigation";

export default function ShowScheduleTap() {
  const params = useParams();
  const showId = params.showId as string;
  const { data: scheduleData, isLoading, isError } = useCastingSchedules(showId);

  const { range, setRange, selectedCast, toggleCast, allArtists, roleNames, filteredSchedule } =
    useShowScheduleFilter(scheduleData);

  if (isLoading) return <div className="py-20 text-center">일정을 불러오는 중입니다...</div>;
  if (isError || !scheduleData) return <div className="py-20 text-center">일정을 불러오지 못했습니다.</div>;

  return (
    <Card className="p-0! bg-transparent! border-none! shadow-none!">
      <CardContent className="space-y-6 p-0!">
        {/* 날짜 필터 */}
        <ShowSchedulePicker range={range} setRange={setRange} />

        {/* 캐스팅 필터 */}
        <div className="flex flex-wrap gap-2">
          {allArtists.map((name) => (
            <Badge
              key={name}
              variant={selectedCast === name ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => toggleCast(name)}
            >
              {name}
            </Badge>
          ))}
        </div>

        {/* 일정 테이블 */}
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>관람일</TableHead>
              <TableHead>시간</TableHead>
              {roleNames.map((role) => (
                <TableHead key={role}>{role}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredSchedule.map((s) => {
              const dateObj = new Date(s.showTime);
              return (
                <TableRow key={s.scheduleId}>
                  <TableCell className="font-medium">{format(dateObj, "MM/dd(eee)", { locale: ko })}</TableCell>
                  <TableCell>{format(dateObj, "aaa h:mm", { locale: ko })}</TableCell>
                  {roleNames.map((role) => {
                    const casting = s.casts[role];
                    return <TableCell key={role}>{casting?.artistName || "-"}</TableCell>;
                  })}
                </TableRow>
              );
            })}
            {filteredSchedule.length === 0 && (
              <TableRow>
                <TableCell colSpan={roleNames.length + 2} className="text-center py-10 text-muted-foreground">
                  해당 조건의 공연 일정이 없습니다.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
