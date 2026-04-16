"use client";

import useMyMembershipQuery from "@/features/my/hooks/useMyMembershipQuery";
import MembershipCard from "./MembershipCard";
import SummaryCard from "./SummaryCard";

export default function MembershipDashboard() {
  const { data: membershipData, isLoading } = useMyMembershipQuery();

  if (isLoading) {
    return (
      <div className="font-sans text-foreground">
        <header className="mt-10 mb-8">
          <h1 className="text-3xl font-bold">마이 멤버십</h1>
        </header>
        <div className="animate-pulse space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="h-24 bg-muted rounded-xl" />
            <div className="h-24 bg-muted rounded-xl" />
          </div>
          <div className="h-40 bg-muted rounded-xl" />
        </div>
      </div>
    );
  }

  const { summary, memberships } = membershipData || {
    summary: { activeMembershipCount: 0, monthlyPaymentAmount: 0 },
    memberships: [],
  };

  return (
    <div className="font-sans text-foreground">
      <header className="mt-10 mb-8">
        <h1 className="text-3xl font-bold">마이 멤버십</h1>
      </header>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-14">
        <SummaryCard title="활성 멤버십" value={summary.activeMembershipCount} />
        <SummaryCard title="월 결제" value={`${summary.monthlyPaymentAmount.toLocaleString()}원`} />
      </div>
      <section>
        <h2 className="text-xl font-bold mb-8">멤버십 목록</h2>
        <ul className="space-y-6">
          {memberships.length === 0 ? (
            <div className="border-t border-border py-24 flex flex-col items-center justify-center">
              <p className="text-muted-foreground text-lg font-medium">내 멤버십 내역이 없습니다.</p>
            </div>
          ) : (
            memberships.map((item) => (
              <MembershipCard
                key={item.membershipId}
                membershipId={item.membershipId}
                artistId={item.artistId}
                name={item.artistName}
                imageUrl={item.profileImageUrl}
                joinDate={item.joinedAt}
                nextPaymentDate={item.nextBillingAt}
                daysLeft={`${item.remainingDays}일 남음`}
                price={`${item.monthlyAmount.toLocaleString()}원`}
              />
            ))
          )}
        </ul>
      </section>
    </div>
  );
}
