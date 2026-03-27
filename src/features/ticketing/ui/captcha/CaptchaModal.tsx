"use client";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useState } from "react";
import CaptchaStep from "./CaptchaStep";
import QueueStep from "./QueueStep";

export default function CaptchaModal({
  open,
  onOpenChange,
  showId,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  showId: string | number;
}) {
  const [step, setStep] = useState<"captcha" | "queue">("captcha");

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen: boolean) => {
        onOpenChange(isOpen);
        if (!isOpen) {
          // 모달이 닫힐 때 다시 캡차 화면부터 시작하도록 상태를 리셋할 수도 있습니다.
          setTimeout(() => setStep("captcha"), 300);
        }
      }}
    >
      <DialogTitle />
      <DialogContent className="max-w-md p-0 overflow-hidden sm:max-w-[520]">
        {step === "captcha" ? (
          <CaptchaStep onNext={() => setStep("queue")} showId={showId} />
        ) : (
          <QueueStep onOpenChange={onOpenChange} showId={showId} />
        )}
      </DialogContent>
    </Dialog>
  );
}
