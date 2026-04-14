"use client";

import { useEffect, useRef, useState } from "react";
import { Check } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import { useRouter } from "next/navigation";
import { useArtistMembershipStore } from "@/features/artists/stores/useArtistMembershipStore";
import { paymentService } from "@/features/payments/services/paymentService";
import { Loader2, AlertCircle } from "lucide-react";
import useMembershipCompleteQuery from "@/features/artists/hooks/useArtistMembershipQuery";

type ConfirmState = "loading" | "success" | "error";

export default function MembershipSuccessStep({ artistId }: { artistId: string }) {
  const router = useRouter();
  const { paymentKey, orderId, amount, reset } = useArtistMembershipStore();
  
  // 초기 상태 설정: 결제 정보가 없으면 바로 에러 상태로 시작
  const isInitialMissingInfo = !paymentKey || !orderId;
  const [confirmState, setConfirmState] = useState<ConfirmState>(isInitialMissingInfo ? "error" : "loading");
  const [errorMsg, setErrorMsg] = useState(isInitialMissingInfo ? "결제 정보가 존재하지 않습니다." : "");
  const confirmCalled = useRef(false);

  // 1. 결제 승인 처리
  useEffect(() => {
    // 이미 에러 상태로 시작했거나 이미 호출된 경우 스킵
    if (isInitialMissingInfo || confirmCalled.current) return;
    confirmCalled.current = true;

    async function confirmPayment() {
      // 토스로부터 전달받은 URL 데이터 로깅
      console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
      console.log("🚩 [Toss Redirect Data Check]");
      console.log("- paymentKey:", paymentKey);
      console.log("- orderId (From Client to Toss & Back):", orderId);
      console.log("- amount:", amount);
      console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");

      try {
        console.log("[MembershipSuccess] 🚀 Starting server confirmation...");
        
        const result = await paymentService.confirm({
          paymentKey: paymentKey!,
          orderId: orderId!,
          amount: amount,
        });

        console.log("[MembershipSuccess] ✅ Server Confirmation Success:", result);
        setConfirmState("success");
      } catch (error: unknown) {
        console.error("[MembershipSuccess] ❌ Server Confirmation Failed:", error);
        setConfirmState("error");
        
        let message = "결제 승인 처리 중 오류가 발생했습니다.";
        if (error && typeof error === "object" && "response" in error) {
          const axiosError = error as { response?: { data?: { message?: string } } };
          message = axiosError.response?.data?.message || message;
        } else if (error instanceof Error) {
          message = error.message;
        }
        
        setErrorMsg(message);
      }
    }

    confirmPayment();
  }, [paymentKey, orderId, amount, isInitialMissingInfo]);

  // 2. 가입 완료 데이터 조회 (승인 성공 시에만 유효한 데이터를 가져올 확률이 높음)
  const { data: membershipData, isLoading: isDataLoading, refetch } = useMembershipCompleteQuery(artistId);

  useEffect(() => {
    if (confirmState === "success") {
      refetch();
    }
  }, [confirmState, refetch]);

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

  // 로딩 상태 (승인 중이거나 데이터 로딩 중)
  if (confirmState === "loading" || (confirmState === "success" && isDataLoading)) {
    return (
      <div className="min-h-[60vh] w-full flex flex-col items-center justify-center space-y-4">
        <Loader2 className="w-12 h-12 text-rose-500 animate-spin" />
        <div className="text-slate-500 font-medium">결제 승인 및 가입 정보를 확인 중입니다...</div>
      </div>
    );
  }

  // 에러 상태
  if (confirmState === "error") {
    return (
      <div className="min-h-[60vh] w-full flex flex-col items-center justify-center p-4">
        <div className="w-16 h-16 bg-amber-50 rounded-full flex items-center justify-center mb-6">
          <AlertCircle className="w-10 h-10 text-amber-500" />
        </div>
        <h2 className="text-xl font-bold text-slate-800 mb-2">결제 승인 실패</h2>
        <p className="text-slate-500 text-center mb-8 max-w-xs">{errorMsg}</p>
        <div className="flex gap-4">
          <Button
            variant="outline"
            onClick={() => {
              reset();
              router.push(`/artists/${artistId}/membership`);
            }}
          >
            처음으로 가기
          </Button>
          <Button className="bg-rose-500 hover:bg-rose-600 text-white" onClick={() => window.location.reload()}>
            다시 시도
          </Button>
        </div>
      </div>
    );
  }

  if (!membershipData) {
    return (
      <div className="min-h-[60vh] w-full flex items-center justify-center">
        <div className="text-slate-400">가입 정보를 찾을 수 없습니다.</div>
      </div>
    );
  }

  const { artistName, planName, amount: finalAmount, joinedAt, nextBillingAt } = membershipData;

  const info = [
    { label: "아티스트", value: artistName },
    { label: "플랜", value: planName },
    { label: "결제 금액", value: `${finalAmount.toLocaleString()}원` },
    { label: "가입일", value: joinedAt },
    { label: "다음 결제일", value: nextBillingAt },
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
              <Button
                className="w-full bg-[#ff4d57] hover:bg-[#e6454e] text-white font-bold h-12 rounded-xl"
                onClick={() => router.push(`/artists/${artistId}`)}
              >
                아티스트 페이지로 이동하기
              </Button>
              <Button
                variant="outline"
                className="w-full border-slate-300 text-slate-700 font-bold h-12 rounded-xl"
                onClick={() => router.push("/")}
              >
                홈으로 가기
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
