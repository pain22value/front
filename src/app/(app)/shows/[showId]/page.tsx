import { DetailCard } from "@/features/show/ui/detail/DetailCard";
import { ShowDetailTabs } from "@/features/show/ui/detail/ShowDetailTabs";
import { TicketingDateTimePicker } from "@/features/show/ui/detail/TicketingDateTimePicker";
import { tabs } from "@/shared/data/tabs";

// SSG 렌더링을 위해 정적 경로(params)를 생성합니다.
export async function generateStaticParams() {
  // 실제로는 API나 DB에서 전체 뮤지컬 ID 목록을 가져와야 합니다.
  // 예: const shows = await getShows();
  // return shows.map((show) => ({ showId: show.id }));

  return [{ showId: "1" }, { showId: "2" }, { showId: "3" }];
}

export default async function ShowDetailPage({ params }: { params: Promise<{ showId: string }> }) {
  console.log({ params: await params });
  return (
    <section className="pl-20">
      <div className="w-full px-10">
        <div className="grid grid-cols-1 md:grid-cols-[minmax(550px,65%)_minmax(300px,35%)] gap-4">
          <div className="col-span-[100%] md:col-span-[65%] space-y-12">
            {/* 상단 뮤지컬 정보 */}
            <DetailCard
              posterUrl="https://res.cloudinary.com/dfiaqyaug/image/upload/v1770427201/%ED%8A%B8%EB%A0%88%EC%9D%B4%EC%8A%A4%EC%9C%A0_s0l2yu.png"
              title="뮤지컬 <킹키부츠>"
              ranking="뮤지컬 주간 3위"
              rating={5}
              place="샤롯데씨어터"
              period="2025.12.17 ~ 2026.03.29"
              duration="155분 (인터미션 20분 포함)"
              ageLimit="8세 이상 관람가능"
              prices={[
                { seat: "VIP석", price: "170,000원" },
                { seat: "R석", price: "140,000원" },
                { seat: "S석", price: "110,000원" },
                { seat: "A석", price: "80,000원" },
                { seat: "OP석", price: "170,000원" },
              ]}
              benefit="truve 로그인 시 5% 할인"
            />

            {/* 탭 부분 (임시데이터 사용) */}
            <ShowDetailTabs tabs={tabs} />
          </div>

          <aside className="hidden md:block sticky top-(--header-height) self-start">
            <TicketingDateTimePicker />
          </aside>

          {/* <TicketingDateTimePicker /> */}
        </div>
      </div>
    </section>
  );
}
