import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Sidebar from "@/components/layout/Sidebar";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="[--header-height:calc(--spacing(14))]">
      <Header />
      <section className="flex">
        <Sidebar />
        <section className="flex-1">{children}</section>
      </section>
      <Footer />
    </main>
  );
}
