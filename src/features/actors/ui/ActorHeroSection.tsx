"use client";

import Image from "next/image";
import ActorMembershipJoinSection from "./ActorMembershipJoinSection";

export default function ActorHeroSection({ actor }: { actor: Actor }) {
  return (
    <section
      className="relative w-full pl-20 bg-black text-white 
      rounded-b-4xl overflow-hidden pt-10"
    >
      <section className="max-w-[1200] mx-auto">
        <div className="relative max-w-[500] min-h-[300] ml-auto aspect-square">
          <Image
            src="https://res.cloudinary.com/dfiaqyaug/image/upload/v1773122721/image_45_zlkipp.png"
            alt="고은성"
            width={800}
            height={800}
            className="object-contain object-bottom"
          />
          {/* <Image src={actor.image} alt={actor.name} fill className="object-contain object-bottom" priority /> */}
        </div>
      </section>
      <section
        className="w-full max-w-[1200] mx-auto 
        absolute bottom-0 left-20 right-0 
        px-4 sm:px-6 lg:px-8"
      >
        <ActorMembershipJoinSection actor={actor} />
      </section>
    </section>
  );
}
