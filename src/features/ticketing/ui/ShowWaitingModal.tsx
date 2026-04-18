"use client";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import CaptchaStep from "./CaptchaStep";
import QueueStep from "./QueueStep";
import ChallengeStep from "./ChallengeStep";
import { useModalStore } from "@/shared/stores/modalStore";
import { useCancelQueue } from "../hooks/useQueue";
import { useTicketingStore } from "../stores/useTicketingStore";
import { ENABLE_AI_CHALLENGE } from "../config";
import { toast } from "sonner";

export default function ShowWaitingModal({
  open,
  onOpenChange,
  showId,
  scheduleId,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  showId: string | number;
  scheduleId: string | number;
}) {
  const router = useRouter();
  const [step, setStep] = useState<"entry" | "queue" | "challenge">("entry");
  const { confirm, openConfirm, closeConfirm } = useModalStore();
  const { mutate: cancelQueue } = useCancelQueue();
  const { hasValidAdmissionToken, challengeComplete, challengeType, resetChallenge, clearTicketing } =
    useTicketingStore();
  const currentStep =
    ENABLE_AI_CHALLENGE &&
    open &&
    step === "entry" &&
    hasValidAdmissionToken(showId, scheduleId) &&
    !challengeComplete
      ? "challenge"
      : step;
  const isIllusionChallenge = currentStep === "challenge" && challengeType === "vqa-illusion";

  const handleOpenChange = useCallback(
    (isOpen: boolean) => {
      if (isOpen || confirm) return;

      if (currentStep !== "queue") {
        onOpenChange(false);
        setTimeout(() => setStep("entry"), 300);
        return;
      }

      openConfirm({
        title: "대기열 이탈 확인",
        description: "대기열에서 이탈하시겠습니까? 다시 입장하려면 대기 순서가 밀릴 수 있습니다.",
        confirmLabel: "확인",
        onConfirm: () => {
          cancelQueue(scheduleId, {
            onSuccess: () => {
              resetChallenge();
              onOpenChange(false);
              setTimeout(() => setStep("entry"), 300);
            },
            onError: () => {
              toast.error("대기열 취소 중 오류가 발생했습니다.");
              onOpenChange(false);
              setTimeout(() => setStep("entry"), 300);
            },
          });
        },
      });
    },
    [cancelQueue, confirm, currentStep, onOpenChange, openConfirm, resetChallenge, scheduleId],
  );

  const handleChallengeComplete = useCallback(() => {
    onOpenChange(false);
    if (confirm) closeConfirm();
    setTimeout(() => setStep("entry"), 300);
    router.push(`/shows/${scheduleId}/seat`);
  }, [closeConfirm, confirm, onOpenChange, router, scheduleId]);

  const handleChallengeBlocked = useCallback(() => {
    clearTicketing();
    onOpenChange(false);
    if (confirm) closeConfirm();
    setTimeout(() => setStep("entry"), 300);
  }, [clearTicketing, closeConfirm, confirm, onOpenChange]);

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTitle />
      <DialogContent
        className={
          isIllusionChallenge
            ? "max-w-md overflow-hidden p-0 sm:max-w-[520px]"
            : "max-w-md overflow-hidden p-0 sm:max-w-[760px]"
        }
      >
        {currentStep === "entry" ? (
          <CaptchaStep onNext={() => setStep("queue")} scheduleId={scheduleId} />
        ) : currentStep === "queue" ? (
          <QueueStep
            onReady={() => {
              if (ENABLE_AI_CHALLENGE) {
                setStep("challenge");
                return;
              }
              handleChallengeComplete();
            }}
            scheduleId={scheduleId}
          />
        ) : (
          <ChallengeStep
            showId={showId}
            scheduleId={scheduleId}
            onComplete={handleChallengeComplete}
            onBlocked={handleChallengeBlocked}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
