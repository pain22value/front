import TermsContent from "@/shared/ui/policy/TermsContent";

export default function ServiceTermPage() {
  return (
    <section className="pl-20 max-w-[850] mx-auto py-10">
      <div>
        <h1 className="text-2xl font-bold mb-10">서비스 이용약관</h1>
        <TermsContent type="service" />
      </div>
    </section>
  );
}
