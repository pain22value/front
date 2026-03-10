"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShieldCheck, Users, Bell, Check } from "lucide-react";
import { useState, useEffect } from "react";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/shared/utils/cn";
import { useInteractionStore } from "@/store/useInteractionStore";

export default function CaptchaModal({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md p-0 overflow-hidden sm:max-w-[520]">
        <CaptchaContent onOpenChange={onOpenChange} />
      </DialogContent>
    </Dialog>
  );
}

function CaptchaContent({ onOpenChange }: { onOpenChange: (open: boolean) => void }) {
  const stopTicketingFlow = useInteractionStore((state) => state.stopTicketingFlow);
  const [step, setStep] = useState<"captcha" | "queue">("captcha");
  const [selectedTile, setSelectedTile] = useState<number | null>(null);
  const [queueData, setQueueData] = useState({
    position: 2014,
    progress: 12,
    waitingCount: 15000,
    reservationRate: 89,
  });

  useEffect(() => {
    if (step !== "queue") return;

    const interval = setInterval(() => {
      setQueueData((prev) => {
        if (prev.position <= 0) {
          clearInterval(interval);
          stopTicketingFlow(); // 예매 프로세스 진입 완료 시 트래킹 종료
          onOpenChange(false);
          return { ...prev, position: 0, progress: 100 };
        }

        const decrease = Math.floor(Math.random() * 100) + 50;
        const newPosition = Math.max(0, prev.position - decrease);
        const totalStart = 2500;
        const newProgress = Math.min(100, ((totalStart - newPosition) / totalStart) * 100);

        return {
          ...prev,
          position: newPosition,
          progress: newProgress,
          waitingCount: Math.max(0, prev.waitingCount - decrease),
        };
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [step, onOpenChange, stopTicketingFlow]);

  const handleCaptchaSubmit = () => {
    if (selectedTile === null) return;
    setStep("queue");
  };

  return (
    <>
      {step === "captcha" ? (
        <>
          <div className="p-8 flex flex-col items-center text-center gap-3">
            <div className="w-14 h-14 rounded-xl bg-red-500 flex items-center justify-center text-white">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <h2 className="text-xl font-semibold">티켓 화면에 접속합니다</h2>
            <p className="text-sm text-muted-foreground">공정한 티켓팅을 위해 본인 인증이 필요합니다.</p>
          </div>

          <div className="px-6 pb-6">
            <Card className="p-5 rounded-2xl">
              <div className="flex flex-col gap-4">
                <p className="font-medium">생성형 캡차</p>
                <div className="border-2 border-red-400 rounded-2xl p-4">
                  <p className="text-sm text-muted-foreground mb-4">다음 앨범 커버에서 보라색 요소를 선택하세요.</p>
                  <div className="grid grid-cols-3 gap-4">
                    {Array.from({ length: 6 }).map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setSelectedTile(i)}
                        className={cn(
                          "aspect-square rounded-xl transition duration-200",
                          selectedTile === i
                            ? "bg-red-100 ring-4 ring-red-500 ring-offset-2"
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
              onClick={handleCaptchaSubmit}
              disabled={selectedTile === null}
            >
              시작하기
            </Button>
          </div>
        </>
      ) : (
        <div className="p-6">
          <div className="flex flex-col items-center gap-2 pt-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-500 text-white">
              <Users className="h-6 w-6" />
            </div>
            <h2 className="text-xl font-semibold">대기중</h2>
            <p className="text-sm text-muted-foreground">공정한 티켓팅을 위해 잠시만 기다려주세요.</p>
          </div>

          <div className="mt-6 rounded-2xl border border-red-200 pt-6">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">현재 대기 순서</p>
              <p className="mt-1 text-4xl font-bold text-red-500">{queueData.position.toLocaleString()}</p>
            </div>
            <div className="px-6 py-4">
              <Progress value={queueData.progress} className="h-2" />
            </div>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-4">
            <Card className="rounded-2xl bg-red-50 border-none shadow-none">
              <CardContent className="flex flex-col items-center gap-2 p-5">
                <Check className="h-5 w-5 text-red-500" />
                <p className="text-sm text-muted-foreground">예매율</p>
                <p className="text-xl font-semibold text-red-500">{queueData.reservationRate}%</p>
              </CardContent>
            </Card>
            <Card className="rounded-2xl bg-cyan-50 border-none shadow-none">
              <CardContent className="flex flex-col items-center gap-2 p-5">
                <Users className="h-5 w-5 text-cyan-600" />
                <p className="text-sm text-muted-foreground">대기 인원</p>
                <p className="text-xl font-semibold text-cyan-600">{queueData.waitingCount.toLocaleString()}명</p>
              </CardContent>
            </Card>
          </div>

          <Separator className="my-5" />

          <Card className="rounded-2xl bg-muted/40 border-none shadow-none">
            <CardContent className="p-5 text-sm text-muted-foreground">
              <div className="mb-2 flex items-center gap-2 font-medium text-foreground">
                <Bell className="h-4 w-4" />
                대기 중 안내
              </div>
              <ul className="list-disc space-y-1 pl-5">
                <li>이 창을 새로고침하거나 닫으면 대기열이 리셋됩니다.</li>
                <li>대기 순서는 실시간으로 업데이트됩니다.</li>
                <li>순서가 되면 자동으로 좌석 선택 화면으로 이동합니다.</li>
                <li>공정한 예매를 위해 가상 대기열 시스템을 운영합니다.</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
}
