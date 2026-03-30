import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CalendarCheck, ShieldCheck } from "lucide-react";
import { useEffect, useState } from "react";

export default function ShowTicketOpenNoticeModal({
  open,
  onOpenChange,
  title = "뮤지컬 <킹키부츠>",
  openDate = "2026-03-29T20:00:00",
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  title?: string;
  openDate?: string;
}) {
  const [timeLeft, setTimeLeft] = useState<{ d: string; h: string; m: string; s: string }>({
    d: "00", h: "00", m: "00", s: "00"
  });

  useEffect(() => {
    if (!open || !openDate) return;
    
    // 날짜 포맷 표준화 (2026.01.26 -> 2026-01-26)
    const normalizedOpenDate = openDate.replaceAll(".", "-");
    const targetDate = +new Date(normalizedOpenDate);

    const calculateTimeLeft = () => {
      const difference = targetDate - +new Date();
      if (difference > 0) {
        setTimeLeft({
          d: Math.floor(difference / (1000 * 60 * 60 * 24)).toString().padStart(2, "0"),
          h: Math.floor((difference / (1000 * 60 * 60)) % 24).toString().padStart(2, "0"),
          m: Math.floor((difference / 1000 / 60) % 60).toString().padStart(2, "0"),
          s: Math.floor((difference / 1000) % 60).toString().padStart(2, "0"),
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, [open, openDate]);

  const formattedDate = new Date(openDate).toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    weekday: "short",
  });
  
  const formattedTime = new Date(openDate).toLocaleTimeString("ko-KR", {
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md rounded-2xl p-0 overflow-hidden bg-white dark:bg-zinc-950 border-gray-200 dark:border-zinc-800">
        {/* Header */}
        <DialogHeader className="p-6">
          <DialogTitle className="text-lg font-bold text-foreground">{title} 티켓 오픈 안내</DialogTitle>
          <p className="text-sm text-muted-foreground">{formattedDate}</p>
        </DialogHeader>

        {/* Countdown */}
        <div className="mx-6 rounded-xl bg-linear-to-r from-pink-50 to-purple-50 dark:from-pink-950/30 dark:to-purple-950/30 p-4 text-center">
          <p className="text-sm text-muted-foreground mb-2">티켓 오픈까지</p>
          <div className="flex justify-center gap-3 text-lg font-semibold text-foreground">
            <TimeBox label="일" value={timeLeft.d} />
            <Colon />
            <TimeBox label="시간" value={timeLeft.h} />
            <Colon />
            <TimeBox label="분" value={timeLeft.m} />
            <Colon />
            <TimeBox label="초" value={timeLeft.s} />
          </div>
        </div>

        {/* Info */}
        <div className="px-6 py-4 space-y-4">
          <div className="flex gap-3">
            <CalendarCheck className="text-red-500" />
            <div>
              <p className="font-medium text-foreground">티켓 오픈</p>
              <p className="text-sm text-muted-foreground">{formattedDate} {formattedTime}</p>
            </div>
          </div>
        </div>

        {/* Fair Ticketing */}
        <div className="mx-6 mb-6 rounded-xl bg-pink-50 dark:bg-pink-950/20 p-4 border border-transparent dark:border-pink-900/30">
          <div className="flex items-center gap-2 mb-2 font-medium text-foreground">
            <ShieldCheck className="text-red-500" />
            공정성 티켓팅 시스템
          </div>
          <ul className="text-sm text-muted-foreground list-disc pl-5 space-y-1">
            <li>생성형 AI 기반 보안 퀴즈로 매크로·봇 차단</li>
            <li>접속 순서대로 대기열 자동 배정</li>
            <li>1인 회차당 최대 4매 예매 가능</li>
            <li>복수 계정 부정 예매 탐지 및 제한</li>
          </ul>
        </div>

        {/* Footer */}
        <div className="p-6 pt-0">
          <Button className="w-full rounded-xl bg-red-500 hover:bg-red-600 text-white border-none" onClick={() => onOpenChange(false)}>
            확인
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function TimeBox({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col items-center min-w-[48]">
      <span className="text-2xl font-bold text-foreground">{value}</span>
      <span className="text-xs text-muted-foreground">{label}</span>
    </div>
  );
}

function Colon() {
  return <span className="text-xl font-bold text-foreground">:</span>;
}
