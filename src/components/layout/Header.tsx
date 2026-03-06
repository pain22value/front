"use client";

import { Suspense } from "react";
import { Bell, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { UserMenu } from "../common/UserMenu";
import { usePathname } from "next/navigation";
import { cn } from "@/shared/utils/cn";
import Link from "next/link";
import SearchBar from "./SearchBar";
import { useSidebarStore } from "@/shared/hooks/useSidebarStore";

export default function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const { toggleSidebar } = useSidebarStore();

  return (
    <header
      className={cn(
        "sticky top-0 z-50 flex w-full items-center border-b transition-colors",
        isHome ? "dark bg-background text-foreground" : "bg-background",
      )}
    >
      <div className="flex h-(--header-height) w-full items-center gap-2 px-4">
        {/* 좌측 로고 및 메뉴 */}
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={(e) => {
              e.stopPropagation();
              toggleSidebar();
            }}
          >
            <Menu className="w-5 h-5" />
          </Button>
          <Link href="/" className="text-xl font-bold tracking-tight">
            truve
          </Link>
        </div>

        {/* 우측 검색바 섹션 */}
        <Suspense fallback={<div className="ml-auto w-[320px] h-9 bg-muted animate-pulse rounded-md" />}>
          <SearchBar />
        </Suspense>

        {/* 우측 아이콘 및 유저 메뉴 */}
        <div className="flex items-center gap-2">
          <Button size="icon" variant="ghost">
            <Bell className="w-5 h-5" />
          </Button>
          <UserMenu />
        </div>
      </div>
    </header>
  );
}
