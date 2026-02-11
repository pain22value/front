import Image from "next/image";
import { BaseCarousel } from "@/components/common/BaseCarousel";
import { recommendShows2 } from "@/shared/data/shows";

export default function HomeRecommendSection2() {
  return (
    <section className="max-w-[1200] mx-auto space-y-8">
      <h1 className="font-semibold text-2xl">이 뮤지컬 어떠세요?</h1>
      <BaseCarousel
        items={recommendShows2}
        itemsPerView={2}
        loop
        align="start"
        showButtonsOnHover
        showPagination={true}
        renderItem={(item) => (
          <div className={`h-[254] group relative overflow-hidden rounded-xl transition-all duration-300 ease-in-out`}>
            {/* 포스터 */}
            <Image
              src={item.image}
              alt={item.title}
              width={591}
              height={254}
              className="/w-full w-full max-w-[591] h-full object-contain rounded-xl"
            />
          </div>
        )}
      />
    </section>
  );
}
