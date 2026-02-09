"use client";

import Image from "next/image";
import { Star } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export function DetailCard({
  posterUrl,
  title,
  ranking,
  rating = 5,
  place,
  period,
  duration,
  ageLimit,
  prices,
  benefit,
}: {
  posterUrl: string;
  title: string;
  ranking?: string;
  rating?: number;
  place: string;
  period: string;
  duration: string;
  ageLimit: string;
  prices: { seat: string; price: string }[];
  benefit?: string;
}) {
  return (
    <Card className="border">
      <CardHeader>
        <div className="space-y-2">
          <h2 className="text-2xl font-bold">{title}</h2>
          <div className="flex items-center gap-4 text-sm">
            {ranking && <span>{ranking}</span>}
            <div className="flex items-center">
              {Array.from({ length: rating }).map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-2 xs:gap-4 sm:gap-6 md:gap-8 ">
        <div className="relative /w-full aspect-[3/4]">
          <Image src={posterUrl} alt={`${title} 포스터`} fill className="object-cover rounded-md" priority />
        </div>
        <div className="space-y-8">
          <dl className="grid grid-cols-[6rem_1fr] gap-y-4 text-sm [&_dt]:font-medium [&_dt]:text-muted-foreground">
            <dt>장소</dt>
            <dd>{place}</dd>
            <dt>공연기간</dt>
            <dd>{period}</dd>
            <dt>공연시간</dt>
            <dd>{duration}</dd>
            <dt>관람연령</dt>
            <dd>{ageLimit}</dd>
            <dt>가격</dt>
            <dd>
              <ul className="space-y-1">
                {prices.map((price, index) => (
                  <li key={index} className="flex justify-between">
                    <span>{price.seat}</span>
                    <span>{price.price}</span>
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
