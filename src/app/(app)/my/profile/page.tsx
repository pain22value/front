"use client";

import { useState } from "react";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import PasswordChangeDialog from "@/features/my/profile/ui/PasswordChangeDialog";
import NicknameChangeDialog from "@/features/my/profile/ui/NicknameChangeDialog";

export default function ProfileEditPage() {
  const [isPasswordChangeOpen, setIsPasswordChangeOpen] = useState(false);
  const [isNicknameChangeOpen, setIsNicknameChangeOpen] = useState(false);

  return (
    <>
      <div className="max-w-2xl mx-auto p-6 space-y-8 bg-background text-foreground min-h-screen">
        <h1 className="text-2xl font-bold mb-6">개인정보 수정</h1>

        {/* 사용자 프로필 헤더 */}
        <Card className="bg-muted border-none shadow-sm">
          <CardContent className="flex items-center gap-4 py-6">
            <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center text-accent-foreground font-bold text-lg">
              김
            </div>
            <span className="text-xl font-semibold">김관우님</span>
          </CardContent>
        </Card>

        {/* 기본 정보 섹션 */}
        <div className="space-y-6">
          <div className="space-y-1">
            <label className="text-sm font-bold">이메일</label>
            <div className="text-muted-foreground py-2">abc*****@gmail.com</div>
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
              <div className="text-muted-foreground">김관우</div>
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
            <Switch defaultChecked />
          </div>

          <div className="flex items-center justify-between">
            <span className="font-medium">알림 수신 설정 (이메일)</span>
            <Switch defaultChecked />
          </div>
        </div>

        <Separator />

        {/* 약관 및 정책 섹션 */}
        <div className="space-y-6">
          <h2 className="text-lg font-bold">약관 및 정책</h2>

          <nav className="space-y-4">
            <NavItem label="서비스 이용약관" />
            <NavItem label="전자금융거래 이용약관" />
            <NavItem label="개인정보 수집 및 이용" />
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
          console.log(data);
          setIsPasswordChangeOpen(false);
        }}
      />

      <NicknameChangeDialog
        open={isNicknameChangeOpen}
        onOpenChange={setIsNicknameChangeOpen}
        onSubmit={(nickname) => {
          console.log("New nickname:", nickname);
          setIsNicknameChangeOpen(false);
        }}
      />
    </>
  );
}

// 리스트 아이템 공통 컴포넌트
const NavItem = ({ label }: { label: string }) => (
  <div className="flex items-center justify-between cursor-pointer py-2 group">
    <span className="font-medium group-hover:text-primary transition-colors">{label}</span>
    <ChevronRight className="w-5 h-5 text-muted-foreground" />
  </div>
);
