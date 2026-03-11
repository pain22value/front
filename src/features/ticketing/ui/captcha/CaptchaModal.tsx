"use client";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useState } from "react";
import { useEnterQueue } from "../../hooks/useQueue";
import { CaptchaStep } from "./CaptchaStep";
import { QueueStep } from "./QueueStep";

export default function CaptchaModal({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const [step, setStep] = useState<"captcha" | "queue">("captcha");
  const { mutate: enterQueue } = useEnterQueue();

  const handleCaptchaComplete = () => {
    // 캡차(보안퀴즈)를 풀고 대기열 진입 API 호출 (useMutation)
    enterQueue(1, {
      onSuccess: () => {
        // 성공 이후 큐 화면으로 전환
        setStep("queue");
      },
      onError: (error) => {
        console.error("대기열 진입 실패:", error);
        // 에러가 발생해도 일단 큐 화면으로 넘어가게 하려면 아래 줄 활성화 (또는 모달 닫기 등 에러 핸들링 추가)
        setStep("queue");
      },
    });
  };

  const handleOpenChange = (isOpen: boolean) => {
    onOpenChange(isOpen);
    if (!isOpen) {
      // 모달이 닫힐 때 다시 캡차 화면부터 시작하도록 상태를 리셋할 수도 있습니다.
      setTimeout(() => setStep("captcha"), 300);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTitle />
      <DialogContent className="max-w-md p-0 overflow-hidden sm:max-w-[520]">
        {step === "captcha" ? (
          <CaptchaStep onComplete={handleCaptchaComplete} />
        ) : (
          <QueueStep onOpenChange={onOpenChange} />
        )}
      </DialogContent>
    </Dialog>
  );
}
