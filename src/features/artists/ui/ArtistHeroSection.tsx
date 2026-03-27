"use client";

import Image from "next/image";
import ArtistMembershipJoinSection from "./ArtistMembershipJoinSection";

export default function ArtistHeroSection({ artist }: { artist: Artist }) {
  return (
    <section
      className="relative w-full pl-20 bg-black text-white 
      rounded-b-4xl overflow-hidden pt-10"
    >
      <section className="max-w-[1200] mx-auto">
        <div className="relative max-w-[500] min-h-[300] ml-auto aspect-square">
          <Image
            src={artist.profileImageUrl}
            alt={artist.artistName}
            fill
            className="object-contain object-bottom"
            priority
            sizes="(max-width: 768px) 100vw, 500px"
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
