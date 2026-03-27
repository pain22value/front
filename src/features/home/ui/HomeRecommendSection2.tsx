"use client";

import { useHomeRecommendBanners } from "@/features/home/hooks/useHomeRecommendBanners";
import { HOME_BANNER_RECOMMEND_LIST } from "@/shared/data/shows";
import { BaseCarousel } from "@/components/common/BaseCarousel";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";

export default function HomeRecommendSection2() {
  const { data: banners, isLoading } = useHomeRecommendBanners();

  if (isLoading) return <HomeRecommendSectionSkeleton />;

  // API 응답 없으면 목업 데이터로 폴백 후, BaseCarousel의 id 제약을 맞추기 위해 bannerId → id 매핑
  const displayItems = banners && banners.length > 0 ? banners : HOME_BANNER_RECOMMEND_LIST;
  const items = displayItems.map((banner) => ({ ...banner, id: banner.bannerId }));

  return (
    <section className="max-w-[1200] mx-auto space-y-8">
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
        renderItem={(item) => (
          <div className={`h-[254] group relative overflow-hidden rounded-3xl transition-all duration-300 ease-in-out`}>
            <Image src={item.posterUrl} alt={item.showTitle} fill className="object-cover rounded-xl" />
          </div>
        )}
      />
    </section>
  );
}

function HomeRecommendSectionSkeleton() {
  return (
    <section className="max-w-[1200] mx-auto space-y-8">
      <Skeleton className="h-8 w-48 bg-accent/50" />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {Array.from({ length: 2 }).map((_, i) => (
          <div key={i} className="h-[254] w-full relative rounded-3xl overflow-hidden bg-accent/20">
            <Skeleton className="h-full w-full" />
          </div>
        ))}
      </div>
    </section>
  );
}
