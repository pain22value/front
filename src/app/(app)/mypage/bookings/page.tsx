"use client";

import { useState } from "react";
import Link from "next/link";

// 예매 상태 타입
type BookingStatus = "CONFIRMED" | "PENDING_PAYMENT" | "PARTIAL_CANCEL" | "CANCELED";

type Booking = {
  id: string;
  orderId: string;
  bookedAt: string; // 예매일 "2026.01.20"
  status: BookingStatus;
  dueTime?: string; // 입금대기 마감 시간
  entryTime?: string; // 예매확정 입장 가능 시간
  show: {
    title: string;
    venue: string;
    date: string;
    time: string;
    seat: string;
    posterUrl?: string;
  };
};

// TODO: 백엔드 연동 시 실제 데이터로 교체
const MOCK_BOOKINGS: Booking[] = [
  {
    id: "1",
    orderId: "47ce8f65-796b-408b-af53-8e13767c42b2",
    bookedAt: "2026.01.20",
    status: "CONFIRMED",
    entryTime: "1월 11시간 11분 뒤 입장 가능",
    show: {
      title: "뮤지컬 <킹키부츠>",
      venue: "샤롯데씨어터",
      date: "2026.01.26.(월)",
      time: "오후 7:00-9:30",
      seat: "VIP석 2인",
      posterUrl: "",
    },
  },
  {
    id: "2",
    orderId: "58df9g76-897c-519c-bg64-9f24878d53c3",
    bookedAt: "2026.01.20",
    status: "PENDING_PAYMENT",
    dueTime: "2시간 22분까지 입금",
    show: {
      title: "뮤지컬 <킹키부츠>",
      venue: "샤롯데씨어터",
      date: "2026.01.26.(월)",
      time: "오후 7:00-9:30",
      seat: "VIP석 2인",
      posterUrl: "",
    },
  },
  {
    id: "3",
    orderId: "69eg0h87-908d-620d-ch75-0g35989e64d4",
    bookedAt: "2026.01.20",
    status: "PARTIAL_CANCEL",
    show: {
      title: "뮤지컬 <킹키부츠>",
      venue: "샤롯데씨어터",
      date: "2026.01.26.(월)",
      time: "오후 7:00-9:30",
      seat: "VIP석 2인",
      posterUrl: "",
    },
  },
];

const STATUS_LABEL: Record<BookingStatus, string> = {
  CONFIRMED: "예매확정",
  PENDING_PAYMENT: "입금대기",
  PARTIAL_CANCEL: "부분취소",
  CANCELED: "취소완료",
};

const STATUS_COLOR: Record<BookingStatus, string> = {
  CONFIRMED: "text-[#F93E4B]",
  PENDING_PAYMENT: "text-[#F93E4B]",
  PARTIAL_CANCEL: "text-[#68677E]",
  CANCELED: "text-[#68677E]",
};

const STATUS_BG: Record<BookingStatus, string> = {
  CONFIRMED: "bg-[#FFF5F6] border-[#FDDDE0]",
  PENDING_PAYMENT: "bg-[#FFFBF0] border-[#FFE9A0]",
  PARTIAL_CANCEL: "bg-[#F7F7F9] border-[#DDDDE4]",
  CANCELED: "bg-[#F7F7F9] border-[#DDDDE4]",
};

// 포스터 placeholder
function PosterPlaceholder() {
  return (
    <div className="h-[90px] w-[64px] shrink-0 rounded-md bg-gradient-to-b from-[#F93E4B] to-[#c0202b] flex items-center justify-center">
      <span className="text-[10px] font-bold text-white text-center leading-tight px-1">킹키부츠</span>
    </div>
  );
}

function BookingCard({ booking }: { booking: Booking }) {
  const isPendingPayment = booking.status === "PENDING_PAYMENT";

  return (
    <div className={`rounded-xl border ${STATUS_BG[booking.status]} overflow-hidden`}>
      {/* 상태 배너 */}
      <div className="px-4 pt-3 pb-2">
        <span className={`text-[13px] font-bold ${STATUS_COLOR[booking.status]}`}>
          {STATUS_LABEL[booking.status]}
        </span>
        {booking.entryTime && (
          <p className="mt-0.5 text-[13px] font-semibold text-[#F93E4B]">{booking.entryTime}</p>
        )}
        {booking.dueTime && (
          <p className="mt-0.5 text-[13px] font-semibold text-[#E8A800]">{booking.dueTime}</p>
        )}
      </div>

      {/* 공연 정보 */}
      <div className="bg-white mx-3 mb-3 rounded-lg border border-[#DDDDE4] px-4 py-3">
        <div className="flex items-start gap-3">
          {/* 포스터 */}
          <PosterPlaceholder />

          {/* 텍스트 정보 */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="text-[14px] font-bold text-[#23222A]">{booking.show.title}</p>
                <p className="mt-1 text-[13px] text-[#68677E]">{booking.show.date} {booking.show.venue}</p>
                <p className="text-[13px] text-[#68677E]">{booking.show.time}</p>
                <p className="text-[13px] text-[#68677E]">{booking.show.seat}</p>
              </div>
              <Link
                href={`/mypage/bookings/${booking.orderId}`}
                className="shrink-0 flex items-center gap-0.5 text-[13px] text-[#68677E] hover:text-[#23222A] transition-colors"
              >
                예매 상세
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>

        {/* 액션 버튼 */}
        <div className="mt-3 flex gap-2 border-t border-[#F1F1F4] pt-3">
          <button className="flex-1 rounded-md border border-[#DDDDE4] py-2 text-[13px] font-semibold text-[#23222A] hover:bg-gray-50 transition-colors">
            작품 상세
          </button>
          <button className="flex-1 rounded-md border border-[#DDDDE4] py-2 text-[13px] font-semibold text-[#23222A] hover:bg-gray-50 transition-colors">
            주소 복사
          </button>
          {isPendingPayment ? (
            <button className="flex-1 rounded-md bg-[#23222A] py-2 text-[13px] font-semibold text-white hover:bg-[#3a3945] transition-colors">
              입금하기
            </button>
          ) : (
            <button className="flex-1 rounded-md border border-[#DDDDE4] py-2 text-[13px] font-semibold text-[#68677E] hover:bg-gray-50 transition-colors">
              예매 취소
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// 날짜별 그룹핑
function groupByDateAndStatus(bookings: Booking[]) {
  const map = new Map<string, Booking[]>();
  for (const b of bookings) {
    const key = `${b.bookedAt}_${b.status}`;
    const list = map.get(key) ?? [];
    list.push(b);
    map.set(key, list);
  }
  return map;
}

export default function BookingsPage() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // TODO: 백엔드 연동 시 날짜 필터로 API 호출
  const grouped = groupByDateAndStatus(MOCK_BOOKINGS);

  return (
    <div className="flex gap-6 py-8 pr-6 pl-32 max-w-[1600px] mx-auto">
      {/* LEFT: 예매 내역 */}
      <section className="flex-1 min-w-0">
        <h1 className="text-[32px] font-bold text-[#23222A] mb-6">예매 내역 확인</h1>

        <div className="space-y-8">
          {Array.from(grouped.entries()).map(([key, bookings]) => (
            <div key={key}>
              <p className="text-[20px] font-bold text-[#23222A] mb-3">예매일 {key.split("_")[0]}</p>
              <div className="space-y-3">
                {bookings.map((booking) => (
                  <BookingCard key={booking.id} booking={booking} />
                ))}
              </div>
            </div>
          ))}

          {grouped.size === 0 && (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <p className="text-[15px] font-semibold text-[#23222A]">예매 내역이 없습니다</p>
              <p className="mt-1 text-[13px] text-[#68677E]">조회 기간을 변경해보세요</p>
            </div>
          )}
        </div>
      </section>

      {/* RIGHT: 조회기간 필터 */}
      <aside className="w-[220px] shrink-0 pt-[64px]">
        <div className="sticky top-[68px] rounded-xl border border-[#DDDDE4] bg-white p-4">
          <p className="text-[16px] font-bold text-[#23222A] mb-4">조회기간 선택</p>

          <div className="space-y-3">
            <div>
              <label className="text-[14px] font-medium text-[#68677E] mb-1 block">종료일</label>
              <div className="relative">
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full rounded-md border border-[#DDDDE4] px-3 py-2 text-[13px] text-[#23222A] outline-none focus:border-[#F93E4B] transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="text-[14px] font-medium text-[#68677E] mb-1 block">시작일</label>
              <div className="relative">
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full rounded-md border border-[#DDDDE4] px-3 py-2 text-[13px] text-[#23222A] outline-none focus:border-[#F93E4B] transition-colors"
                />
              </div>
            </div>

            <button
              // TODO: 백엔드 연동 시 날짜 필터 API 호출
              onClick={() => console.log("조회:", startDate, endDate)}
              className="w-full rounded-md border border-[#9E9DAF] py-2 text-[16px] font-semibold text-[#22212B] hover:bg-gray-50 transition-colors mt-1"
            >
              조회하기
            </button>
          </div>
        </div>
      </aside>
    </div>
  );
}