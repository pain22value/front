"use client";

import Image from "next/image";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { formatShowPeriod } from "@/shared/utils/date";

export function ShowDetailCard({
  title,
  venue,
  runtimeMin,
  ageLimit,
  startTime,
  endTime,
  description,
  posterUrl,
  noticeUrl,
  seatGrades,
  ranking,
  truveIndex,
  benefit,
}: ShowDetail) {
  const periodString = formatShowPeriod(startTime, endTime);
  const durationString = `${runtimeMin}분 (인터미션 포함)`;
  const ageLimitString = ageLimit === 0 ? "전체 관람가" : `${ageLimit}세 이상 관람가능`;

  return (
    <Card className="w-8/10 py-0 bg-transparent! border-none! shadow-none!">
      <CardHeader>
        <div className="space-y-2">
          <h2 className="text-2xl font-bold">{title}</h2>
          <div className="flex items-center gap-4 text-sm">
            {ranking && <span>{ranking}</span>}
            <div className="flex items-center font-medium">truve 지수 {truveIndex}%</div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex gap-2 xs:gap-4 sm:gap-6 md:gap-8 px-0">
        <div className="relative ">
          <Image
            src={posterUrl}
            alt={`${title} 포스터`}
            width={300}
            height={400}
            className="object-cover aspect-3/4 min-w-[200] rounded-md"
            priority
          />
        </div>
        <div className="space-y-8 whitespace-nowrap">
          <dl className="grid grid-cols-[6rem_1fr] gap-y-4 text-sm [&_dt]:font-medium [&_dt]:text-muted-foreground">
            <dt>장소</dt>
            <dd>{venue.name}</dd>
            <dt>공연기간</dt>
            <dd>{periodString}</dd>
            <dt>공연시간</dt>
            <dd>{durationString}</dd>
            <dt>관람연령</dt>
            <dd>{ageLimitString}</dd>
            <dt>가격</dt>
            <dd>
              <ul className="space-y-1">
                {seatGrades.map((grade) => (
                  <li key={grade.showSeatGradeId} className="flex justify-between">
                    <span>{grade.gradeName}</span>
                    <span>{grade.price.toLocaleString()}원</span>
                  </li>
                ))}
              </ul>
            </dd>
            {benefit && (
              <>
                <dt>혜택</dt>
                <dd>{benefit}</dd>
              </>
            )}
          </dl>
        </div>
      </CardContent>
    </Card>
  );
}
