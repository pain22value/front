"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { X } from "lucide-react";

export default function NicknameChangeDialog({
  open,
  onOpenChange,
  onSubmit,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit?: (nickname: string) => void;
}) {
  const [nickname, setNickname] = useState("");

  const handleSubmit = () => {
    if (!nickname.trim()) return;
    onSubmit?.(nickname.trim());
    onOpenChange(false);
  };

  const isValid = nickname.length >= 1 && nickname.length <= 32;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] rounded-2xl p-8">
        <DialogHeader className="space-y-2">
          <p className="text-sm text-muted-foreground">닉네임 변경</p>
          <DialogTitle className="text-2xl font-bold">새 닉네임을 입력해주세요.</DialogTitle>
        </DialogHeader>

        <div className="space-y-8 mt-6">
          <div className="space-y-2">
            <Label>닉네임</Label>
            <div className="relative">
              <Input
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                placeholder="새로운 닉네임"
                className="pr-10"
                maxLength={32}
              />
              {nickname && (
                <button
                  type="button"
                  onClick={() => setNickname("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
            <p className="text-sm text-muted-foreground">
              1–32자 길이로 숫자, 특수문자 조합의 공통 닉네임이며, 나중에 계정 설정에서 변경할 수 있습니다.
            </p>
          </div>

          <div className="flex justify-between pt-4">
            <Button variant="ghost" onClick={() => onOpenChange(false)}>
              취소
            </Button>
            <Button onClick={handleSubmit} disabled={!isValid}>
              닉네임 변경
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
