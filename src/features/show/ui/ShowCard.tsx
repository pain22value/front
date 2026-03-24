"use client";

import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";

export default function ShowCard({ showId, showTitle, venueName, posterUrl, date }: Show) {
  return (
    <Link href={`/shows/${showId}`} className="group">
      <Card className="bg-transparent border-none shadow-none">
        <CardContent className="p-0 space-y-3">
          <div className="aspect-3/4 relative overflow-hidden rounded-xl">
            <Image
              src={posterUrl}
              alt={showTitle}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>

          {/* 텍스트 */}
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">{venueName}</p>
            <p className="font-semibold text-base">{showTitle}</p>
            <p className="text-sm text-muted-foreground">{date}</p>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
