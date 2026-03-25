import TermsContent from "@/shared/ui/policy/TermsContent";

export default function FinanceTermPage() {
  return (
    <section className="pl-20 max-w-[850] mx-auto py-10">
      <div>
        <h1 className="text-2xl font-bold mb-10">전자금융거래 이용약관</h1>
        <TermsContent type="finance" />
      </div>
    </section>
  );
}
