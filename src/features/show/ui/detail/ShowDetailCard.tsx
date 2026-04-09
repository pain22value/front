"use client";

import Image from "next/image";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { formatShowPeriod } from "@/shared/utils/date";
import { Skeleton } from "@/components/ui/skeleton";
import { useReviewMeta } from "../../hooks/useReviews";
import { Users, TrendingUp } from "lucide-react";

export default function ShowDetailCard(props: ShowDetail) {
  const {
    showId,
    title,
    venue,
    runtimeMin,
    ageLimit,
    startTime,
    endTime,
    posterUrl,
    seatGrades,
    ranking,
    truveIndex,
    benefit,
  } = props;

  const { data: reviewMeta } = useReviewMeta(showId);
  const displayTruveIndex = reviewMeta?.truveScore ?? truveIndex ?? 0;

  const periodString = formatShowPeriod(startTime, endTime);
  const durationString = `${runtimeMin}분 (인터미션 포함)`;
  const ageLimitString = ageLimit === 0 ? "전체 관람가" : `${ageLimit}세 이상 관람가능`;

  return (
    <Card className="py-0 bg-transparent! border-none! shadow-none!">
      <CardHeader className="p-0">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold">{title}</h2>
          <div className="flex items-center gap-3 text-sm">
            <div className="flex items-center gap-1.5 font-medium text-foreground">
              <Users className="h-4 w-4 text-muted-foreground" />
              <span>뮤지컬 주간 {reviewMeta?.weeklyRanking || 0}위</span>
            </div>
            <div className="flex items-center gap-1.5 font-medium text-foreground">
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
              <span>truve 지수 {displayTruveIndex}%</span>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6 md:gap-8 px-0">
        <div className="flex-1 w-full min-w-[150px] relative max-w-[300px] aspect-3/4 overflow-hidden rounded-md">
          {posterUrl ? (
            <Image
              src={posterUrl}
              alt={`${title} 포스터`}
              width={300}
              height={400}
              className="w-full h-full object-cover"
            />
          ) : (
            <Skeleton className="size-full" />
          )}
        </div>
        <div className="flex-[1.5] w-full space-y-8">
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
                  <li key={grade.showSeatGradeId} className="flex gap-4">
                    <span className="font-semibold text-muted-foreground">{grade.gradeName}석</span>
                    <span className="font-medium">{grade.price.toLocaleString()}원</span>
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
