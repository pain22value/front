"use client";

import Image from "next/image";
import ArtistMembershipJoinSection from "./ArtistMembershipJoinSection";
import { useArtistDetail } from "../hooks/useArtist";

export default function ArtistHero({ artistId }: { artistId: string }) {
  const { data, isLoading } = useArtistDetail(artistId);

  if (isLoading || !data) {
    return <div className="h-[400px] w-full bg-black/10 animate-pulse rounded-b-4xl" />;
  }

  const { artist } = data;

  return (
    <section className="relative w-full pl-20 bg-black text-white rounded-b-4xl overflow-hidden pt-10">
      <section className="max-w-[1200] mx-auto">
        <div className="relative max-w-[500] min-h-[300] ml-auto aspect-square">
          <Image
            src={artist.profileImageUrl}
            alt={artist.artistName}
            width={500}
            height={500}
            className="w-full h-full object-contain object-bottom"
            priority
          />
        </div>
      </section>
      <section
        className="w-full max-w-[1200] mx-auto 
        absolute bottom-0 left-20 right-0 
        px-4 sm:px-6 lg:px-8"
      >
        <ArtistMembershipJoinSection artist={artist} />
      </section>
    </section>
  );
}
