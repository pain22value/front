"use client";

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";

export default function ArtistCard({ artist }: { artist: Artist }) {
  return (
    <Card className="bg-background border-0 shadow-none p-0">
      <CardContent className="flex flex-col gap-6 p-0">
        {/* 이미지 */}
        <div className="relative aspect-3/4 shrink-0 overflow-hidden rounded-2xl">
          <Image src={artist.image} alt={artist.name} fill className="object-cover" sizes="220px" priority />
        </div>

        {/* 텍스트 영역 */}
        <div className="flex flex-col justify-end pb-2">
          <h3 className="text-2xl font-bold mb-4">{artist.name}</h3>
          <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
            {artist.description || `출연: 뮤지컬 <데스노트> (2025) 뮤지컬 <비트주스> (2025)`}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
