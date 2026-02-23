import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { X, Users, Bell, Check } from "lucide-react";

export default function WaitingQueueModal({
  position = 2014,
  reservationRate = 89,
  waitingCount = 15000,
  progress = 12,
  onClose,
}: {
  position: number;
  reservationRate: number;
  waitingCount: number;
  progress: number;
  onClose?: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <Card className="relative w-[520] rounded-3xl p-6 shadow-xl">
        {/* close */}
        <button className="absolute right-4 top-4 text-muted-foreground hover:text-foreground" onClick={onClose}>
          <X className="h-5 w-5" />
        </button>

        {/* header */}
        <div className="flex flex-col items-center gap-2 pt-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-500 text-white">
            <Users className="h-6 w-6" />
          </div>

          <h2 className="text-xl font-semibold">대기중</h2>
          <p className="text-sm text-muted-foreground">공정한 티켓팅을 위해 잠시만 기다려주세요.</p>
        </div>

        {/* main box */}
        <div className="mt-6 rounded-2xl border border-red-200 pt-6">
          <div className="text-center">
            <p className="text-sm text-muted-foreground">현재 대기 순서</p>
            <p className="mt-1 text-4xl font-bold text-red-500">{position.toLocaleString()}</p>
          </div>

          <div className="px-6 py-4">
            <Progress value={progress} />
          </div>
        </div>

        {/* stats */}
        <div className="mt-4 grid grid-cols-2 gap-4">
          <Card className="rounded-2xl bg-red-50">
            <CardContent className="flex flex-col items-center gap-2 p-5">
              <Check className="h-5 w-5 text-red-500" />
              <p className="text-sm text-muted-foreground">예매율</p>
              <p className="text-xl font-semibold text-red-500">{reservationRate}%</p>
            </CardContent>
          </Card>

          <Card className="rounded-2xl bg-cyan-50">
            <CardContent className="flex flex-col items-center gap-2 p-5">
              <Users className="h-5 w-5 text-cyan-600" />
              <p className="text-sm text-muted-foreground">대기 인원</p>
              <p className="text-xl font-semibold text-cyan-600">{waitingCount.toLocaleString()}명</p>
            </CardContent>
          </Card>
        </div>

        <Separator className="my-5" />

        {/* guide */}
        <Card className="rounded-2xl bg-muted/40">
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
      </Card>
    </div>
  );
}
