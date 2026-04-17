"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShieldCheck } from "lucide-react";
import { useEnterQueue } from "../hooks/useQueue";
import { toast } from "sonner";

export default function QueueEntryStep({
  onNext,
  scheduleId,
}: {
  onNext: () => void;
  scheduleId: string | number;
}) {
  const { mutate: enterQueue, isPending } = useEnterQueue();

  const handleSubmit = () => {
    enterQueue(scheduleId, {
      onSuccess: () => {
        onNext();
      },
      onError: (error) => {
        console.error("대기열 진입 실패:", error);
        toast.error("대기열 진입에 실패했습니다. 잠시 후 다시 시도해주세요.");
      },
    });
  };

  return (
    <>
      <div className="p-8 flex flex-col items-center text-center gap-3">
        <div className="w-14 h-14 rounded-xl bg-red-500 dark:bg-red-600 flex items-center justify-center text-white">
          <ShieldCheck className="w-7 h-7" />
        </div>
        <h2 className="text-xl font-semibold">대기열에 입장합니다</h2>
        <p className="text-sm text-muted-foreground">입장 순서가 되면 AI 확인 단계를 거쳐 좌석 선택 화면으로 이동합니다.</p>
      </div>
      <div className="px-6 pb-6">
        <Card className="p-5 rounded-2xl">
          <div className="flex flex-col gap-2 text-sm text-muted-foreground">
            <p>1. 대기열에 먼저 입장합니다.</p>
            <p>2. 순서가 되면 AI 확인 단계를 진행합니다.</p>
            <p>3. 확인이 완료되면 좌석 선택 화면으로 이동합니다.</p>
          </div>
        </Card>
        <Button className="w-full mt-5 h-12 text-base" onClick={handleSubmit} disabled={isPending}>
          {isPending ? "대기열 입장 중..." : "대기열 입장"}
        </Button>
      </div>
    </>
  );
}
