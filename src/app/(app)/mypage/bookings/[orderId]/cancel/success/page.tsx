// 예매 취소 성공 페이지
"use client";

import { useRouter } from "next/navigation";
import ResultCard from "@/components/common/ResultCard";

// TODO: 실제 API 연동 시 props 또는 route params로 데이터 받기
const MOCK_CANCEL_RESULT = {
  showTitle: "킹키부츠",
  cancelDatetime: "2026.01.26(월) 오후 7:00",
  cancelSeat: "1층 B구역 16열 6번",
  refundStatus: "환불 진행 중",
  paymentAmount: 160000,
  cancelFee: 32000,
  paymentMethod: "토스페이 환불",
  refundAmount: 160000 - 32000,
};

export default function BookingCancelSuccessPage() {
  const m = MOCK_CANCEL_RESULT;

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
        { label: "공연명", value: m.showTitle },
        { label: "취소 일시", value: m.cancelDatetime },
        { label: "취소 좌석", value: m.cancelSeat },
        { label: "환불 상태", value: m.refundStatus, dividerAfter: true }, 
        { label: "결제 금액", value: `${m.paymentAmount.toLocaleString()}원` },
        { label: "취소 수수료", value: `${m.cancelFee.toLocaleString()}원` },
        { label: "환불 방법", value: m.paymentMethod, dividerAfter: true },   
        {
        label: "최종 환불 금액",
        value: `${m.refundAmount.toLocaleString()}원`,
        labelColor: "text-[#68677E] font-bold text-[16px]",  
        valueColor: "text-[#F11322] text-[16px]",            
        },
      ]}
      buttons={[
        { label: "다른 뮤지컬 둘러보기", href: "/shows", variant: "primary" },
        { label: "예매 내역 확인하기", href: "/mypage/bookings", variant: "outline" },
      ]}
    />
  );
}