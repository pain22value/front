"use client";

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

export default function ArtistCard({ artist }: { artist: Artist }) {
  return (
    <Link href={`/artists/${artist.artistId}`} className="no-underline text-foreground">
      <Card className="bg-background border-0 shadow-none p-0">
        <CardContent className="flex flex-col gap-6 p-0">
          {/* 이미지 */}
          <div className="relative aspect-3/4 shrink-0 overflow-hidden rounded-2xl transition-transform hover:scale-[1.02]">
            <Image src={artist.profileImageUrl} alt={artist.artistName} width={300} height={400} className="w-full h-full object-cover" />
          </div>

          {/* 텍스트 영역 */}
          <div className="flex flex-col justify-end pb-2">
            <h3 className="text-2xl font-bold mb-4">{artist.artistName}</h3>
            <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
              출연: 뮤지컬 &lt;데스노트&gt; (2025) 뮤지컬 &lt;비트주스&gt; (2025)
            </p>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
