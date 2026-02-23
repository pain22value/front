"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { paymentService } from "@/features/payments/services/paymentService";

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

  useEffect(() => {
    if (!isValid || confirmed) return;

    (async () => {
      try {
        setConfirming(true);
        setErrorMsg(null);

        await paymentService.confirm(orderId, {
          paymentKey,
          amount,
        });

        setConfirmed(true);
      } catch (e) {
        console.error(e);
        setErrorMsg(
          e instanceof Error ? e.message : "결제 승인 중 오류가 발생했습니다.",
        );
      } finally {
        setConfirming(false);
      }
    })();
  }, [isValid, confirmed, orderId, paymentKey, amount]);

  return (
    <main className="mx-auto my-12 max-w-[560px] p-4">
      <div className="rounded-[14px] border border-gray-200 bg-white p-5">
        <h1 className="text-[22px] font-extrabold">결제 성공</h1>

        <div className="mt-3 text-[13px] text-gray-500">
          <div>paymentKey: {paymentKey || "-"}</div>
          <div>orderId: {orderId || "-"}</div>
          <div>amount: {amountStr || "-"}</div>
        </div>

        <hr className="my-[18px] border-gray-100" />

        {isValid ? (
          <div>
            <div className="font-extrabold text-emerald-500">
              성공 리다이렉트 확인 완료 ✅
            </div>

            <div className="mt-2 text-[13px] text-gray-500">
              {confirming
                ? "승인 요청 중..."
                : confirmed
                  ? "결제가 정상 승인되었습니다."
                  : "(승인 요청 준비 중)"}
            </div>

            {errorMsg && (
              <div className="mt-3 whitespace-pre-wrap rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                {errorMsg}
              </div>
            )}
          </div>
        ) : (
          <div>
            <div className="font-extrabold text-red-700">잘못된 성공 URL</div>
            <div className="mt-2 whitespace-pre-wrap text-sm text-gray-700">
              필수 파라미터(paymentKey, orderId, amount)가 누락됐습니다.
            </div>

            {errorMsg && (
              <div className="mt-3 whitespace-pre-wrap rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                {errorMsg}
              </div>
            )}
          </div>
        )}

        <div className="mt-[18px] flex gap-2">
          <Link
            href="/payments/checkout"
            className="rounded-[10px] border border-gray-200 px-3 py-2.5 text-sm hover:bg-gray-50"
          >
            다시 결제하기
          </Link>

          <Link
            href="/"
            className="rounded-[10px] border border-gray-200 px-3 py-2.5 text-sm hover:bg-gray-50"
          >
            홈으로
          </Link>
        </div>
      </div>
    </main>
  );
}
