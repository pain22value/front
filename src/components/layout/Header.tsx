"use client";

import { Input } from "@/components/ui/input";
import { Bell, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { UserMenu } from "../common/UserMenu";
import { usePathname } from "next/navigation";
import { cn } from "@/shared/utils/cn";
import Link from "next/link";
import SheetMenu from "./SheetMenu";
import { useSidebarStore } from "@/shared/hooks/useSidebarStore";
// import { Separator } from "@/components/ui/separator";
// import { SearchForm } from "@/components/search-form"

export default function Header() {
  const pathname = usePathname();
  const { toggleSidebar } = useSidebarStore();

  // 다크 테마(히어로 섹션 등)가 적용되는 경로 패턴들 정의
  const darkPaths = ["/", "/actors/"];
  const isDarkPath = darkPaths.some((p) => (p === "/" ? pathname === "/" : pathname.startsWith(p)));

  return (
    <header
      className={cn(
        "sticky top-0 z-50 flex w-full items-center border-b transition-colors",
        isDarkPath ? "dark bg-background text-foreground" : "bg-background",
      )}
    >
      <div className="flex h-(--header-height) w-full items-center gap-2 px-4">
        {/* 좌측 */}
        <div className="flex items-center gap-3">
          <SheetMenu />
          <Link href="/" className="text-xl font-bold tracking-tight">
            truve
          </Link>
        </div>

        {/* 임시메뉴 */}
        {/* <nav className="ml-8">
          <ul className="flex items-center gap-6 text-sm font-medium text-gray-600">
            <li>임시메뉴 {`->`}</li>
            <li>
              <Button asChild variant="ghost">
                <Link href="/shows">뮤지컬 전체</Link>
              </Button>
            </li>
            <li>
              <Button asChild variant="ghost">
                <Link href="/shows/1">뮤지컬 공연 1번 상세페이지</Link>
              </Button>
            </li>
          </ul>
        </nav> */}

        {/* <Separator orientation="vertical" className="mr-2 h-4" /> */}

        {/* 우측 검색바 */}
        <div className="relative ml-auto w-[320px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="‘킹키부츠’" className="pl-9" />
        </div>

        {/* 우측 버튼들 */}
        <div className="flex items-center gap-2">
          <Button size="icon" variant="ghost">
            <Bell className="w-5 h-5" />
          </Button>
          <UserMenu />
        </div>

        {/* <SearchForm className="w-full sm:ml-auto sm:w-auto" /> */}
      </div>
    </header>
  );
}
