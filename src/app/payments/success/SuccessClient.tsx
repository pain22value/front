"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { paymentService, type ConfirmPaymentResponse } from "@/features/payments/services/paymentService";
import ResultCard from "@/components/common/ResultCard";

type Props = {
  searchParams: { paymentKey?: string; orderId?: string; amount?: string };
};

export default function SuccessClient({ searchParams }: Props) {
  const paymentKey = searchParams.paymentKey ?? "";
  const orderId = searchParams.orderId ?? "";
  const amountStr = searchParams.amount ?? "";

  const amount = useMemo(() => {
    const n = Number(amountStr);
    return Number.isFinite(n) ? n : NaN;
  }, [amountStr]);

  const isValid = Boolean(paymentKey && orderId && Number.isFinite(amount));

  const [confirming, setConfirming] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [paymentResult, setPaymentResult] = useState<ConfirmPaymentResponse | null>(null);

  useEffect(() => {
    if (!isValid || confirmed) return;

    (async () => {
      try {
        setConfirming(true);
        setErrorMsg(null);
        const result = await paymentService.confirm(orderId, { paymentKey, amount });
        setPaymentResult(result);
        setConfirmed(true);
      } catch (e) {
        console.error(e);
        setConfirmed(true); // 백엔드 미완성 상태에서 임시로 성공 처리
      } finally {
        setConfirming(false);
      }
    })();
  }, [isValid, confirmed, orderId, paymentKey, amount]);

  if (confirming) {
    return (
      <main className="flex flex-col items-center justify-center py-24">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-[#F93E4B]" />
        <p className="mt-4 text-sm text-gray-500">결제를 승인하는 중입니다...</p>
      </main>
    );
  }

  if (errorMsg) {
    return (
      <main className="flex flex-col items-center justify-center py-24 px-4">
        <div className="w-full max-w-md rounded-xl border border-[#ffe4e6] bg-[#fff5f5] p-6 text-center">
          <div className="mb-3 text-3xl">⚠️</div>
          <h1 className="text-lg font-extrabold text-[#F93E4B]">결제 승인 실패</h1>
          <p className="mt-2 text-sm text-[#F93E4B]">{errorMsg}</p>
          <Link
            href="/payments/checkout"
            className="mt-5 inline-block rounded-md bg-[#F93E4B] px-6 py-2.5 text-sm font-bold text-white hover:bg-[#e0323e]"
          >
            다시 시도하기
          </Link>
        </div>
      </main>
    );
  }

  if (!isValid) {
    return (
      <main className="flex flex-col items-center justify-center py-24 px-4">
        <p className="text-sm text-gray-500">잘못된 접근입니다.</p>
        <Link href="/" className="mt-4 text-sm text-[#F93E4B] hover:underline">
          홈으로 가기
        </Link>
      </main>
    );
  }

  const totalAmount = paymentResult?.totalAmount ?? amount;

  // ResultCard로 교체
  return (
    <ResultCard
      title="예매 완료"
      description="티켓이 성공적으로 예매되었습니다!"
      orderId={orderId}
      infoRows={[
        { label: "공연명", value: "킹키부츠" },
        { label: "일시", value: "2026.01.26(월) 오후 7:00" },
        {
          label: "좌석",
          value: (
            <div className="text-right">
              <div>1층 B구역 16열 6번</div>
              <div>1층 B구역 16열 7번</div>
            </div>
          ),
        },
        {
          label: "최종 결제금액",
          value: `${totalAmount.toLocaleString()}원`,
          valueColor: "text-[#F11322]",
        },
      ]}
      buttons={[
        { label: "예매 확인하기", href: "/mypage/bookings", variant: "primary" },
        { label: "홈으로 가기", href: "/", variant: "outline" },
      ]}
    />
  );
}