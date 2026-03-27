// mypage/bookings/orderId : 예매 상세 페이지
"use client";

import { useEffect, useState } from "react";
import { BookingDetail, STATUS_LABEL, STATUS_COLOR } from "@/shared/types/booking";
import { useRouter, useParams } from "next/navigation";
import { bookingService } from "@/features/mypage/services/bookingService";

// ─── 유틸 ────────────────────────────────────────────────────────────────────

function formatAmount(amount: number) {
  return amount.toLocaleString("ko-KR") + "원";
}

function useCountdown(targetDate: Date | undefined) {
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    if (!targetDate) return;
    const calc = () => {
      const diff = targetDate.getTime() - Date.now();
      if (diff <= 0) {
        setTimeLeft("시간이 지났습니다");
        return;
      }
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      if (days > 0) {
        setTimeLeft(`${days}일 ${hours}시간 ${minutes}분 전`);
      } else {
        setTimeLeft(`${hours}시간 ${minutes}분 전`);
      }
    };
    calc();
    const interval = setInterval(calc, 60_000);
    return () => clearInterval(interval);
  }, [targetDate]);

  return timeLeft;
}

// ─── 서브 컴포넌트 ─────────────────────────────────────────────────────────────

function ConfirmedBanner({ performanceDatetime }: { performanceDatetime: Date }) {
  const timeLeft = useCountdown(performanceDatetime);
  return (
    <div className="rounded-lg px-1 py-1 mb-1 bg-[#FFF5F6]">
      <span className="text-[16px] font-bold text-[#F93E4B]">
        입장까지 {timeLeft}
      </span>
    </div>
  );
}

function PendingPaymentBanner({ depositDeadline }: { depositDeadline: Date }) {
  const timeLeft = useCountdown(depositDeadline);
  return (
    <div className="rounded-lg px-1 py-1 mb-1 bg-[#ECFDFD]">
      <span className="text-[16px] font-bold text-[#0B9B9D]">
        입금 마감 {timeLeft}
      </span>
    </div>
  );
}

function PaymentInfoSection({ booking }: { booking: BookingDetail }) {
  const { paymentInfo } = booking;

  if (paymentInfo.type === "VIRTUAL_ACCOUNT") {
    return (
      <div className="mb-6">
        <div className="flex justify-between items-center mb-3">
          <span className="text-[16px] font-bold text-[#23222A]">결제 정보</span>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between text-[14px]">
            <span className="text-[#68677E] font-medium text-[14px]">입금자명</span>
            <span className="text-[#68677E] font-medium text-[14px]">{paymentInfo.depositName}</span>
          </div>
          <div className="flex justify-between text-[14px]">
            <span className="text-[#68677E] font-medium text-[14px]">결제수단 (무통장 입금)</span>
            <div className="text-right">
              <p className="text-[#23222A] font-medium text-[14px]">{paymentInfo.bankAccount}</p>
              <p className="text-[#F11322] font-medium text-[14px]">{paymentInfo.depositDeadline}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-2">
        <span className="text-[16px] font-bold text-[#23222A]">결제 정보</span>
        <span className="text-[16px] font-bold text-[#23222A]">
          {formatAmount(paymentInfo.amount)}
        </span>
      </div>
      <div className="flex items-center gap-2 font-medium text-[14px] text-[#23222A] mb-2">
        <span className="w-1 h-5 bg-[#3182F6]" />
        <span>{paymentInfo.method}</span>
        <span className="ml-auto text-[14px] text-[#23222A]">
          {formatAmount(paymentInfo.amount)}
        </span>
      </div>
      {booking.status !== "CONFIRMED" && (
        <div className="flex justify-between text-[14px] text-[#68677E]">
          <span>주문 일시</span>
          <span>{paymentInfo.orderedAt}</span>
        </div>
      )}
    </div>
  );
}

function GuideBox({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-lg px-5 py-4 mb-8" style={{ background: "linear-gradient(to right, #FFF5F6, #ECFDFD)" }}>
      <div className="flex items-center gap-2 mb-3">
        <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="#23222A" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10" strokeWidth="2" />
          <line x1="12" y1="8" x2="12" y2="12" strokeWidth="2" strokeLinecap="round" />
          <line x1="12" y1="16" x2="12.01" y2="16" strokeWidth="2" strokeLinecap="round" />
        </svg>
        <span className="text-[16px] font-bold text-[#23222A]">{title}</span>
      </div>
      <ul className="space-y-1">
        {items.map((info, idx) => (
          <li key={idx} className="flex items-start gap-2 text-[13px] text-[#68677E]">
            <span className="mt-1.5 w-1 h-1 rounded-full bg-[#68677E] flex-shrink-0" />
            {info}
          </li>
        ))}
      </ul>
    </div>
  );
}

// ─── 메인 컴포넌트 ────────────────────────────────────────────────────────────

export default function BookingDetailPage() {
  const params = useParams();
  const router = useRouter();
  const orderId = params.orderId as string;

  const [booking, setBooking] = useState<BookingDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const data = await bookingService.getBookingDetail(orderId);
        setBooking(data);
      } catch (e) {
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    };
    fetchBooking();
  }, [orderId]);

  if (isLoading) return (
    <div className="flex items-center justify-center py-20">
      <p className="text-[16px] text-[#68677E]">로딩 중...</p>
    </div>
  );

  if (!booking) return (
    <div className="flex-1 py-10 bg-white min-h-screen pl-20">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-[32px] font-bold text-[#23222A] mb-6">예매 상세</h1>
        <p className="text-[16px] text-[#68677E]">예매 정보를 찾을 수 없습니다.</p>
      </div>
    </div>
  );

  const isConfirmed = booking.status === "CONFIRMED";
  const isPendingPayment = booking.status === "PENDING_PAYMENT";
  const isWatched = booking.status === "WATCHED";
  const isCanceled = booking.status === "CANCELED" || booking.status === "PARTIAL_CANCEL";
  const showFinalAmount = !isPendingPayment;

  return (
    <div className="flex-1 py-10 bg-white min-h-screen pl-20">
      <div className="max-w-4xl mx-auto px-4">

        <h1 className="text-[32px] font-bold text-[#23222A] mb-6">예매 상세</h1>

        {/* 상태 텍스트 */}
        <div className="mb-6">
          <span className={STATUS_COLOR[booking.status]}>
            {STATUS_LABEL[booking.status]}
          </span>
        </div>

        {/* 상태별 배너 */}
        {isConfirmed && booking.performanceDatetime && (
          <ConfirmedBanner performanceDatetime={booking.performanceDatetime} />
        )}
        {isPendingPayment && booking.depositDeadline && (
          <PendingPaymentBanner depositDeadline={booking.depositDeadline} />
        )}

        {/* 예매번호 */}
        <p className="text-[16px] font-bold text-[#23222A] mb-4">
          예매번호{" "}
          <span className="text-[#23222A] font-medium">{booking.orderId}</span>
        </p>

        {/* 공연 정보 */}
        <div className="flex gap-4 mb-6">
          <div className="h-[90px] w-[64px] shrink-0 rounded-md overflow-hidden flex items-center justify-center">
            <svg width="200" height="267" viewBox="0 0 200 267" fill="none" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
              <path d="M0 8C0 3.58172 3.58172 0 8 0H192C196.418 0 200 3.58172 200 8V259C200 263.418 196.418 267 192 267H8C3.58173 267 0 263.418 0 259V8Z" fill="url(#pattern0_563_7125)"/>
              <defs>
                <pattern id="pattern0_563_7125" patternContentUnits="objectBoundingBox" width="1" height="1">
                  <use xlinkHref="#image0_563_7125" transform="matrix(0.001335 0 0 0.001 -0.000625 0)"/>
                </pattern>
              </defs>
            </svg>
          </div>
          <div className="flex flex-col justify-center gap-1">
            <p className="text-[14px] font-bold text-[#23222A]">{booking.show.title}</p>
            <p className="text-[13px] text-[#68677E]">{booking.show.date} {booking.show.venue}</p>
            <p className="text-[13px] text-[#68677E]">{booking.show.time}</p>
            <p className="text-[13px] text-[#68677E]">{booking.show.seat}</p>
          </div>
        </div>

        {/* 최종 결제금액 */}
        {showFinalAmount ? (
          <>
            <div className="flex justify-between items-center mb-2">
              <span className="text-[16px] font-bold text-[#23222A]">최종 결제금액</span>
              <span className="text-[16px] font-bold text-[#F11322]">
                {formatAmount(booking.finalAmount)}
              </span>
            </div>
            <hr className="border-[#F1F1F4] mb-2" />
          </>
        ) : (
          <>
            <div className="mb-2">
              <span className="text-[16px] font-bold text-[#23222A]">결제액</span>
            </div>
            <hr className="border-[#F1F1F4] mb-2" />
          </>
        )}

        {/* 상품 내역 테이블 */}
        <div className="mb-6">
          <div className="grid grid-cols-3 font-bold text-[14px] text-[#23222A] mb-1">
            <span>상품명</span>
            <span className="text-center">수량</span>
            <span className="text-right">금액</span>
          </div>
          <hr className="border-[#F1F1F4]" />
          {booking.items.map((item, idx) => (
            <div key={idx} className="grid grid-cols-3 text-[14px] text-[#68677E] py-1">
              <span>{item.name}</span>
              <span className="text-center">{item.quantity ?? ""}</span>
              <span className="text-right">
                {item.name.includes("수수료") ? "+" : ""}{item.amount.toLocaleString("ko-KR")}원
              </span>
            </div>
          ))}
          <hr className="border-[#F1F1F4] mb-1" />
          <div className="grid grid-cols-3 text-[14px] font-semibold text-[#23222A] py-2">
            <span>합계</span>
            <span />
            <span className="text-right">{formatAmount(booking.totalAmount)}</span>
          </div>
        </div>

        {/* 결제 정보 */}
        <PaymentInfoSection booking={booking} />

        {/* 무료 취소 기한 - CONFIRMED만 */}
        {isConfirmed && booking.freeCancelDeadline && (
          <p className="text-[14px] font-bold mb-6 text-[#F93E4B]">
            {booking.freeCancelDeadline}까지 무료 취소 가능합니다.
          </p>
        )}

        {/* 환불 정보 - PARTIAL_CANCEL만 */}
        {booking.cancelInfo && (
          <>
            <div className="mb-6 rounded-lg bg-[#F1F1F4] px-4 py-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-[16px] font-bold text-[#23222A]">최종 환불 금액</span>
                <span className="text-[16px] font-bold text-[#F11322]">
                  {formatAmount(booking.cancelInfo.refundAmount)}
                </span>
              </div>
              <hr className="border-[#DDDDE4] mb-2" />
              <p className="text-[14px] font-bold text-[#F93E4B] mb-2">취소 내역</p>
              <hr className="border-[#DDDDE4] mb-2" />
              <div className="space-y-1 mb-2">
                {booking.cancelInfo.canceledSeats.map((seat, idx) => (
                  <div key={idx} className="flex justify-between text-[14px] text-[#68677E] font-medium">
                    <span>취소 좌석</span>
                    <span>{seat}</span>
                  </div>
                ))}
                <div className="flex justify-between text-[14px] text-[#68677E] font-medium">
                  <span>취소 수수료</span>
                  <span>{formatAmount(booking.cancelInfo.cancelFee)}</span>
                </div>
                <hr className="border-[#DDDDE4] mb-2" />
                <div className="flex justify-between text-[14px] text-[#23222A] font-medium">
                  <span>환불 금액</span>
                  <span>{formatAmount(booking.cancelInfo.refundAmount)}</span>
                </div>
              </div>
              <hr className="border-[#F1F1F4] mb-2" />
              <div className="flex justify-between items-center mb-2 mt-4">
                <span className="text-[16px] font-bold text-[#23222A]">환불 정보</span>
              </div>
              <div className="flex items-center gap-2 font-medium text-[14px] text-[#23222A]">
                <span className="w-1 h-5 bg-[#3182F6]" />
                <span>
                  {"method" in booking.paymentInfo ? booking.paymentInfo.method : "토스페이"}
                </span>
                <span className="ml-auto text-[14px] text-[#23222A]">
                  {formatAmount(booking.cancelInfo.refundAmount)}
                </span>
              </div>
              <div className="flex justify-between text-[14px] font-medium text-[#68677E] mt-1">
                <span>취소 일시</span>
                <span>{booking.cancelInfo.canceledAt}</span>
              </div>
            </div>
          </>
        )}

        {/* 안내 박스 */}
        <GuideBox title={booking.guideTitle} items={booking.guideItems} />

        {/* 하단 버튼 */}
        <div className="flex justify-end">
          {isConfirmed && (
            <button
              className="px-12 py-2 rounded-md border text-[16px] font-semibold text-[#23222A] border-[#9E9DAF] hover:bg-gray-50 transition-colors"
              onClick={() => router.push(`/mypage/bookings/${orderId}/cancel`)}
            >
              예매 취소
            </button>
          )}
          {(isWatched || isCanceled) && (
            <button
              className="px-12 py-2 rounded-md border text-[16px] font-semibold text-[#23222A] border-[#9E9DAF] hover:bg-gray-50 transition-colors"
              onClick={() => router.push("/shows")}
            >
              홈으로 가기
            </button>
          )}
        </div>

      </div>
    </div>
  );
}