"use client";

import { useHomePromotions } from "@/features/home/hooks/useHomePromotions";
import { BaseCarousel } from "@/components/common/BaseCarousel";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import Link from "next/link";

export default function HomePromotions() {
  const { data: promotions, isLoading } = useHomePromotions();

  if (isLoading || !promotions?.length) return <HomeRecommendSectionSkeleton />;

  const items = [...promotions, ...promotions].map((promotion, index) => ({
    ...promotion,
    id: `${promotion.showId}-${index}`,
  }));

  return (
    <section className="space-y-8">
      <h1 className="font-semibold text-2xl">이 뮤지컬 어떠세요?</h1>
      <BaseCarousel
        items={items}
        itemsPerView={2}
        loop
        align="start"
        showButtonsOnHover
        showPagination={true}
        autoplay
        stopOnInteraction={false}
        stopOnMouseEnter
        renderItem={(item: Promotion) => (
          <Link href={`/shows/${item.showId}`} className="block">
            <div className={`h-[254] group relative overflow-hidden rounded-3xl transition-all duration-300 ease-in-out`}>
              <Image
                src={item.posterUrl}
                alt="Promotion Banner"
                width={1200}
                height={400}
                className="w-full h-full object-cover rounded-xl"
              />
            </div>
          </Link>
        )}
      />
    </section>
  );
}

function HomeRecommendSectionSkeleton() {
  return (
    <section className="space-y-8 overflow-hidden">
      <Skeleton className="h-8 w-48 bg-accent/50" />
      <div className="flex gap-6">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="basis-full sm:basis-1/2 shrink-0 h-[254] relative rounded-3xl overflow-hidden bg-accent/20">
            <Skeleton className="h-full w-full" />
          </div>
        ))}
      </div>
    </section>
  );
}
