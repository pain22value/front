"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useAuthStore } from "@/features/auth/store/useAuthStore";
import {
  paymentService,
  type ConfirmPaymentResponse,
} from "@/features/payments/services/paymentService";
import { consumeBeRiskMockSuccessWarning } from "@/shared/lib/beRiskMock";
import { useModalStore } from "@/shared/stores/modalStore";
import ResultCard from "@/components/common/ResultCard";

type Props = {
  searchParams: { paymentKey?: string; orderId?: string; amount?: string };
};

export default function SuccessClient({ searchParams }: Props) {
  const { user } = useAuthStore();
  const { openAlert } = useModalStore();
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
  const [paymentResult, setPaymentResult] =
    useState<ConfirmPaymentResponse | null>(null);
  const [warningShown, setWarningShown] = useState(false);
  const [bookingInfo, setBookingInfo] = useState<{
    showTitle: string;
    datetime: string;
    seats: string[];
    method: string;
  } | null>(null);

  useEffect(() => {
    console.log({ isValid, confirmed, paymentKey, orderId, amount }); // ← 추가
    if (!isValid || confirmed) return;

    (async () => {
      try {
        setConfirming(true);
        setErrorMsg(null);
        const result = await paymentService.confirm({
          paymentKey,
          orderId,
          amount,
        });
        console.log("confirm 성공:", result); // ← 추가
        setPaymentResult(result);
        setConfirmed(true);
      } catch (e: unknown) {
        console.log("confirm 에러:", e); // ← 추가
        const err = e as { response?: { data?: { message?: string } } };
        setErrorMsg(
          err?.response?.data?.message ?? "결제 승인 중 오류가 발생했습니다.",
        );
        setConfirmed(true);
      } finally {
        console.log("finally 실행"); // ← 추가
        setConfirming(false);
      }
    })();
  }, [isValid, confirmed, orderId, paymentKey, amount]);

  useEffect(() => {
    const raw = sessionStorage.getItem("pendingBooking");
    if (raw) {
      setBookingInfo(JSON.parse(raw));
      sessionStorage.removeItem("pendingBooking");
    }
  }, []);

  useEffect(() => {
    if (!confirmed || errorMsg || warningShown) return;

    const riskCount = consumeBeRiskMockSuccessWarning(user?.email);
    if (!riskCount) return;

    setWarningShown(true);
    openAlert({
      title: "매크로 의심 유저입니다.",
      description: (
        <span className="whitespace-pre-line">
          {`현재 ${riskCount + 1}회 봇으로 감지됐습니다.\n4회 : 24시간 / 5회 : 1주 / 6회 이상 : 영구 차단됩니다.`}
        </span>
      ),
      confirmText: "확인",
    });
  }, [confirmed, errorMsg, openAlert, user?.email, warningShown]);

  if (confirming) {
    return (
      <main className="flex flex-col items-center justify-center py-24">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-[#F93E4B]" />
        <p className="mt-4 text-sm text-gray-500">
          결제를 승인하는 중입니다...
        </p>
      </main>
    );
  }

  if (errorMsg) {
    return (
      <main className="flex flex-col items-center justify-center py-24 px-4">
        <div className="w-full max-w-md rounded-xl border border-[#ffe4e6] bg-[#fff5f5] p-6 text-center">
          <div className="mb-3 text-3xl">⚠️</div>
          <h1 className="text-lg font-extrabold text-[#F93E4B]">
            결제 승인 실패
          </h1>
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

  const totalAmount = amount;
  const isVirtualAccount = bookingInfo?.method === "VIRTUAL_ACCOUNT";

  return (
    <ResultCard
      title="예매 완료"
      description="티켓이 성공적으로 예매되었습니다!"
      orderId={orderId}
      infoRows={[
        { label: "공연명", value: bookingInfo?.showTitle ?? "-" },
        { label: "일시", value: bookingInfo?.datetime ?? "-" },
        {
          label: "좌석",
          value: (
            <div className="text-right">
              {bookingInfo?.seats.map((seat, idx) => (
                <div key={idx}>{seat}</div>
              )) ?? "-"}
            </div>
          ),
        },
        {
          label: "최종 결제금액",
          value: isVirtualAccount
            ? `${totalAmount.toLocaleString()}원 (무통장 입금)`
            : `${totalAmount.toLocaleString()}원`,
          valueColor: "text-[#F11322]",
          // 무통장 입금일 때만 계좌 정보 펼쳐짐
          expandable: isVirtualAccount ? (
            <div className="space-y-0.5">
              <p className="text-[#23222A] font-medium font-[14px]">
                {"우리은행 26109854118255 (TRUVE)"}
              </p>
              <p className="text-[#F11322] font-medium font-[14px]">
                {"2026.01.26(월) 23:59까지"}
              </p>
            </div>
          ) : undefined,
        },
      ]}
      buttons={[
        {
          label: "예매 확인하기",
          href: "/mypage/bookings",
          variant: "primary",
        },
        { label: "홈으로 가기", href: "/", variant: "outline" },
      ]}
    />
  );
}
