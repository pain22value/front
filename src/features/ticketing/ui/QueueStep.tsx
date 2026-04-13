"use client";

import { Card } from "@/components/ui/card";
import { useEffect, useRef, useLayoutEffect } from "react";
import { Users, Bell, CheckLine, UsersRound } from "lucide-react";
import { useQueueStatus } from "../hooks/useQueue";
import { useRouter } from "next/navigation";
import { useTicketingStore } from "../stores/useTicketingStore";
import gsap from "gsap";

export default function QueueStep({
  onOpenChange,
  showId,
  scheduleId,
}: {
  onOpenChange: (open: boolean) => void;
  showId: string | number;
  scheduleId: string | number;
}) {
  const router = useRouter();
  const { data: queueData } = useQueueStatus(scheduleId);

  const progressRef = useRef<HTMLDivElement>(null);

  const currentRank = queueData?.rank ?? 0;
  const waitingCount = queueData?.waitingUserCount ?? 0;
  const pollingStatus = queueData?.status ?? "WAITING";
  const pollingMs = queueData?.pollingMs ?? 3000;

  const { setAdmissionToken } = useTicketingStore();

  useEffect(() => {
    if (!queueData) return;

    if (pollingStatus !== "WAITING" && queueData.admissionToken) {
      setAdmissionToken(queueData.admissionToken);
      onOpenChange(false);
      router.push(`/shows/${scheduleId}/seat`); // 좌석 선택 화면으로 이동
    }
  }, [queueData, pollingStatus, onOpenChange, setAdmissionToken, showId, router]);

  useLayoutEffect(() => {
    if (!progressRef.current) return;

    // 폴링 주기에 따라 애니메이션 속도 및 타이밍 펑션 조절
    const duration = (pollingMs / 1000) * 0.6;

    // 주기가 길수록 느슨한(sine), 짧을수록 역동적인(expo) 이징 적용
    let dynamicEase = "sine.inOut";
    if (pollingMs < 2000) {
      dynamicEase = "expo.inOut";
    } else if (pollingMs < 4000) {
      dynamicEase = "power2.inOut";
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        progressRef.current,
        { xPercent: -100, opacity: 0.2 },
        {
          xPercent: 250,
          opacity: 1,
          duration: duration,
          repeat: -1,
          ease: dynamicEase,
        },
      );
    });

    return () => ctx.revert();
  }, [pollingMs]);

  // 예매율 데이터가 API명세(QueueStatusResponse 등)에 없는 상태이므로,
  // 실시간성을 주기 위해 89.4% ~ 91.2% 사이의 가짜 값을 생성
  const mockBookingRate = (89.4 + Math.sin(currentRank / 10) * 1.5).toFixed(1);

  return (
    <div className="relative w-full max-w-[480px] mx-auto overflow-hidden py-6 space-y-10">
      {/* 헤더 */}
      <div className="flex flex-col items-center gap-2 pt-4">
        <div className="mx-auto mb-5 size-16 flex items-center justify-center rounded-xl bg-red-500">
          <Users className="h-8 w-8 text-white" />
        </div>
        <h2 className="text-xl font-semibold">대기중</h2>
        <p className="text-sm text-muted-foreground">공정한 티켓팅을 위해 잠시만 기다려주세요.</p>
      </div>

      <div className="rounded-[20px] bg-white dark:bg-zinc-950 border-t-[5px] border-t-[#F93E4B] py-8 space-y-6 text-center overflow-hidden">
        {/* 대기 정보 섹션 */}
        <div className="text-lg font-semibold text-gray-500 dark:text-gray-400">현재 대기 순서</div>
        <div className="text-5xl font-extrabold leading-none tracking-[-2px] text-red-500">
          {currentRank.toLocaleString()}
        </div>

        {/* GSAP 애니메이션 디바이더 */}
        <div className="relative h-1 w-full overflow-hidden rounded-[2px] bg-gray-100 dark:bg-zinc-800">
          <div
            ref={progressRef}
            className="absolute left-0 top-0 h-full w-[40%] bg-linear-to-r from-cyan-100 to-cyan-500 dark:from-cyan-900 dark:to-cyan-400"
          />
        </div>
      </div>

      {/* 하단 정보 카드 그리드 */}
      <div className="grid grid-cols-2 gap-4 my-4">
        <Card className="rounded-2xl bg-red-50 dark:bg-red-950/20 border border-red-100 dark:border-red-900/30 shadow-none flex flex-col items-center justify-center gap-2 p-6">
          <CheckLine className="text-red-500" />
          <div className="font-semibold text-gray-500 dark:text-gray-400">예매율</div>
          <div className="text-2xl font-extrabold text-red-500">{mockBookingRate}%</div>
        </Card>
        <Card className="rounded-2xl bg-cyan-50 dark:bg-cyan-950/20 border border-cyan-100 dark:border-cyan-900/30 shadow-none flex flex-col items-center justify-center gap-2 p-6">
          <UsersRound className="text-cyan-500" />
          <div className="font-semibold text-gray-500 dark:text-gray-400">대기 인원</div>
          <div className="text-2xl font-extrabold text-cyan-500">{waitingCount.toLocaleString()}명</div>
        </Card>
      </div>

      {/* 안내 박스 */}
      <Card className="rounded-2xl border border-gray-100/50 dark:border-zinc-800/30 bg-linear-to-br from-red-50 to-cyan-50 dark:from-red-950/20 dark:to-cyan-950/20 shadow-none p-6 gap-2">
        <div className="flex items-center gap-2 text-sm font-semibold text-muted-foreground">
          <Bell className="h-5 w-5" /> 대기 중 안내
        </div>
        <ul className="space-y-1 text-sm text-muted-foreground list-disc pl-5">
          <li>이 창을 새로고침하거나 닫으면 대기열이 리셋됩니다.</li>
          <li>대기 순서는 실시간으로 업데이트됩니다.</li>
          <li>순서가 되면 자동으로 좌석 선택 화면으로 이동합니다.</li>
          <li>공정한 예매를 위해 가상 대기열 시스템을 운영하고 있습니다.</li>
        </ul>
      </Card>
    </div>
  );
}
