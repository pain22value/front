"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { paymentService, type ConfirmPaymentResponse } from "@/features/payments/services/paymentService";

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

        const result = await paymentService.confirm(orderId, {
          paymentKey,
          amount,
        });

        setPaymentResult(result);
        setConfirmed(true);
      } catch (e) {
        console.error(e);
        // TODO: 백엔드 confirm API 완성되면 아래 두 줄 교체
        // setErrorMsg(e instanceof Error ? e.message : "결제 승인 중 오류가 발생했습니다.");
        setConfirmed(true); // 백엔드 미완성 상태에서 임시로 성공 처리
      } finally {
        setConfirming(false);
      }
    })();
  }, [isValid, confirmed, orderId, paymentKey, amount]);

  // 로딩 중
  if (confirming) {
    return (
      <main className="flex flex-col items-center justify-center py-24">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-[#F93E4B]" />
        <p className="mt-4 text-sm text-gray-500">결제를 승인하는 중입니다...</p>
      </main>
    );
  }

  // 에러
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

  // 잘못된 URL
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

  // 예매 완료 화면
  // TODO: 실제 좌석·공연 정보는 백엔드 GET /payments/:orderId 연동 후 교체 필요
  const totalAmount = paymentResult?.totalAmount ?? amount;

  return (
    <>
      <main
        className="flex flex-col items-center pt-16 py-16 px-4  min-h-[calc(100vh-64px)]"
        style={{ background: "radial-gradient(ellipse at bottom right, #FFF5F6 0%, #FFFFFF 80%)" }}
      >
        {/* 체크 아이콘 */}
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#F93E4B]">
          <svg
            className="h-8 w-8 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={3.5}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>

        {/* 타이틀 */}
        <h1 className="mt-5 text-[24px] font-bold text-[#23222A]">예매 완료</h1>
        <p className="mt-1 text-[16px] font-regular text-[#68677E]">티켓이 성공적으로 예매되었습니다!</p>

        {/* 예매 정보 카드 */}
        <div className="mt-4 w-full max-w-[504px] rounded-xl border border-[#DDDDE4] bg-white">
          {/* 예매 번호 */}
          <div className="px-4 py-2 text-center">
            <p className="text-[16px] font-semibold text-[#23222A]">내 예매 번호</p>
            <p className="mt-1 text-[20px] font-bold tracking-widest text-[#23222A]">
              {/* TODO: 백엔드에서 예매 번호 포맷 확정되면 교체 */}
              {orderId}
            </p>
          </div>
          <div className="mx-6 h-px bg-[#F1F1F4]" />
          {/* 상세 정보 */}
          <div className="space-y-1 px-6 py-3 text-[14px] font-medium text-[#68677E]">
            <InfoRow label="공연명" value="킹키부츠"/>
            <InfoRow label="일시" value="2026.01.26(월) 오후 7:00" />
            <InfoRow
              label="좌석"
              value={
                <div className="text-right text-[#23222A]">
                  {/* TODO: 백엔드 응답에서 실제 좌석 정보로 교체 */}
                  <div>1층 B구역 16열 6번</div>
                  <div>1층 B구역 16열 7번</div>
                </div>
              }
            />
          </div>

          {/* 결제금액 */}
          <div className="mx-6 h-px bg-[#F1F1F4]" />
          <div className="px-6 py-3">
            <div className="flex items-center justify-between">
              <span className="text-[16px] font-bold text-[#68677E]">최종 결제금액</span>
              <span className="text-[16px] font-bold text-[#F11322]">
                {totalAmount.toLocaleString()}원
              </span>
            </div>
          </div>

          {/* 버튼 */}
          <div className="space-y-2 px-6 pb-6 pt-2">
            <Link
              href={`/mypage/bookings/${orderId}`}
              className="block w-full rounded-md bg-[#F93E4B] py-3 text-center text-[16px] font-semibold text-white hover:bg-[#e0323e] active:scale-[0.99] transition-transform"
            >
              예매 확인하기
            </Link>
            <Link
              href="/"
              className="block w-full rounded-md border border-[#9E9DAF] py-3 text-center text-[16px] font-semibold text-[#22212B] hover:bg-gray-50 transition-colors"
            >
              홈으로 가기
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}

/** ---------- UI helper ---------- */
function InfoRow({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="flex items-start justify-between gap-4">
      <span className="shrink-0 text-gray-400">{label}</span>
      <span className="text-right font-semibold text-gray-900">{value}</span>
    </div>
  );
}