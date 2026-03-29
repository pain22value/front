import TermsContent from "@/shared/ui/policy/TermsContent";

export default function ServiceTermPage() {
  return (
    <main className="service-term-page">
      <section>
        <h1 className="text-2xl font-bold mt-10 mb-10">서비스 이용약관</h1>
        <TermsContent type="service" />
      </section>
    </main>
  );
}
