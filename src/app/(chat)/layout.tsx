import Header from "@/components/layout/Header";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { ChatSidebar } from "@/features/chat/ui/ChatSidebar";

export default function ChatLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <SidebarProvider className="min-h-0 h-[calc(100svh-var(--header-height))] w-full">
        <ChatSidebar />
        <SidebarInset className="flex-1 flex flex-col h-full bg-background relative overflow-hidden">
          {children}
        </SidebarInset>
      </SidebarProvider>
    </>
  );
}
