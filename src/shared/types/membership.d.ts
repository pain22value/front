// 내 멤버십 정보 타입

type MyMembershipSummary = {
  activeMembershipCount: number;
  monthlyPaymentAmount: number;
};

type MyMembershipItem = {
  membershipId: number;
  artistId: number;
  artistName: string;
  profileImageUrl: string;
  status: string;
  statusLabel: string;
  joinedAt: string;
  nextBillingAt: string;
  remainingDays: number;
  monthlyAmount: number;
  cancelable: boolean;
};

type MyMembershipData = {
  summary: MyMembershipSummary;
  memberships: MyMembershipItem[];
};
