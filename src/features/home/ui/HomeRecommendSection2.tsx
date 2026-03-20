"use client";

import Image from "next/image";
import { BaseCarousel } from "@/components/common/BaseCarousel";
import { useHomeRecommendBanners } from "@/features/home/hooks/useHomeRecommendBanners";

export default function HomeRecommendSection2() {
  const { data: banners } = useHomeRecommendBanners();

  // API 응답 없으면 목업 데이터로 폴백 후, BaseCarousel의 id 제약을 맞추기 위해 bannerId → id 매핑
  // const rawItems: HomeBanner[] = banners ?? HOME_BANNER_RECOMMEND_LIST;
  const items = banners?.map((banner) => ({ ...banner, id: banner.bannerId })) ?? [];

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
