"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Users, Bell } from "lucide-react";
import { useEffect } from "react";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { useQueueStatus } from "../../hooks/useQueue";
import { useTelemetryStore } from "@/shared/stores/useTelemetryStore";

export default function QueueStep({
  onOpenChange,
}: {
  onOpenChange: (open: boolean) => void; // 큐 모달 닫기 핸들러
}) {
  // 리액트 쿼리 커스텀 훅을 사용하여 대기 상태 폴링
  const { data: queueData } = useQueueStatus(1);

  const currentRank = queueData?.rank ?? 0;
  const waitingCount = queueData?.waitingUserCount ?? 0;
  const pollingStatus = queueData?.status ?? "WAITING";

  const { setPageStage } = useTelemetryStore();

  useEffect(() => {
    // 큐 화면 진입 시 page_stage를 queue로 변경
    setPageStage("queue");
  }, [setPageStage]);

  useEffect(() => {
    if (!queueData) return;

    if (pollingStatus === "ADMITTED" || currentRank <= 0) {
      setPageStage("seatmap"); // 좌석 선택 화면 진입하므로 상태 변경
      onOpenChange(false); // 모달 닫기 및 좌석 선택 화면 진입 로직 처리
    }
  }, [queueData, pollingStatus, currentRank, onOpenChange, setPageStage]);

  return (
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
          <p className="mt-1 text-4xl font-bold text-red-500">{currentRank.toLocaleString()}</p>
        </div>
        <div className="px-6 py-4">
          <Progress value={Math.max(0, 100 - (currentRank / 2500) * 100)} className="h-2" />
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-4">
        <Card className="rounded-2xl bg-red-50 border-none shadow-none">
          <CardContent className="flex flex-col items-center gap-2 p-5">
            <Bell className="h-5 w-5 text-red-500" />
            <p className="text-sm text-muted-foreground">예상 대기시간</p>
            <p className="text-xl font-semibold text-red-500">약 {Math.ceil(currentRank / 50)}분</p>
          </CardContent>
        </Card>
        <Card className="rounded-2xl bg-cyan-50 border-none shadow-none">
          <CardContent className="flex flex-col items-center gap-2 p-5">
            <Users className="h-5 w-5 text-cyan-600" />
            <p className="text-sm text-muted-foreground">대기 인원</p>
            <p className="text-xl font-semibold text-cyan-600">{(waitingCount || 0).toLocaleString()}명</p>
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
  );
}
