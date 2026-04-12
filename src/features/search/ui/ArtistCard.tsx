"use client";

import Image from "next/image";
import Link from "next/link";

export default function ArtistCard({ artist }: { artist: Artist }) {
  return (
    <Link href={`/artists/${artist.artistId}`} className="block group">
      <div className="relative w-full aspect-3/4 rounded-xl overflow-hidden mb-4 bg-muted transition-all">
        {artist.profileImageUrl && (
          <Image
            src={artist.profileImageUrl}
            alt={artist.artistName}
            width={300}
            height={400}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        )}
      </div>
      <h3 className="font-semibold group-hover:underline text-base text-slate-900 dark:text-slate-100">
        {artist.artistName}
      </h3>
      <p className="text-sm text-muted-foreground mt-1 line-clamp-2 leading-relaxed">
        출연: 뮤지컬 &lt;데스노트&gt; (2025) 뮤지컬 &lt;비트주스&gt; (2025)
      </p>
    </Link>
  );
}
