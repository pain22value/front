import { MEMBERSHIP_LIST } from "@/shared/data/memberships";
import MembershipCard from "./MembershipCard";
import SummaryCard from "./SummaryCard";

export default function MembershipDashboard() {
  // 목업 데이터 기준 요약 정보
  const activeMemberships: number = MEMBERSHIP_LIST.length;
  const monthlyPayment: string = "15,000";

  return (
    <div className="font-sans text-gray-900">
      <header className="mt-10 mb-8">
        <h1 className="text-3xl font-bold">마이 멤버십</h1>
      </header>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-14">
        <SummaryCard title="활성 멤버십" value={activeMemberships} />
        <SummaryCard title="월 결제" value={`${monthlyPayment}원`} />
      </div>
      <section>
        <h2 className="text-xl font-bold mb-8">멤버십 목록</h2>
        <ul className="space-y-6">
          {MEMBERSHIP_LIST.length === 0 ? (
            <div className="border-t border-gray-100 py-24 flex flex-col items-center justify-center">
              <p className="text-gray-500 text-lg font-medium">내 멤버십 내역이 없습니다.</p>
            </div>
          ) : (
            MEMBERSHIP_LIST.map((item) => <MembershipCard key={item.id} {...item} />)
          )}
        </ul>
      </section>
    </div>
  );
}
