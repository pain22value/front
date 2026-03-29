import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import Footer from "@/components/layout/Footer";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <Sidebar />
      {children}
      <Footer />
      {/* <section className="flex">
        <Sidebar />
        {children}
      </section> */}
    </>
  );
}
