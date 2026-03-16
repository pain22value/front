"use client";

import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image"; // 1. Image 컴포넌트 임포트
import { formatShowPeriod } from "@/shared/utils/date";

export default function ShowCard({ id, title, venue, image, startTime, endTime }: Show) {
  const period = formatShowPeriod(startTime, endTime);
  return (
    <Link href={`/shows/${id}`} className="group">
      <Card className="bg-transparent border-none shadow-none">
        <CardContent className="p-0 space-y-3">
          {/* 포스터 */}
          <div className="aspect-[3/4] relative overflow-hidden rounded-xl">
            {/* 2. img를 Image로 교체 */}
            <Image
              src={image}
              alt={title}
              fill // 부모 컨테이너(aspect-3/4)를 꽉 채우도록 설정
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>

          {/* 텍스트 */}
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">{venue}</p>
            <p className="font-semibold text-base">{title}</p>
            <p className="text-sm text-muted-foreground">{period}</p>
            {/* <p className="text-sm text-muted-foreground">{period}</p> */}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
