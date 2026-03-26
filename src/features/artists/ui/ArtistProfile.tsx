import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";

export default function ArtistProfile({ artist }: { artist: Artist }) {
  return (
    <Card className="mb-6 overflow-hidden shadow-none transition-colors">
      <CardContent className="flex flex-col sm:flex-row gap-6">
        <div className="relative w-32 h-40 bg-slate-100 dark:bg-zinc-800 rounded-xl overflow-hidden shrink-0 mx-auto sm:mx-0">
          <Image
            src={artist.profileImageUrl}
            alt={artist.artistName}
            fill
            className="object-cover"
            priority
            sizes="128px"
          />
        </div>
        <div className="flex flex-col justify-center text-center sm:text-left">
          <h2 className="text-2xl font-extrabold mb-1 text-slate-900 dark:text-white">{artist.artistName}</h2>
          <p className="text-slate-500 dark:text-zinc-400 text-sm mb-3">뮤지컬 배우</p>
          <p className="text-slate-600 dark:text-zinc-300 text-[15px] leading-relaxed break-keep">
            이 아티스트의 소개가 아직 없습니다.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
