"use client";

import { useProfile } from "@/features/my/hooks/useProfile";
import PasswordChangeDialog from "@/features/my/ui/PasswordChangeDialog";
import NicknameChangeDialog from "@/features/my/ui/NicknameChangeDialog";
import PolicyDialog from "@/shared/ui/policy/PolicyDialog";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

export default function ProfilePage() {
  const { user, states, actions } = useProfile();
  const {
    isPasswordChangeOpen,
    isNicknameChangeOpen,
    selectedPolicy,
    isPolicyOpen,
    marketingChecked,
    emailNotifChecked,
  } = states;

  const {
    setIsPasswordChangeOpen,
    setIsNicknameChangeOpen,
    setIsPolicyOpen,
    openPolicy,
    handleMarketingChange,
    handleEmailNotifChange,
    handleNicknameSubmit,
  } = actions;

  return (
    <section className="pl-20 max-w-[1200] mx-auto">
      <div className="max-w-2xl mx-auto p-6 space-y-8 bg-background text-foreground min-h-screen">
        <h1 className="text-2xl font-bold mb-6">계정정보</h1>

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

        {/* 기본 정보 섹션 */}
        <div className="space-y-6">
          <div className="space-y-1">
            <label className="text-sm font-bold">이메일</label>
            <div className="text-muted-foreground py-2">{user?.email}</div>
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <label className="text-sm font-bold">비밀번호</label>
              <div className="text-muted-foreground">비밀번호 설정</div>
            </div>
            <Button variant="outline" onClick={() => setIsPasswordChangeOpen(true)}>
              변경
            </Button>
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <label className="text-sm font-bold">닉네임</label>
              <div className="text-muted-foreground">{user?.nickname}</div>
            </div>
            <Button variant="outline" onClick={() => setIsNicknameChangeOpen(true)}>
              변경
            </Button>
          </div>
        </div>

        <Separator />

        {/* 알림 설정 섹션 */}
        <div className="space-y-6">
          <h2 className="text-lg font-bold">알림 설정</h2>

          <div className="flex items-center justify-between">
            <span className="font-medium">마케팅 정보 수신 동의</span>
            <Switch checked={marketingChecked} onCheckedChange={handleMarketingChange} />
          </div>

          <div className="flex items-center justify-between">
            <span className="font-medium">알림 수신 설정 (이메일)</span>
            <Switch checked={emailNotifChecked} onCheckedChange={handleEmailNotifChange} />
          </div>
        </div>

        <Separator />

        {/* 약관 및 정책 섹션 */}
        <div className="space-y-6">
          <h2 className="text-lg font-bold">약관 및 정책</h2>

          <nav className="space-y-4">
            <NavItem label="서비스 이용약관" onClick={() => openPolicy("service")} />
            <NavItem label="전자금융거래 이용약관" onClick={() => openPolicy("finance")} />
            <NavItem label="개인정보 수집 및 이용" onClick={() => openPolicy("privacy")} />
          </nav>
        </div>

        {/* 계정 탈퇴 섹션 (추가됨) */}
        <div className="pt-4">
          <Link href="/my/profile/delete" className="flex items-center justify-between cursor-pointer py-4 group">
            <span className="text-lg font-bold group-hover:text-destructive transition-colors">계정 탈퇴</span>
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </Link>
        </div>
      </div>

      <PasswordChangeDialog
        open={isPasswordChangeOpen}
        onOpenChange={setIsPasswordChangeOpen}
        onSubmit={(data) => {
          console.log("Password change requested:", data);
          setIsPasswordChangeOpen(false);
          // TODO: 비밀번호 변경 연동
        }}
      />

      <NicknameChangeDialog
        open={isNicknameChangeOpen}
        onOpenChange={setIsNicknameChangeOpen}
        onSubmit={handleNicknameSubmit}
      />
      <PolicyDialog open={isPolicyOpen} onOpenChange={setIsPolicyOpen} type={selectedPolicy} />
    </section>
  );
}

// 리스트 아이템 공통 컴포넌트
const NavItem = ({ label, onClick }: { label: string; onClick?: () => void }) => (
  <div className="flex items-center justify-between cursor-pointer py-2 group" onClick={onClick}>
    <span className="font-medium group-hover:text-primary transition-colors">{label}</span>
    <ChevronRight className="w-5 h-5 text-muted-foreground" />
  </div>
);
