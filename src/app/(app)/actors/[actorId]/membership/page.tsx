import MembershipJoinSection from "@/features/actors/ui/membership/MembershipJoinSection";
import MembershipPayment from "@/features/actors/ui/membership/MembershipPayment";

export default function ActorMembershipPage() {
  return (
    <section>
      <MembershipPayment />
      <MembershipJoinSection />
    </section>
  );
}
