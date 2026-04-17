"use client";

import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { UserMenu } from "../common/UserMenu";
import ModeToggle from "../common/ModeToggle";
import { usePathname } from "next/navigation";
import { cn } from "@/shared/utils/cn";
import Link from "next/link";
import { useSidebarStore } from "@/shared/hooks/useSidebarStore";
import { Suspense } from "react";
import SearchBar from "./SearchBar";

export default function Header() {
  const pathname = usePathname();
  const { toggleSidebar } = useSidebarStore();

  // 다크 테마(히어로 섹션 등)가 적용되는 경로 패턴들 정의
  const darkPaths = ["/", "/artists/"];
  const isDarkPath = darkPaths.some((p) => (p === "/" ? pathname === "/" : pathname.startsWith(p)));

  return (
    <header
      className={cn(
        "sticky top-0 z-50 flex w-full items-center border-b transition-colors",
        isDarkPath ? "dark bg-background text-foreground" : "bg-background",
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

        {/* 우측 버튼들 */}
        <div className="flex items-center gap-2">
          <ModeToggle />
          <UserMenu />
        </div>
      </div>
    </header>
  );
}
