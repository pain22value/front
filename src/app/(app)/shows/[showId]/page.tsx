import { ShowDetailCard } from "@/features/show/ui/detail/ShowDetailCard";
import ShowScheduleTap from "@/features/show/ui/detail/ShowScheduleTap";
import { ShowDetailTabs } from "@/features/show/ui/detail/ShowDetailTabs";
import { ShowTicketingCard } from "@/features/show/ui/detail/ShowTicketingCard";
import { mockShow } from "@/shared/data/shows";
import { showInfoData } from "@/shared/data/tabs";
import ShowReviewTab from "@/features/show/ui/detail/ShowReviewTab";
// import { ENDPOINTS } from "@/shared/api/endpoints";

// export const revalidate = 60; // 재검증시간설정 : n초동안캐시

export async function generateStaticParams() {
  try {
    // const res = await fetch(`${process.env.API_URL}${ENDPOINTS.SHOWS.LIST}`);
    // if (!res.ok) throw new Error("Failed to fetch shows");
    // const shows = await res.json();
    // return shows.map((show: { id: number }) => ({ showId: show.id.toString() }));
    return [{ showId: "1" }, { showId: "2" }, { showId: "3" }];
  } catch (error) {
    console.error("Failed to generate static params:", error);
    return [{ showId: "1" }, { showId: "2" }, { showId: "3" }];
  }
}

// async function fetchShowDetail(showId: string) {
//   try {
//     const res = await fetch(`${process.env.API_URL}${ENDPOINTS.SHOWS.DETAIL}/${showId}`);
//     if (!res.ok) throw new Error("Failed to fetch show detail");
//     return res.json();
//   } catch (error) {
//     console.error(`fetchShowDetail error for ${showId}:`, error);
//     return null;
//   }
// }

export default async function ShowDetailPage({ params }: { params: Promise<{ showId: string }> }) {
  const { showId } = await params;
  console.log(showId);
  // const show = await fetchShowDetail(showId);

  return (
    <section className="pl-20">
      <section className="max-w-[1200] mx-auto p-0 xs:p-2 sm:p-4 md:p-6 lg:p-10 border border-dashed">
        <div className="grid grid-cols-1 md:grid-cols-[minmax(550px,65%)_minmax(300px,35%)] gap-8">
          <div className="col-span-[100%] md:col-span-[65%] space-y-20">
            {/* 상단 뮤지컬 정보 */}
            <ShowDetailCard {...mockShow} />
            {/* 탭 부분 */}
            <ShowDetailTabs info={showInfoData} casting={<ShowScheduleTap />} review={<ShowReviewTab />} />
          </div>
          {/* 모바일을 제외한 화면에서 우측에 고정된 상태로 떠있음 */}
          <aside className="hidden md:block sticky top-[calc(var(--header-height)+2.5rem)] self-start">
            <ShowTicketingCard />
          </aside>
        </div>
      </section>
    </section>
  );
}
