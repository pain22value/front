import { ShowDetailCard } from "@/features/show/ui/detail/ShowDetailCard";
import { ShowDetailTabs } from "@/features/show/ui/detail/ShowDetailTabs";
import { ShowFloatingTicketingCard } from "@/features/show/ui/detail/ShowFloatingTicketingCard";
// import { notFound } from "next/navigation";
import { ENDPOINTS } from "@/shared/api/endpoints";
import { MOCK_SHOW_DETAIL } from "@/shared/data/shows";

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
    return [];
  }
}

// 공연 상세 정보 조회
async function fetchShowDetail(showId: string): Promise<ShowDetail> {
  try {
    const res = await fetch(`${process.env.API_URL}${ENDPOINTS.SHOWS.DETAIL}/${showId}`);
    if (!res.ok) throw new Error(`Failed to fetch show detail: ${res.status}`);
    const result: ApiResponse<ShowDetail> = await res.json();
    return result.data || MOCK_SHOW_DETAIL;
  } catch (error) {
    return MOCK_SHOW_DETAIL;
  }
}

export default async function ShowDetailPage({ params }: { params: Promise<{ showId: string }> }) {
  const { showId } = await params;

  // 데이터 패칭 실패 시 MOCK_SHOW_DETAIL을 fallback으로 사용하도록 함수 내부에 구현됨
  // 참고: 현재는 Server Component이므로 클라이언트 toast를 직접 띄울 수 없습니다.
  // 에러 발생 시 사용자 경험을 위해 에러 페이지(error.tsx)를 활용하거나,
  // 필요한 경우 Client Component로 에러 상태를 전달하여 toast를 띄워야 합니다.
  const show = await fetchShowDetail(showId);
  // if (!show) notFound();
  return (
    <section className="pl-20">
      <section className="max-w-[1200] mx-auto p-0 xs:p-2 sm:p-4 md:p-6 lg:p-10 border border-dashed">
        <div className="grid grid-cols-1 md:grid-cols-[minmax(550px,65%)_minmax(300px,35%)]/ md:grid-cols-[minmax(550px,1fr)_300px] gap-8">
          <div className="col-span-[100%] md:col-span-[65%] space-y-20">
            <ShowDetailCard {...show} />
            <ShowDetailTabs show={show} />
          </div>
          <aside className="hidden md:block sticky top-[calc(var(--header-height)+2.5rem)]">
            <ShowFloatingTicketingCard />
          </aside>
        </div>
      </section>
    </section>
  );
}
