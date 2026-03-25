"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuthStore } from "@/features/auth/store/useAuthStore";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
// import { Card, CardContent } from "@/components/ui/card";

export function UserMenu() {
  const { user, signout } = useAuthStore();

  if (!user) {
    return (
      <Button asChild variant={"outline"}>
        <Link href="/signin">로그인</Link>
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full">
          <div className="w-8 h-8 rounded-full bg-muted" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[320] p-4 bg-popover shadow-lg rounded-lg">
        {/* 사용자 이름 섹션 */}
        <DropdownMenuItem asChild className="p-0 focus:bg-transparent">
          <Link
            href="/my/profile"
            className="flex items-center justify-between px-2 py-3 hover:bg-accent rounded-lg transition-colors"
          >
            <span className="text-xl font-bold text-foreground">{user.nickname}님</span>
            <ChevronRight className="h-5 w-5 text-muted-foreground" />
          </Link>
        </DropdownMenuItem>

        {/* 메뉴 리스트 */}
        <div className="flex flex-col mt-2">
          <DropdownMenuItem asChild className="p-0 focus:bg-transparent">
            <Button variant="ghost" asChild className="w-full justify-start text-lg font-medium h-12 px-2">
              <Link href="/mypage/bookings">마이 티켓</Link>
            </Button>
          </DropdownMenuItem>
          <DropdownMenuItem asChild className="p-0 focus:bg-transparent">
            <Button variant="ghost" asChild className="w-full justify-start text-lg font-medium h-12 px-2">
              <Link href="/my/membership">마이 멤버십</Link>
            </Button>
          </DropdownMenuItem>
        </div>

        {/* 로그아웃 버튼 */}
        <div className="mt-4">
          <DropdownMenuItem asChild className="p-0 focus:bg-transparent">
            <Button
              variant="ghost"
              onClick={signout}
              className="w-fit text-muted-foreground hover:text-foreground font-normal p-2 h-auto text-base hover:bg-transparent"
            >
              로그아웃
            </Button>
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
