"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/features/auth/store/useAuthStore";
import { useWithdraw } from "@/features/my/hooks/useProfile";
import { WITHDRAW_NOTICE_SECTIONS } from "@/shared/data/withdraw";

export default function AccountDeletePage() {
  const [confirmText, setConfirmText] = useState("");
  const router = useRouter();
  const { user: storeUser } = useAuthStore();
  const { mutate: withdraw, isPending } = useWithdraw();

  // 백엔드 문제로 인한 임시 데이터 처리
  const user = storeUser || {
    email: "abc*****@gmail.com",
    nickname: "김관우",
    marketingInfoAgreed: true,
    emailNotificationAgreed: true,
  };

  const isValid = confirmText === "truve 탈퇴";

  const handleWithdraw = () => {
    if (!isValid) return;

    if (window.confirm("정말로 탈퇴하시겠습니까?\n탈퇴 시 모든 데이터가 삭제되며 복구할 수 없습니다.")) {
      withdraw(undefined, {
        onSuccess: () => {
          router.replace("/"); // 탈퇴 성공 후 메인 페이지로 이동
        },
      });
    }
  };

  return (
    <section className="pl-20 max-w-[1200] mx-auto">
      <div className="min-h-screen flex justify-center">
        <div className="w-full max-w-3xl px-6 py-16 space-y-10">
          {/* 페이지 타이틀 */}
          <div>
            <h1 className="text-3xl font-bold">계정 탈퇴</h1>
          </div>

          {/* 사용자 정보 */}
          <div className="flex items-center w-full max-w-4xl p-4 bg-[#f1f3f5] rounded-xl shadow-sm">
            {/* 아바타 영역 */}
            <div className="flex items-center justify-center w-12 h-12 bg-[#84849a] rounded-full mr-4">
              <span className="text-white text-lg font-bold">{user?.nickname?.[0] || user?.email?.[0] || "?"}</span>
            </div>

            {/* 이름 영역 */}
            <div className="flex items-baseline">
              <h2 className="text-2xl font-bold text-[#1a1a1b] tracking-tight">{user?.nickname}</h2>
              <span className="ml-1 text-2xl font-bold text-[#1a1a1b]">님</span>
            </div>
          </div>

          {/* 유의사항 섹션 */}
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-red-600">계정 탈퇴 유의 사항</h2>

            <div className="grid gap-6">
              {WITHDRAW_NOTICE_SECTIONS.map((section, idx) => (
                <div key={idx} className="space-y-2">
                  <h3 className="font-semibold text-foreground">{section.title}</h3>
                  <div className="text-sm text-muted-foreground leading-relaxed space-y-1">
                    {Array.isArray(section.content) ? (
                      section.content.map((item, i) => <p key={i}>• {item}</p>)
                    ) : (
                      <p>• {section.content}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* 확인 입력 */}
          <div className="space-y-4">
            <p className="text-sm text-red-500 font-bold">
              위 유의 사항을 충분히 숙지하고 동의하신다면, 아래 문구를 직접 입력해주세요.
            </p>

            {/* 이미지의 핑크색 강조 박스 재현 */}
            <p
              aria-label="입력 예시: truve 탈퇴"
              className="flex items-center h-14 w-full rounded-md px-3 py-2 bg-red-50 text-red-500 text-sm select-none"
            >
              truve 탈퇴
            </p>
            <Input
              placeholder="truve 탈퇴"
              className="h-14 bg-gray-50 border-none text-gray-500 text-lg focus-visible:ring-1 focus-visible:ring-gray-200"
              value={confirmText}
              onChange={(e) => setConfirmText(e.target.value)}
            />
          </div>

          {/* 버튼 영역 */}
          <div className="flex gap-3 pt-4 pb-20">
            {/* 뒤로가기 (좌측 버튼) */}
            <Button variant="ghost" className="flex-1 h-14 text-lg font-medium" onClick={() => router.back()}>
              뒤로가기
            </Button>

            {/* 탈퇴하기 (우측 버튼) */}
            <Button
              disabled={!isValid || isPending}
              variant="destructive"
              className="flex-1 h-14 border-none text-lg font-medium shadow-none disabled:bg-muted disabled:text-muted-foreground"
              onClick={handleWithdraw}
            >
              {isPending ? "처리 중..." : "truve 탈퇴"}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
