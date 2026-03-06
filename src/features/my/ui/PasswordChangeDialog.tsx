"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function PasswordChangeDialog({
  open,
  onOpenChange,
  onSubmit,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: { currentPassword: string; newPassword: string; confirmPassword: string }) => void;
}) {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleSubmit = () => {
    onSubmit({
      currentPassword,
      newPassword,
      confirmPassword,
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] rounded-2xl p-8">
        <DialogHeader className="space-y-2">
          <p className="text-sm text-muted-foreground">비밀번호 변경</p>
          <DialogTitle className="text-2xl font-bold">새 비밀번호를 설정해 주세요.</DialogTitle>
        </DialogHeader>

        <div className="space-y-8 mt-6">
          {/* 현재 비밀번호 */}
          <div className="space-y-2">
            <Label>현재 비밀번호</Label>
            <div className="relative">
              <Input
                type={showCurrent ? "text" : "password"}
                placeholder="현재 비밀번호"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="pr-10"
              />
              <button
                type="button"
                onClick={() => setShowCurrent(!showCurrent)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              >
                {showCurrent ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* 새로운 비밀번호 */}
          <div className="space-y-2">
            <Label>새로운 비밀번호</Label>
            <div className="relative">
              <Input
                type={showNew ? "text" : "password"}
                placeholder="새로운 비밀번호"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="pr-10"
              />
              <button
                type="button"
                onClick={() => setShowNew(!showNew)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              >
                {showNew ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            <p className="text-sm text-muted-foreground">영문, 숫자, 특수문자 포함 8~32자</p>
          </div>

          {/* 새로운 비밀번호 확인 */}
          <div className="space-y-2">
            <Label>새로운 비밀번호 확인</Label>
            <div className="relative">
              <Input
                type={showConfirm ? "text" : "password"}
                placeholder="새로운 비밀번호 확인"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="pr-10"
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              >
                {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* 버튼 영역 */}
          <div className="flex justify-between pt-4">
            <Button variant="ghost" onClick={() => onOpenChange(false)}>
              취소
            </Button>
            <Button onClick={handleSubmit}>비밀번호 변경</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
