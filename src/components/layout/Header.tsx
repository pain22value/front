"use client";

import { Suspense, useState } from "react";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { UserMenu } from "../common/UserMenu";
import { usePathname } from "next/navigation";
import { cn } from "@/shared/utils/cn";
import Link from "next/link";
import SheetMenu from "./SheetMenu";
import ConfirmModal from "../common/modals/ConfirmModal";
import AlertModal from "../common/modals/AlertModal";
import SearchBar from "./SearchBar";

export default function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  // 모달 상태 관리
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [isErrorAlertOpen, setIsErrorAlertOpen] = useState(false);
  const [isSuccessAlertOpen, setIsSuccessAlertOpen] = useState(false);

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
          <SheetMenu />
          <Link href="/" className="text-xl font-bold tracking-tight">
            truve
          </Link>
        </div>

        {/* 모달 테스트 버튼들 */}
        <div className="flex items-center gap-2 ml-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsConfirmDialogOpen(true)}
          >
            확인모달
          </Button>
          <Button
            variant="destructive"
            size="sm"
            onClick={() => setIsErrorAlertOpen(true)}
          >
            에러모달
          </Button>
          <Button
            variant="default"
            size="sm"
            onClick={() => setIsSuccessAlertOpen(true)}
          >
            성공모달
          </Button>
        </div>

        {/* 우측 검색바 섹션 */}
        <Suspense
          fallback={
            <div className="ml-auto w-[320px] h-9 bg-muted animate-pulse rounded-md" />
          }
        >
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

      {/* 모달 컴포넌트들 */}
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
