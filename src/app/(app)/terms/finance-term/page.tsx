import TermsContent from "@/shared/ui/policy/TermsContent";

export default function FinanceTermPage() {
  return (
    <main className="finance-term-page">
      <section>
        <h1 className="text-2xl font-bold mb-10">전자금융거래 이용약관</h1>
        <TermsContent type="finance" />
      </section>
    </main>
  );
}
