import { AppSidebar } from "@/components/layout/sidebar/AppSidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { InsetLeftSidebar } from "@/components/layout/sidebar/InsetLeftSidebar";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="[--header-height:calc(--spacing(14))]">
      <SidebarProvider defaultOpen={false} className="flex flex-col">
        <Header />
        <div className="flex flex-1">
          <AppSidebar />
          {/* SidebarInset -> main tag */}
          <SidebarInset className="min-h-screen">
            <InsetLeftSidebar />
            {children}
            <Footer />
          </SidebarInset>
        </div>
      </SidebarProvider>
    </div>
  );
}
