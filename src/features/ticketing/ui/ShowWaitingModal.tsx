"use client";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useState, useCallback } from "react";
import CaptchaStep from "./CaptchaStep";
import QueueStep from "./QueueStep";
import { useModalStore } from "@/shared/stores/modalStore";
import { useCancelQueue } from "../hooks/useQueue";
import { toast } from "sonner";

export default function ShowWaitingModal({
  open,
  onOpenChange,
  showId,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  showId: string | number;
}) {
  const [step, setStep] = useState<"captcha" | "queue">("captcha");
  const { confirm, openConfirm, closeConfirm } = useModalStore();
  const { mutate: cancelQueue } = useCancelQueue();

  const handleOpenChange = useCallback(
    (isOpen: boolean) => {
      // 여는 동작(isOpen === true)은 부모 컴포넌트에서 제어하므로 무시합니다.
      // 또는 이미 컨펌 모달이 떠있는 경우 처리를 방지하여 무한 루프를 막습니다.
      if (isOpen || confirm) return;

      // 닫으려는 동작(isOpen === false)이 발생했을 때
      // 캡차 단계인 경우 바로 닫기
      if (step === "captcha") {
        onOpenChange(false);
        setTimeout(() => setStep("captcha"), 300);
        return;
      }

      // 대기열 단계인 경우 확인 모달 표시
      openConfirm({
        title: "대기열 이탈 확인",
        description: "대기열에서 이탈하시겠습니까? 다시 입장하려면 대기 순서가 밀릴 수 있습니다.",
        confirmLabel: "확인",
        onConfirm: () => {
          cancelQueue(showId, {
            onSuccess: () => {
              onOpenChange(false);
              setTimeout(() => setStep("captcha"), 300);
            },
            onError: () => {
              toast.error("대기열 취소 중 오류가 발생했습니다.");
              onOpenChange(false);
              setTimeout(() => setStep("captcha"), 300);
            },
          });
        },
      });
    },
    [confirm, step, openConfirm, onOpenChange, cancelQueue, showId],
  );

  // 내부에서 강제로 닫아야 할 때 (입장 성공 등)를 위한 전용 핸들러
  const handleForceClose = useCallback(() => {
    onOpenChange(false);
    if (confirm) closeConfirm(); // 컨펌 모달이 떠있다면 닫아줌
    setTimeout(() => setStep("captcha"), 300);
  }, [onOpenChange, confirm, closeConfirm]);

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTitle />
      <DialogContent className="max-w-md p-0 overflow-hidden sm:max-w-[520]">
        {step === "captcha" ? (
          <CaptchaStep onNext={() => setStep("queue")} showId={showId} />
        ) : (
          <QueueStep onOpenChange={handleForceClose} showId={showId} />
        )}
      </DialogContent>
    </Dialog>
  );
}
