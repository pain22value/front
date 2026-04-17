"use client";

import { useEffect, useMemo, useRef } from "react";

type IllusionMessage = {
  type: "vqa-illusion:result";
  session_id?: string;
  answer_index?: number;
  passed?: boolean;
  blocked?: boolean;
};

type VqaIllusionChallengeProps = {
  config: Record<string, unknown>;
  onResult: (payload: { answerIndex: number; blocked: boolean; passed: boolean }) => void;
  isPending?: boolean;
};

export default function VqaIllusionChallenge({
  config,
  onResult,
  isPending = false,
}: VqaIllusionChallengeProps) {
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const consumedRef = useRef(false);
  const popupUrl = typeof config.popup_url === "string" ? config.popup_url : "";

  const expectedOrigin = useMemo(() => {
    if (!popupUrl) return null;
    try {
      return new URL(popupUrl).origin;
    } catch {
      return null;
    }
  }, [popupUrl]);

  useEffect(() => {
    consumedRef.current = false;
  }, [popupUrl]);

  useEffect(() => {
    if (!popupUrl) return;

    const handleMessage = (event: MessageEvent) => {
      const data = event.data as IllusionMessage | null;
      if (!data || data.type !== "vqa-illusion:result") return;
      if (consumedRef.current) return;
      if (expectedOrigin && event.origin !== expectedOrigin) return;
      if (iframeRef.current?.contentWindow && event.source !== iframeRef.current.contentWindow) return;
      if (typeof data.answer_index !== "number") return;

      consumedRef.current = true;
      onResult({
        answerIndex: data.answer_index,
        blocked: Boolean(data.blocked),
        passed: Boolean(data.passed),
      });
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [expectedOrigin, onResult, popupUrl]);

  if (!popupUrl) {
    return (
      <div className="p-8 text-center text-sm text-destructive">
        착시 이미지 문제를 불러오지 못했습니다. 다시 시도해 주세요.
      </div>
    );
  }

  return (
    <div className="relative bg-white">
      <iframe
        ref={iframeRef}
        title="vqa-illusion"
        src={popupUrl}
        className="block h-[820px] w-full border-0 bg-white"
        allow="clipboard-read; clipboard-write"
      />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-white via-white/95 to-transparent px-4 pb-4 pt-10 text-center text-xs text-muted-foreground">
        {isPending ? "결과를 확인하는 중입니다..." : "문제 풀이가 끝나면 자동으로 검증합니다."}
      </div>
    </div>
  );
}
