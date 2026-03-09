// mypage/bookings/orderId/cancel : 예매 취소 페이지
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { BookingDetail } from "@/shared/types/booking";

// ─── 임시 목업 데이터 ──────────────────────────────────────────────────────────
const MOCK_BOOKING: BookingDetail = {
  id: "1",
  orderId: "TRV-2026-031501",
  bookedAt: "2026.01.20",
  status: "CONFIRMED",
  show: {
    title: "뮤지컬 <킹키부츠>",
    venue: "샤롯데씨어터",
    date: "2026.01.26.(월)",
    time: "오후 7:00-9:30",
    seat: "VIP석 2인",
    posterUrl: "/poster-kinkyboots.jpg",
  },
  finalAmount: 320000,
  items: [
    { name: "VIP석 1층 B구역 16열 6번", quantity: 1, amount: 160000 },
    { name: "VIP석 1층 B구역 16열 7번", quantity: 1, amount: 160000 },
  ],
  totalAmount: 322000,
  paymentInfo: {
    type: "CARD",
    method: "토스페이",
    amount: 322000,
    orderedAt: "2026.01.25.(월) 12:34:07",
  },
  freeCancelDeadline: "2026.01.31(토)",
  guideTitle: "입장 안내",
  guideItems: [
    "공연 시작 1시간 전부터 입장 가능합니다",
    "본인 확인을 위해 신분증을 지참해주세요",
    "QR코드 캡처 화면은 입장 불가합니다",
  ],
  performanceDatetime: new Date("2026-01-26T19:00:00"),
};

const CANCEL_REASONS = [
  "단순 변심",
  "일정 변경",
  "중복 예매",
  "공연 정보 변경",
  "기타",
];

const CANCEL_FEE_RATE = 0.2; // 20% 취소 수수료

function formatAmount(amount: number) {
  return amount.toLocaleString("ko-KR") + "원";
}

// 결제 수단 라벨 추출 (타입에 따라 다르게)
function getRefundMethodLabel(booking: BookingDetail): string {
  if (booking.paymentInfo.type === "CARD") {
    return `${booking.paymentInfo.method} 환불`;
  }
  return "무통장 환불";
}

export default function BookingCancelPage() {
  const router = useRouter();
  const booking = MOCK_BOOKING;

  const [checkedItems, setCheckedItems] = useState<Set<number>>(new Set());
  const [cancelReason, setCancelReason] = useState("");
  const [reasonOpen, setReasonOpen] = useState(false);

  const allChecked = checkedItems.size === booking.items.length;

  const toggleAll = () => {
    if (allChecked) {
      setCheckedItems(new Set());
    } else {
      setCheckedItems(new Set(booking.items.map((_, i) => i)));
    }
  };

  const toggleItem = (idx: number) => {
    const next = new Set(checkedItems);
    if (next.has(idx)) {
      next.delete(idx);
    } else {
      next.add(idx);
    }
    setCheckedItems(next);
  };

  const selectedAmount = booking.items
    .filter((_, idx) => checkedItems.has(idx))
    .reduce((sum, item) => sum + item.amount, 0);

  const cancelFee = Math.floor(selectedAmount * CANCEL_FEE_RATE);
  const refundAmount = selectedAmount - cancelFee;
  const refundMethodLabel = getRefundMethodLabel(booking);

  return (
    <div className="flex-1 py-10 bg-white min-h-screen pl-20">
      <div className="max-w-4xl mx-auto px-4">

        <h1 className="text-[32px] font-bold text-[#23222A] mb-8">예매 취소</h1>

        {/* 경고 배너 */}
        <div className="rounded-lg px-2 py-1 mb-2 bg-[#FFF5F6]">
          <p className="text-[16px] font-bold text-[#F93E4B]">
            취소 진행 전 반드시 취소 수수료와 총 환불 금액을 확인해 주세요.
          </p>
        </div>

        {/* 취소 수수료 안내 */}
        <div className="rounded-lg px-2 py-1 mb-8 bg-[#F1F1F4]">
          <p className="text-[16px] text-[#23222A] font-medium mb-1">지금 예약 취소 시</p>
          <p className="text-[16px] text-[#23222A] font-medium">
            취소 수수료로{" "}
            <span className="text-[16px] font-bold text-[#23222A]">{formatAmount(cancelFee)}</span>이 발생합니다.
          </p>
        </div>

        {/* 환불 예정 정보 */}
        <h2 className="text-[16px] font-bold text-[#23222A] mb-3">환불 예정 정보</h2>

        {/* 전체 선택 */}
        <label className="flex items-center gap-2 mb-3 cursor-pointer">
          <div
            onClick={toggleAll}
            className={`w-5 h-5 rounded-sm border-2 flex items-center justify-center cursor-pointer transition-colors ${
              allChecked
                ? "bg-[#F11322] border-[#F11322]"
                : "bg-white border-[#DDDDE4]"
            }`}
          >
            {allChecked && (
              <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            )}
          </div>
          <span className="text-[14px] font-semibold text-[#68677E]">전체 선택</span>
        </label>

        {/* 티켓 항목 */}
        <div className="flex flex-col gap-3 mb-4">
          {booking.items.map((item, idx) => {
            const isChecked = checkedItems.has(idx);
            return (
              <label
                key={idx}
                className={`flex items-center gap-3 rounded-sm border px-4 py-4 cursor-pointer transition-colors ${
                  isChecked
                    ? "border-[#F11322] bg-[#FFE6E8]"
                    : "border-[#DDDDE4] bg-white"
                }`}
              >
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => toggleItem(idx)}
                  className="w-4 h-4 accent-[#F11322]"
                />
                <div>
                  <p className="text-[14px] font-bold text-[#23222A]">
                    {booking.show.title} {booking.show.date}
                  </p>
                  <p className="text-[13px] text-[#68677E]">{item.name}</p>
                </div>
              </label>
            );
          })}
        </div>

        {/* 금액 정보 */}
        <div className="flex flex-col gap-2 mb-2">
          <div className="flex justify-between text-[14px] font-medium text-[#68677E]">
            <span>결제 금액</span>
            <span>{formatAmount(selectedAmount)}</span>
          </div>
          <div className="flex justify-between text-[14px] font-medium text-[#68677E]">
            <span>취소 수수료</span>
            <span>{formatAmount(cancelFee)}</span>
          </div>
          <hr className="border-[#F1F1F4] my-1" />
          <div className="flex justify-between text-[14px] font-medium text-[#68677E]">
            <span>환불 방법</span>
            <span>{refundMethodLabel}</span>
          </div>
        </div>

        <div className="flex justify-between items-center mb-8">
          <span className="text-[16px] font-bold text-[#23222A]">최종 환불 금액</span>
          <span className="text-[16px] font-bold text-[#23222A]">
            {formatAmount(refundAmount)}
          </span>
        </div>

        {/* 취소 사유 */}
        <h2 className="text-[16px] font-medium text-[#23222A] mb-3">취소 사유</h2>

        {/* 드롭다운 */}
        <div className="relative mb-6">
          <button
            className="w-full flex items-center justify-between rounded-sm border border-[#DDDDE4] px-4 py-3 text-[14px] text-left transition-colors hover:border-[#9E9DAF]"
            onClick={() => setReasonOpen((v) => !v)}
          >
            <span className={cancelReason ? "text-[#23222A]" : "text-[#9E9DAF]"}>
              {cancelReason || "취소 사유를 선택해주세요."}
            </span>
            <svg
              className={`w-4 h-4 text-[#68677E] transition-transform ${reasonOpen ? "rotate-180" : ""}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {reasonOpen && (
            <ul className="absolute z-10 w-full mt-1 rounded-xl border border-[#DDDDE4] bg-white shadow-md overflow-hidden">
              {CANCEL_REASONS.map((reason) => (
                <li
                  key={reason}
                  className="px-4 py-3 text-[14px] text-[#23222A] hover:bg-[#F4F4F6] cursor-pointer transition-colors"
                  onClick={() => {
                    setCancelReason(reason);
                    setReasonOpen(false);
                  }}
                >
                  {reason}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* 취소 환불 정책 */}
        <div className="mb-10">
          <div className="flex items-center gap-1 mb-2">
            <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="#23222A" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" strokeWidth="2" />
              <line x1="12" y1="8" x2="12" y2="12" strokeWidth="2" strokeLinecap="round" />
              <line x1="12" y1="16" x2="12.01" y2="16" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <span className="text-[16px] font-medium text-[#23222A]">취소 환불 정책</span>
          </div>
          <ul className="space-y-1 pl-1">
            {booking.guideItems.map((info, idx) => (
              <li key={idx} className="flex items-start gap-2 text-[13px] text-[#68677E]">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-[#68677E] flex-shrink-0" />
                {info}
              </li>
            ))}
          </ul>
        </div>

        {/* 하단 버튼 */}
        <div className="flex gap-3">
          <button
            className="flex-1 py-2 text-[16px] font-semibold text-[#23222A] hover:bg-gray-50 transition-colors"
            onClick={() => router.back()}
          >
            닫기
          </button>
          <button
            className={`flex-1 rounded-sm py-2 text-[16px] font-semibold text-white transition-colors ${
              checkedItems.size > 0 && cancelReason
                ? "bg-[#F93E4B] hover:bg-[#d40f1e]"
                : "bg-[#DDDDE4] cursor-not-allowed"
            }`}
            disabled={checkedItems.size === 0 || !cancelReason}
            onClick={() => router.push(`/mypage/bookings/${booking.orderId}/cancel/success`)}
          >
            취소 진행
          </button>
        </div>

      </div>
    </div>
  );
}