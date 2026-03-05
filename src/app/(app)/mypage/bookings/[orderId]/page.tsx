"use client";

import { useEffect, useState } from "react";
import { BookingDetail, STATUS_LABEL, STATUS_COLOR } from "@/shared/types/booking";

// ─── 임시 목업 데이터 (API 연동 전) ──────────────────────────────────────────
const MOCK_BOOKING: BookingDetail = {
  id: "1",
  orderId: "TRV-2026-031501",
  bookedAt: "2026.01.20",
  status: "CONFIRMED",
  entryTime: "1월 11시간 11분 뒤 입장 가능",
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
    { name: "VIP석", quantity: 2, amount: 320000 },
    { name: "예매 수수료", quantity: null, amount: 2000 },
  ],
  totalAmount: 322000,
  paymentMethod: "토스페이",
  paymentAmount: 322000,
  freeCancelDeadline: "2026.01.31(토)",
  admissionInfo: [
    "공연 시작 1시간 전부터 입장 가능합니다",
    "본인 확인을 위해 신분증을 지참해주세요",
    "QR코드 캡처 화면은 입장 불가합니다",
  ],
  performanceDatetime: new Date("2026-01-26T19:00:00"),
};

// ─── 유틸 ────────────────────────────────────────────────────────────────────

function formatAmount(amount: number) {
  return amount.toLocaleString("ko-KR") + "원";
}

function useCountdown(targetDate: Date) {
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    const calc = () => {
      const diff = targetDate.getTime() - Date.now();
      if (diff <= 0) {
        setTimeLeft("입장 시간이 지났습니다");
        return;
      }
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      setTimeLeft(`입장까지 ${days}일 ${hours}시간 ${minutes}분 남음`);
    };
    calc();
    const interval = setInterval(calc, 60_000);
    return () => clearInterval(interval);
  }, [targetDate]);

  return timeLeft;
}

// ─── 메인 컴포넌트 ────────────────────────────────────────────────────────────

export default function BookingDetailPage() {
  const booking = MOCK_BOOKING;
  const timeLeft = useCountdown(booking.performanceDatetime);
  const isConfirmed = booking.status === "CONFIRMED";

return (
  <div className="flex-1 py-10 bg-white min-h-screen pl-20">
    <div className="max-w-4xl mx-auto px-4">  {/* ← 이 안에 전부 다 */}

      <h1 className="text-[32px] font-bold text-[#23222A] mb-6">예매 상세</h1>

      <div className="mb-6">
        <span className={STATUS_COLOR[booking.status]}>
          {STATUS_LABEL[booking.status]}
        </span>
      </div>

      {isConfirmed && (
        <div className="rounded-lg py-1 mb-1 bg-[#FFF5F6]">
          <span className="text-[16px] font-bold text-[#F93E4B]">
            {timeLeft}
          </span>
        </div>
      )}

      <p className="text-[16px] font-bold text-[#23222A] mb-2">
        예매번호{" "}
        <span className="text-[#23222A] font-medium">{booking.orderId}</span>
      </p>

      <div className="flex gap-4 mb-4">
        <div className="h-[90px] w-[64px] shrink-0 rounded-md overflow-hidden flex items-center justify-center">

        </div>
        <div className="flex flex-col justify-center gap-1">
          <p className="text-[14px] font-bold text-[#23222A]">{booking.show.title}</p>
          <p className="text-[13px] text-[#68677E]">{booking.show.date} {booking.show.venue}</p>
          <p className="text-[13px] text-[#68677E]">{booking.show.time}</p>
          <p className="text-[13px] text-[#68677E]">{booking.show.seat}</p>
        </div>
      </div>

      <div className="flex justify-between items-center mb-2">
        <span className="text-[16px] font-bold text-[#23222A]">최종 결제금액</span>
        <span className="text-[16px] font-bold text-[#F11322]">
          {formatAmount(booking.finalAmount)}
        </span>
      </div>
      <hr className="border-[#DDDDE4] mb-2" />

      <div className="mb-2">
        <div className="grid grid-cols-3 font-bold text-[14px] text-[#23222A] mb-1">
          <span>상품명</span>
          <span className="text-center">수량</span>
          <span className="text-right">금액</span>
        </div>
        <hr className="border-[#DDDDE4]" />
        {booking.items.map((item, idx) => (
          <div
            key={idx}
            className="grid grid-cols-3 text-[14px] text-[#68677E] py-2"
          >
            <span>{item.name}</span>
            <span className="text-center">{item.quantity ?? ""}</span>
            <span className="text-right">
              +{item.amount.toLocaleString("ko-KR")}원
            </span>
          </div>
        ))}
        <hr className="border-[#DDDDE4] mb-1" />
        <div className="grid grid-cols-3 text-[14px] font-semibold text-[#23222A] py-2 mb-4">
          <span>합계</span>
          <span />
          <span className="text-right">{formatAmount(booking.totalAmount)}</span>
        </div>
      </div>

      <div className="mb-6">
        <div className="flex justify-between items-center mb-3">
          <span className="text-[16px] font-bold text-[#23222A]">결제 정보</span>
          <span className="text-[16px] font-bold text-[#23222A]">
            {formatAmount(booking.paymentAmount)}
          </span>
        </div>
        <div className="flex items-center gap-2 font-medium text-[14px] text-[#23222A]">
          <span className="w-1 h-5 bg-[#3182F6]" />
          <span>{booking.paymentMethod}</span>
          <span className="ml-auto font-Medium text=[14px] text-[#23222A]">
            {formatAmount(booking.paymentAmount)}
          </span>
        </div>
      </div>

      <p className="text-[14px] font-bold mb-6 text-[#F93E4B]">
        {booking.freeCancelDeadline}까지 무료 취소 가능합니다.
      </p>

      <div className="rounded-lg px-5 py-4 mb-8" style={{ background: "linear-gradient(to right, #FFF5F6, #ECFDFD)" }}>
        <div className="flex items-center gap-2 mb-3">
          <svg className="w-5 h-5 text-teal-600 flex-shrink-0" fill="none" stroke="#23222A" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" strokeWidth="2" />
            <line x1="12" y1="8" x2="12" y2="12" strokeWidth="2" strokeLinecap="round" />
            <line x1="12" y1="16" x2="12.01" y2="16" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <span className="text-[16px] font-bold text-[#23222A]">입장 안내</span>
        </div>
        <ul className="space-y-1">
          {booking.admissionInfo.map((info, idx) => (
            <li key={idx} className="flex items-start gap-2 text-[13px] text-[#68677E]">
              <span className="mt-1.5 w-1 h-1 rounded-full bg-[#68677E] flex-shrink-0" />
              {info}
            </li>
          ))}
        </ul>
      </div>

      {isConfirmed && (
        <div className="flex justify-end">
          <button
            className="px-12 py-2 rounded-md border text-[16px] font-semibold text-[#23222A] border-[#9E9DAF] hover:bg-gray-50 transition-colors"
            onClick={() => alert("예매 취소 API 연동 예정")}
          >
            예매 취소
          </button>
        </div>
      )}

    </div>  {/* max-w-2xl 닫힘 */}
  </div>
);
}