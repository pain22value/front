"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ChevronLeft } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarHeader,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";

// 목업 채팅 세션 리스트
const CHAT_SESSIONS = [
  { id: "1", name: "고은성", message: "안녕하세요" },
  { id: "2", name: "정선아", message: "안녕하세요" },
  { id: "3", name: "김호영", message: "안녕하세요" },
  { id: "4", name: "신재범", message: "안녕하세요" },
];

export function ChatSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar className="top-(--header-height) h-[calc(100svh-var(--header-height))] border-r">
      <SidebarHeader className="h-16 px-4 py-0 border-b flex flex-row items-center gap-2 text-sidebar-foreground">
        <Link href="/">
          <ChevronLeft className="w-5 h-5 cursor-pointer text-sidebar-foreground" />
        </Link>
        <h1 className="font-bold text-lg text-center flex-1 pr-5 text-sidebar-foreground">채팅 목록</h1>
      </SidebarHeader>
      <SidebarContent className="px-2 py-2">
        <SidebarGroup className="p-0">
          <SidebarMenu>
            {CHAT_SESSIONS.map((session) => (
              <ChatItem
                key={session.id}
                id={session.id}
                name={session.name}
                message={session.message}
                active={pathname === `/chat/${session.id}`}
              />
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}

function ChatItem({
  id,
  name,
  message,
  active = false,
}: {
  id: string;
  name: string;
  message: string;
  active?: boolean;
}) {
  return (
    <SidebarMenuItem className="mb-px">
      <SidebarMenuButton
        asChild
        isActive={active}
        size="lg"
        className="h-auto p-4 cursor-pointer hover:bg-sidebar-accent transition-colors text-sidebar-foreground data-[active=true]:bg-sidebar-accent"
      >
        <Link href={`/chat/${id}`} className="flex items-center gap-3">
          <Avatar className="w-12 h-12 border shrink-0">
            <AvatarFallback className="bg-background text-foreground border text-base font-medium">
              {name[0]}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0 text-sidebar-foreground">
            <div className="font-bold text-sm">{name}</div>
            <div className="text-xs text-muted-foreground truncate">{message}</div>
          </div>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}
