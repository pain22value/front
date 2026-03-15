"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShieldCheck } from "lucide-react";
import { cn } from "@/shared/utils/cn";
import { useState } from "react";

export default function CaptchaStep({
  onComplete,
}: {
  onComplete: () => void; // 캡차 풀기 성공 시 호출되는 핸들러
}) {
  const [selectedTile, setSelectedTile] = useState<number | null>(null);

  // 캡차 폼 제출 핸들러
  const handleSubmit = () => {
    if (selectedTile === null) return;
    onComplete();
  };

  return (
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
        <Button className="w-full mt-5 h-12 text-base" onClick={handleSubmit} disabled={selectedTile === null}>
          시작하기
        </Button>
      </div>
    </>
  );
}
