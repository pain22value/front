import { showService } from "@/features/show/services/showService";
import { ShowDetailCard } from "@/features/show/ui/detail/ShowDetailCard";
import { ShowDetailTabs } from "@/features/show/ui/detail/ShowDetailTabs";
import ShowDetailScheduleCard from "@/features/show/ui/detail/ShowDetailScheduleCard";
import { ENDPOINTS } from "@/shared/api/endpoints";
// import { notFound } from "next/navigation";

// export const revalidate = 60; // 재검증시간설정 : n초동안캐시

export async function generateStaticParams() {
  try {
    const res = await fetch(`${process.env.API_URL}${ENDPOINTS.HOME.SHOWS}`);
    if (!res.ok) throw new Error("공연 목록을 불러오는 데 실패했습니다.");
    const result: ApiResponse<ShowsData> = await res.json();
    const shows = result.data?.shows || [];
    console.log({ showsCount: shows.length });
    return shows.map((show) => ({ showId: show.showId.toString() }));
  } catch (error) {
    console.error("정적 파라미터 생성 중 오류 발생:", error);
    return [];
  }
}

export default async function ShowDetailPage({ params }: { params: Promise<{ showId: string }> }) {
  const { showId } = await params;
  const show = await showService.getShowDetail(showId);
  console.log({ show });
  // if (!show) notFound();
  return (
    <main className="show-detail-page">
      <section className="grid grid-cols-1 md:grid-cols-[minmax(550px,1fr)_300px] gap-0 md:gap-8">
        <div className="col-span-[100%] md:col-span-[65%] space-y-20">
          <ShowDetailCard {...show} />
          <ShowDetailTabs show={show} />
        </div>
        <div className="sticky top-[calc(var(--header-height)+2.5rem)] self-start">
          <ShowDetailScheduleCard show={show} />
        </div>
      </section>
    </main>
  );
}
