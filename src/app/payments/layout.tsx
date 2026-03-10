import Header from "@/components/layout/Header";

export default function PaymentsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="[--header-height:calc(--spacing(14))]">
      <Header />
      {children}
    </div>
  );
}