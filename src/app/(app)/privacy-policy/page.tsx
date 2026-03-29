import PrivacyPolicyContent from "@/shared/ui/policy/PrivacyPolicyContent";

export default function PrivacyPolicyPage() {
  return (
    <main className="privacy-policy-page">
      <section>
        <h1 className="text-2xl font-semibold mb-6">개인정보 수집 및 이용</h1>
        <PrivacyPolicyContent />
      </section>
    </main>
  );
}
