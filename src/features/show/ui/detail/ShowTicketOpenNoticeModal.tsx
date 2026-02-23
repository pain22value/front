import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Bell, CalendarCheck, ShieldCheck } from "lucide-react";

export default function ShowTicketOpenNoticeModal({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md rounded-2xl p-0 overflow-hidden">
        {/* Header */}
        <DialogHeader className="p-6">
          <DialogTitle className="text-lg font-bold">뮤지컬 &lt;킹키부츠&gt; 티켓 오픈 안내</DialogTitle>
          <p className="text-sm text-muted-foreground">2026.01.26</p>
        </DialogHeader>

        {/* Countdown */}
        <div className="mx-6 rounded-xl bg-linear-to-r from-pink-50 to-purple-50 p-4 text-center">
          <p className="text-sm text-muted-foreground mb-2">티켓 오픈까지</p>
          <div className="flex justify-center gap-3 text-lg font-semibold">
            <TimeBox label="일" value="03" />
            <Colon />
            <TimeBox label="시간" value="12" />
            <Colon />
            <TimeBox label="분" value="34" />
            <Colon />
            <TimeBox label="초" value="29" />
          </div>
        </div>

        {/* Info */}
        <div className="px-6 py-4 space-y-4">
          <div className="flex gap-3">
            <CalendarCheck className="text-red-500" />
            <div>
              <p className="font-medium">티켓 오픈</p>
              <p className="text-sm text-muted-foreground">2026.01.26 (월) 20:00</p>
            </div>
          </div>

          <div className="flex gap-3">
            <Bell className="text-muted-foreground" />
            <div>
              <p className="font-medium">알림 설정</p>
              <p className="text-sm text-muted-foreground">오픈 10분 전 푸시 알림</p>
            </div>
          </div>
        </div>

        {/* Fair Ticketing */}
        <div className="mx-6 mb-6 rounded-xl bg-pink-50 p-4">
          <div className="flex items-center gap-2 mb-2 font-medium">
            <ShieldCheck className="text-red-500" />
            공정 티켓팅 시스템
          </div>
          <ul className="text-sm text-muted-foreground list-disc pl-5 space-y-1">
            <li>AI 기반 봇 차단 (생성형 캡차)</li>
            <li>랜덤 대기열 배정</li>
            <li>1인 2매 구매 제한</li>
            <li>본인 인증 필수</li>
          </ul>
        </div>

        {/* Footer */}
        <div className="p-6 pt-0">
          <Button className="w-full rounded-xl bg-red-500 hover:bg-red-600">캘린더에 추가하기</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function TimeBox({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col items-center min-w-[48]">
      <span className="text-2xl font-bold">{value}</span>
      <span className="text-xs text-muted-foreground">{label}</span>
    </div>
  );
}

function Colon() {
  return <span className="text-xl font-bold">:</span>;
}
