import PrivacyPolicyContent from "@/shared/ui/policy/PrivacyPolicyContent";

export default function PrivacyPolicyPage() {
  return (
    <section className="pl-20 max-w-[850] mx-auto py-10">
      <div className="max-w-5xl mx-auto px-6 py-10 text-gray-800">
        <h1 className="text-2xl font-semibold mb-6">개인정보 수집 및 이용</h1>
        <PrivacyPolicyContent />
      </div>
    </section>
  );
}
