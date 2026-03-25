import { showService } from "@/features/show/services/showService";
import { ShowDetailCard } from "@/features/show/ui/detail/ShowDetailCard";
import { ShowDetailTabs } from "@/features/show/ui/detail/ShowDetailTabs";
import ShowDetailScheduleCard from "@/features/show/ui/detail/ShowDetailScheduleCard";
import { ENDPOINTS } from "@/shared/api/endpoints";
// import { notFound } from "next/navigation";

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

export default async function ShowDetailPage({ params }: { params: Promise<{ showId: string }> }) {
  const { showId } = await params;
  const show = await showService.getShowDetail(showId);
  // console.log({ show });
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
            <ShowDetailScheduleCard show={show} />
          </aside>
        </div>
      </section>
    </section>
  );
}
