"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import ResultCard from "@/components/common/ResultCard";

export default function BookingCancelSuccessPage() {
  const params = useParams();
  const orderId = params.orderId as string;

  const [result, setResult] = useState<{
    showTitle: string;
    cancelDatetime: string;
    cancelSeats: string[];
    refundStatus: string;
    paymentAmount: number;
    cancelFee: number;
    refundAmount: number;
    paymentMethod: string;
  } | null>(null);

  useEffect(() => {
    const raw = sessionStorage.getItem("cancelResult");
    if (!raw) return;
    const parsed = JSON.parse(raw);
    sessionStorage.removeItem("cancelResult");
    setTimeout(() => setResult(parsed), 0);
  }, []);

  if (!result) return (
    <div className="flex items-center justify-center py-20">
      <p className="text-[16px] text-[#68677E]">로딩 중...</p>
    </div>
  );

  return (
    <ResultCard
      title="예매 취소 완료"
      description={
        <>
          <p>예매 취소 되었습니다.</p>
          <p>환불은 영업일 기준 3-5일 소요됩니다.</p>
        </>
      }
      infoRows={[
        { label: "공연명", value: result.showTitle },
        { label: "취소 일시", value: result.cancelDatetime },
        { label: "취소 좌석", value: result.cancelSeats.join(", ") },
        { label: "환불 상태", value: result.refundStatus, dividerAfter: true },
        { label: "결제 금액", value: `${result.paymentAmount.toLocaleString()}원` },
        { label: "취소 수수료", value: `${result.cancelFee.toLocaleString()}원` },
        { label: "환불 방법", value: result.paymentMethod, dividerAfter: true },
        {
          label: "최종 환불 금액",
          value: `${result.refundAmount.toLocaleString()}원`,
          labelColor: "text-[#68677E] font-bold text-[16px]",
          valueColor: "text-[#F11322] text-[16px]",
        },
      ]}
      buttons={[
        { label: "다른 뮤지컬 둘러보기", href: "/shows", variant: "primary" },
        { label: "예매 내역 확인하기", href: `/mypage/bookings/${orderId}`, variant: "outline" },
      ]}
    />
  );
}