"use client";

import { useEffect } from "react";
import { Check } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default function MembershipSuccessStep() {
  useEffect(() => {
    // 1. main 태그 배경색 변경 (radial-gradient)
    const main = document.querySelector("main");
    const originalBg = main?.style.background || "";
    if (main) {
      main.style.background = "radial-gradient(ellipse at bottom right, #FFF5F6 0%, #FFFFFF 80%)";
    }

    // 2. footer 요소 제거 (숨기기)
    const footer = document.querySelector("footer");
    const originalFooterDisplay = footer?.style.display || "";
    if (footer) {
      footer.style.display = "none";
    }

    return () => {
      // 컴포넌트 언마운트 시 원래대로 복구
      if (main) main.style.background = originalBg;
      if (footer) footer.style.display = originalFooterDisplay;
    };
  }, []);

  const info = [
    { label: "아티스트", value: "고은성" },
    { label: "플랜", value: "월간 멤버십" },
    { label: "결제 금액", value: "5,000원" },
    { label: "가입일", value: "2026.2.19." },
    { label: "다음 결제일", value: "2026.3.19." },
  ];

  return (
    <div className="min-h-[calc(100vh-80px)] w-full flex items-center justify-center p-4">
      <div className="w-full max-w-md flex flex-col items-center space-y-8">
        {/* 성공 아이콘 섹션 */}
        <div className="flex flex-col items-center space-y-4">
          <div className="w-16 h-16 bg-[#ff4d57] rounded-full flex items-center justify-center shadow-lg">
            <Check className="text-white w-10 h-10 stroke-[3px]" />
          </div>
          <div className="text-center space-y-2">
            <h1 className="text-2xl font-bold text-slate-800">멤버십 가입 완료</h1>
            <p className="text-slate-500 leading-relaxed">
              멤버십 가입이 완료되었습니다.
              <br />
              모든 멤버십 혜택을 이용하실 수 있습니다.
            </p>
          </div>
        </div>

        {/* 정보 카드 섹션 */}
        <Card className="w-full border-slate-200 shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg font-bold text-slate-700">멤버십 정보</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              {info.map((item, index) => (
                <div key={index} className="flex justify-between items-center text-sm">
                  <span className="text-slate-500">{item.label}</span>
                  <span className="font-semibold text-slate-800">{item.value}</span>
                </div>
              ))}
            </div>

            <Separator className="my-6" />

            <div className="flex flex-col gap-3">
              <Button className="w-full bg-[#ff4d57] hover:bg-[#e6454e] text-white font-bold h-12 rounded-xl">
                아티스트 페이지로 이동하기
              </Button>
              <Button variant="outline" className="w-full border-slate-300 text-slate-700 font-bold h-12 rounded-xl">
                홈으로 가기
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
