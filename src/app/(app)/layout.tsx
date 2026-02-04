import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/sidebar/AppSidebar";
import { Test } from "@/components/layout/sidebar/Sidebar";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="[--header-height:calc(--spacing(14))]">
      <SidebarProvider defaultOpen={false} className="flex flex-col">
        <Header />
        <div className="flex flex-1">
          <AppSidebar />
          <SidebarInset className="flex-row!">
            <Test />
            <div>
              {children}
              <Footer />
            </div>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </div>
  );
}
