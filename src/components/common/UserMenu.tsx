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
        <Button variant="ghost" size="icon" className="rounded-full overflow-hidden">
          <div className="size-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
            {user.nickname?.charAt(0)}
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[320px] p-4 bg-popover shadow-lg rounded-lg">
        {/* 사용자 이름 섹션 */}
        <DropdownMenuItem className="p-0 focus:bg-transparent">
          <Link
            href="/my/profile"
            className="w-full flex items-center justify-between px-2 py-3 hover:bg-accent rounded-lg transition-colors"
          >
            <span className="text-xl font-bold text-foreground">{user.nickname}님</span>
            <ChevronRight className="h-5 w-5 text-muted-foreground" />
          </Link>
        </DropdownMenuItem>

        {/* 메뉴 리스트 */}
        <div className="flex flex-col mt-2">
          <DropdownMenuItem className="p-0 focus:bg-transparent">
            <Link
              href="/mypage/bookings"
              className="w-full h-12 text-lg font-medium flex items-center justify-between px-2 py-3 hover:bg-accent rounded-lg transition-colors"
            >
              마이 티켓
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem className="p-0 focus:bg-transparent">
            <Link
              href="/my/membership"
              className="w-full h-12 text-lg font-medium flex items-center justify-between px-2 py-3 hover:bg-accent rounded-lg transition-colors"
            >
              마이 멤버십
            </Link>
          </DropdownMenuItem>
        </div>

        {/* 로그아웃 버튼 */}
        <div className="mt-4">
          <DropdownMenuItem className="p-0 focus:bg-transparent">
            <Button
              variant="ghost"
              onClick={signout}
              className="w-full h-12 text-lg font-medium flex items-center justify-between px-2 py-3 hover:bg-accent rounded-lg transition-colors"
            >
              로그아웃
            </Button>
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
