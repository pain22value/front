"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

export default function AccountDeletePage() {
  const [confirmText, setConfirmText] = useState("");
  const isValid = confirmText === "truve 탈퇴";

  return (
    <div className="min-h-screen flex justify-center">
      <div className="w-full max-w-3xl px-6 py-16 space-y-10">
        {/* 페이지 타이틀 */}
        <div>
          <h1 className="text-3xl font-bold">계정 탈퇴</h1>
        </div>

        {/* 사용자 정보 */}
        <Card>
          <CardContent className="flex items-center gap-4 p-6">
            <Avatar>
              <AvatarFallback>김</AvatarFallback>
            </Avatar>
            <span className="text-lg font-medium">김관우님</span>
          </CardContent>
        </Card>

        {/* 유의사항 */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">유의 사항</h2>

          <Card>
            <CardContent className="p-6 text-sm text-muted-foreground space-y-2">
              <p>• 탈퇴 시 계정 정보는 복구할 수 없습니다.</p>
              <p>• 보유 중인 데이터는 모두 삭제됩니다.</p>
              <p>• 동일 이메일로 재가입 시 이전 데이터는 복원되지 않습니다.</p>
            </CardContent>
          </Card>
        </div>

        <Separator />

        {/* 확인 입력 */}
        <div className="space-y-3">
          <p className="text-sm text-red-500 font-medium">
            유의 사항을 충분히 숙지하고 동의하신다면, 아래 문구를 직접 입력해주세요.
          </p>

          <Input placeholder="truve 탈퇴" value={confirmText} onChange={(e) => setConfirmText(e.target.value)} />
        </div>

        {/* 버튼 영역 */}
        <div className="flex gap-4 pt-4">
          <Button variant="secondary" className="flex-1" onClick={() => window.history.back()}>
            뒤로가기
          </Button>

          <Button variant="destructive" disabled={!isValid} className="flex-1">
            truve 탈퇴
          </Button>
        </div>
      </div>
    </div>
  );
}
