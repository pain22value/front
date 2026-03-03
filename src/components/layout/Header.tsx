"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Bell, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { UserMenu } from "../common/UserMenu";
import { usePathname } from "next/navigation";
import { cn } from "@/shared/utils/cn";
import Link from "next/link";
import SheetMenu from "./SheetMenu";
import ConfirmModal from "../common/modals/ConfirmModal";
import AlertModal from "../common/modals/AlertModal";

export default function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [isErrorAlertOpen, setIsErrorAlertOpen] = useState(false);
  const [isSuccessAlertOpen, setIsSuccessAlertOpen] = useState(false);

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
          <SheetMenu />
          <Link href="/" className="text-xl font-bold tracking-tight">
            truve
          </Link>
        </div>

        {/* 모달 테스트를 위한 버튼들 */}
        <div className="flex items-center gap-2 ml-4">
          <Button variant="outline" size="sm" onClick={() => setIsConfirmDialogOpen(true)}>
            확인모달
          </Button>
          <Button variant="destructive" size="sm" onClick={() => setIsErrorAlertOpen(true)}>
            에러모달
          </Button>
          <Button variant="default" size="sm" onClick={() => setIsSuccessAlertOpen(true)}>
            성공모달
          </Button>
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
      </div>

      <ConfirmModal
        open={isConfirmDialogOpen}
        title="예매 내역이 없습니다."
        onOpenChange={setIsConfirmDialogOpen}
        onConfirm={() => setIsConfirmDialogOpen(false)}
        onCancel={() => setIsConfirmDialogOpen(false)}
      />

      <AlertModal
        open={isErrorAlertOpen}
        message="에러가 발생했습니다. 다시 시도해주세요."
        onConfirm={() => setIsErrorAlertOpen(false)}
      />

      <AlertModal
        open={isSuccessAlertOpen}
        message="성공적으로 처리되었습니다."
        onConfirm={() => setIsSuccessAlertOpen(false)}
      />
    </header>
  );
}
