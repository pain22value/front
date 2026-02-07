"use client";

import { Input } from "@/components/ui/input";
import { Bell, Menu, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSidebar } from "@/components/ui/sidebar";
import { UserMenu } from "../common/UserMenu";
import { usePathname } from "next/navigation";
import { cn } from "@/shared/utils/cn";
// import { Separator } from "@/components/ui/separator";
// import { SearchForm } from "@/components/search-form"

export default function Header() {
  const { toggleSidebar } = useSidebar();
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <header
      className={cn(
        "sticky top-0 z-50 flex w-full items-center border-b transition-colors ",
        isHome ? "dark bg-background text-foreground" : "bg-background",
      )}
    >
      <div className="flex h-(--header-height) w-full items-center gap-2 px-4">
        {/* 좌측 */}
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={toggleSidebar}>
            <Menu className="w-5 h-5" />
          </Button>
          <span className="text-xl font-bold tracking-tight">truve</span>
        </div>

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
