// mypage/bookings : 예매 내역 확인 페이지
"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Booking, BookingStatus, STATUS_LABEL, STATUS_COLOR, STATUS_BG } from "@/shared/types/booking";
import { bookingService } from "@/features/mypage/services/bookingService";

// 포스터 placeholder
function PosterPlaceholder({ title }: { title: string }) {
  const isSlipNoMore = title.includes("슬립노모어");
  return (
    <div className="h-[90px] w-[64px] shrink-0 rounded-md overflow-hidden flex items-center justify-center">
      {isSlipNoMore ? (
        // 슬립노모어 SVG
        <svg width="100%" height="100%" viewBox="0 0 200 267" fill="none" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" preserveAspectRatio="xMidYMid meet">
        <path d="M0 8C0 3.58172 3.58172 0 8 0H192C196.418 0 200 3.58172 200 8V259C200 263.418 196.418 267 192 267H8C3.58173 267 0 263.418 0 259V8Z" fill="url(#pattern0_563_7124)"/>
        <defs>
        <pattern id="pattern0_563_7124" patternContentUnits="objectBoundingBox" width="1" height="1">
        <use xlinkHref="#image0_563_7124" transform="matrix(0.001335 0 0 0.001 -0.000625 0)"/>
        </pattern>
        </defs>
        </svg>

      ) : (
        // 킹키부츠 SVG
        <svg width="200" height="267" viewBox="0 0 200 267" fill="none" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
        <path d="M0 8C0 3.58172 3.58172 0 8 0H192C196.418 0 200 3.58172 200 8V259C200 263.418 196.418 267 192 267H8C3.58173 267 0 263.418 0 259V8Z" fill="url(#pattern0_563_7125)"/>
        <defs>
        <pattern id="pattern0_563_7125" patternContentUnits="objectBoundingBox" width="1" height="1">
        <use xlinkHref="#image0_563_7125" transform="matrix(0.001335 0 0 0.001 -0.000625 0)"/>
        </pattern>
        </defs>
        </svg>

      )}
    </div>
  );
}

function BookingCard({ booking }: { booking: Booking }) {
  const isPendingPayment = booking.status === "PENDING_PAYMENT";
  const isWatched = booking.status === "WATCHED";
  const [showToast, setShowToast] = useState(false);
  const [isReviewed, setIsReviewed] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const reviewed = JSON.parse(localStorage.getItem("reviewedOrders") ?? "[]");
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsReviewed(reviewed.includes(booking.orderId));
  }, [booking.orderId]);


  return (
    <div className={`rounded-xl border ${STATUS_BG[booking.status]} overflow-hidden`}>
      {/* 상태 배너 */}
      <div className="px-4 pt-3 pb-2">
        <span className={`text-[13px] font-bold ${STATUS_COLOR[booking.status]}`}>
          {STATUS_LABEL[booking.status]}
        </span>
        {booking.entryTime && (
          <p className="mt-0.5 text-[16px] font-bold text-[#F93E4B] bg-[#FFF5F6] px-1 py-1 rounded-md">
            {booking.entryTime}
          </p>
        )}
        {booking.dueTime && (
          <p className="mt-0.5 text-[16px] font-bold text-[#0B9B9D] bg-[#ECFDFD] px-1 py-1 rounded-md">
            {booking.dueTime}
          </p>
        )}
      </div>

      {/* 공연 정보 */}
      <div className="bg-white mx-3 mb-3 px-1 py-3">
        <div className="flex items-start gap-3">
          {/* 포스터 */}
          <div className="h-[90px] w-[64px] shrink-0 rounded-md overflow-hidden relative">
            {booking.show.posterUrl ? (
              <Image
                src={booking.show.posterUrl}
                alt={booking.show.title}
                fill
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full bg-[#F1F1F4]" />
            )}
          </div>

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
        <div className="mt-3 flex gap-2 pt-1">
          <Link
            href={`/shows/${booking.showId}`}
            className="flex-1 rounded-md border border-[#9E9DAF] py-2 text-[16px] font-semibold text-[#23222A] hover:bg-gray-50 transition-colors text-center"
          >
            작품 상세
          </Link>
          <button
            className="flex-1 rounded-md border border-[#9E9DAF] py-2 text-[16px] font-semibold text-[#23222A] hover:bg-gray-50 transition-colors"
            onClick={() => {
              navigator.clipboard.writeText(booking.show.address);
              setShowToast(true);
              setTimeout(() => setShowToast(false), 2000);
            }}
          >
            주소 복사
          </button>
          {isPendingPayment ? (
            <Link href={`/mypage/bookings/${booking.orderId}`} className="flex-1">
              <button className="w-full rounded-md bg-[#23222A] py-2 text-[16px] font-semibold text-white hover:bg-[#3a3945] transition-colors">입금하기</button>
            </Link>
          ) : isWatched ? (
                isReviewed ? (
                  <button className="flex-1 rounded-md py-2 text-[16px] font-semibold bg-[#33323D] text-[#FFFFFF] hover:bg-[#4a4958] transition-colors">
                    내 관람평 보기
                  </button>
                ) : (
                  <Link href={`/mypage/bookings/${booking.orderId}/review`} className="flex-1">
                    <button className="w-full rounded-md bg-[#F93E4B] border border-[#F93E4B] py-2 text-[16px] font-semibold text-[#FFFFFF] hover:bg-[#f95360] transition-colors">
                      관람평 작성
                    </button>
                  </Link>
                )
          ) : booking.status !== "PARTIAL_CANCEL" && booking.status !== "CANCELED" ? (
            <Link href={`/mypage/bookings/${booking.orderId}/cancel`} className="flex-1">
              <button className="w-full rounded-md py-2 text-[16px] font-semibold text-[#22212B] hover:bg-gray-50 transition-colors">예매 취소</button>
            </Link>
          ) : null}
        </div>
      </div>

      {/* 토스트 ← 여기 추가 */}
      {showToast && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 rounded-lg px-6 py-3 bg-[#322F35] w-[calc(100%-32px)] max-w-[800px]">
          <p className="text-[16px] font-normal text-[#F5EFF7]">주소가 복사되었습니다.</p>
        </div>
      )}
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
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchBookings = async () => {
      setIsLoading(true);
      try {
        const data = await bookingService.getBookings();
        setBookings(data);
      } catch (e) {
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    };
    fetchBookings();
  }, []);


  // TODO: 백엔드 연동 시 날짜 필터로 API 호출
  const grouped = groupByDateAndStatus(bookings);

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
              onClick={async () => {
                setIsLoading(true);
                try {
                  const data = await bookingService.getBookings(startDate, endDate);
                  setBookings(data);
                } catch (e) {
                  console.error(e);
                } finally {
                  setIsLoading(false);
                }
              }}
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