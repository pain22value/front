"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShieldCheck } from "lucide-react";
import { cn } from "@/shared/utils/cn";
import { useState } from "react";
import { useEnterQueue } from "../hooks/useQueue";

export default function CaptchaStep({ onNext, scheduleId }: { onNext: () => void; scheduleId: string | number }) {
  const [selectedTile, setSelectedTile] = useState<number | null>(null);
  const { mutate: enterQueue, isPending } = useEnterQueue();

  // 캡차 폼 제출 핸들러 (대기열 진입 API 호출)
  const handleSubmit = () => {
    if (selectedTile === null) return;

    enterQueue(scheduleId, {
      onSuccess: () => {
        // 성공 이후 다음 스텝(큐 화면)으로 이동 신호 전달
        onNext();
      },
      onError: (error) => {
        console.error("대기열 진입 실패:", error);
        // 에러가 발생해도 일단 큐 화면으로 넘어가게 설계됨
        onNext();
      },
    });
  };


  return (
    <>
      <div className="p-8 flex flex-col items-center text-center gap-3">
        <div className="w-14 h-14 rounded-xl bg-red-500 dark:bg-red-600 flex items-center justify-center text-white">
          <ShieldCheck className="w-7 h-7" />
        </div>
        <h2 className="text-xl font-semibold">티켓 화면에 접속합니다</h2>
        <p className="text-sm text-muted-foreground">공정한 티켓팅을 위해 본인 인증이 필요합니다.</p>
      </div>
      <div className="px-6 pb-6">
        <Card className="p-5 rounded-2xl">
          <div className="flex flex-col gap-4">
            <p className="font-medium">생성형 캡차</p>
            <div className="border-2 border-red-400 dark:border-red-500/50 rounded-2xl p-4">
              <p className="text-sm text-muted-foreground mb-4">다음 앨범 커버에서 보라색 요소를 선택하세요.</p>
              <div className="grid grid-cols-3 gap-4">
                {Array.from({ length: 6 }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedTile(i)}
                    className={cn(
                      "aspect-square rounded-xl transition duration-200",
                      selectedTile === i
                        ? "bg-red-100 dark:bg-red-900/40 ring-4 ring-red-500 dark:ring-red-600 ring-offset-2 dark:ring-offset-card"
                        : "bg-muted hover:bg-muted/70",
                    )}
                  />
                ))}
              </div>
            </div>
          </div>
        </Card>
        <Button
          className="w-full mt-5 h-12 text-base"
          onClick={handleSubmit}
          disabled={selectedTile === null || isPending}
        >
          {isPending ? "접속 중..." : "시작하기"}
        </Button>
      </div>
    </>
  );
}
