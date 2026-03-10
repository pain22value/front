"use client";

import { useTossPayment, type PayMethod } from "@/features/payments/hooks/useTossPayment";
import { paymentService } from "@/features/payments/services/paymentService";
import Link from "next/link";
import { useMemo, useState } from "react";

export default function CheckoutPage() {
  // 데모용 가격 계산
  const ticketUnitPrice = 160000;
  const ticketQty = 2;
  const bookingFee = 4000; // 2000 → 4000으로 수정 (피그마 기준)
  const total = ticketUnitPrice * ticketQty + bookingFee;

  const clientKey = "test_ck_jExPeJWYVQxDje9xG7Mj349R5gvN";
  const customerKey = "EkTWyj8AhmS5rtOMSB4Ck";

  const orderName = `뮤지컬 <킹키부츠> VIP석 ${ticketQty}매`;

  const [paying, setPaying] = useState(false);

  const [customerInfo, setCustomerInfo] = useState({
    name: "미기입",
    birth: "미기입",
    email: "미기입",
    phone: "미기입",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCustomerInfo((prev) => {
      const updated = { ...prev, [name]: value };
      return updated;
    });
  };

  const { isReady, requestPayment } = useTossPayment({
    clientKey,
    customerKey,
    successPath: "/payments/success",
    failPath: "/payments/fail",
    customerEmail: customerInfo.email,
    customerName: customerInfo.name,
    customerMobilePhone: customerInfo.phone,
  });

  const handlePay = async () => {
    if (!isReady || paying) return;
    setPaying(true);

    try {
      const orderId = crypto.randomUUID();

      // TODO: 백엔드 나오면 여기만 교체
      // const res = await paymentService.saveInfo({ orderName, amount: total });
      // const orderId = res.orderId;

      await fetch("http://api.truve.site:8080/api/payments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderId,
          amount: total,
          method: payMethod,
        }),
      });

      // 임시 데이터
      sessionStorage.setItem("pendingBooking", JSON.stringify({
        showTitle: "뮤지컬 <킹키부츠>",
        datetime: "2026.01.26(월) 오후 7:00",
        seats: ["1층 B구역 16열 6번", "1층 B구역 16열 7번"],
        method: payMethod,
      }));

      await requestPayment({
        orderId,
        orderName,
        amountValue: total,
        method: payMethod,
      });
    } finally {
      setPaying(false);
    }
  };

  const [payMethod, setPayMethod] = useState<PayMethod>("CARD");
  const [receipt, setReceipt] = useState<"NONE" | "PERSONAL" | "BIZ" | null>(null);
  const [agreeAll, setAgreeAll] = useState(false);
  const [agrees, setAgrees] = useState([false, false, false]);

  const handleAgreeAll = () => {
    const next = !agreeAll;
    setAgreeAll(next);
    setAgrees([next, next, next]);
  };

  const handleAgree = (idx: number) => {
    const next = [...agrees];
    next[idx] = !next[idx];
    setAgrees(next);
    setAgreeAll(next.every(Boolean));
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Top bar */}
      <header className="border-b border-gray-100">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <div className="text-[28px] font-righteous text-[#23222A]">truve</div>
          <div className="text-[18px] text-[#CB0614] font-semibold">예매 취소</div>
        </div>
        {/* 서브헤더: 공연 정보 + 결제 가능 시간 */}
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 border-t border-b border-gray-100">
          <p className="text-[16px] font-bold text-[#23222A]">{"뮤지컬<킹키부츠> -2026.01.26(월) 오후 7:00"}</p>
          <div className="text-[16px] font-bold text-[#23222A]">
            {/* "결제 마감 시간" → "결제 가능 시간" (피그마 기준) */}
            결제 가능 시간 <span className="text-[16px] font-bold text-[#F93E4B]">07:00</span>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8">
        <Link href="/shows/1" className="flex items-center gap-1 px-6 mb-8">
          <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14.9715 1.68725C15.0617 1.59178 15.1322 1.47947 15.179 1.35674C15.2259 1.23401 15.248 1.10327 15.2443 0.971965C15.2406 0.840663 15.2111 0.711378 15.1574 0.591492C15.1037 0.471606 15.027 0.363467 14.9315 0.273249C14.836 0.183031 14.7237 0.112501 14.601 0.0656852C14.4782 0.0188697 14.3475 -0.00331434 14.2162 0.000400002C14.0849 0.00411435 13.9556 0.0336542 13.8357 0.0873329C13.7158 0.141012 13.6077 0.217778 13.5175 0.313249L5.01748 9.31325C4.84195 9.49892 4.74414 9.74474 4.74414 10.0002C4.74414 10.2558 4.84195 10.5016 5.01748 10.6872L13.5175 19.6882C13.6071 19.7858 13.7152 19.8646 13.8355 19.92C13.9559 19.9754 14.086 20.0064 14.2184 20.0111C14.3508 20.0158 14.4828 19.9942 14.6068 19.9474C14.7307 19.9007 14.8442 19.8298 14.9405 19.7388C15.0368 19.6479 15.1141 19.5387 15.1679 19.4176C15.2216 19.2965 15.2508 19.166 15.2537 19.0335C15.2566 18.9011 15.2331 18.7694 15.1847 18.6461C15.1362 18.5228 15.0638 18.4103 14.9715 18.3153L7.11948 10.0002L14.9715 1.68725Z" fill="#68677E"/>
          </svg>
          <span className="text-[18px] font-bold text-[#23222A]">티켓 결제</span>
        </Link>

        <div className="grid grid-cols-12 gap-8">
          {/* LEFT */}
          <section className="col-span-12 lg:col-span-8">
            {/* 티켓 주문 상세 */}
            <div className="mb-4">
              <h1 className="text-[16px] font-bold text-[#23222A] px-5">티켓 주문 상세</h1>
            </div>

            <div className="bg-white px-5 py-5">
              {/* 공연 제목 + 일시 */}
              <div className="text-[16px] font-semibold text-[#23222A]">{"뮤지컬 <킹키부츠>"}</div>
              <div className="text-[16px] font-regular text-[#68677E]">2026.01.26(월) 오후 7:00 · 샤롯데씨어터</div>

              {/* 좌석 등급 + 수량 */}
              <div className="mt-8 flex items-center gap-1 text-sm">
                <span className="text-[16px] font-bold text-[#23222A]">VIP석</span>
                <span className="text-[16px] font-bold text-[#F93E4B]">{ticketQty}</span>
              </div>

              {/* 좌석 정보 */}
              <div className="mt-4 flex gap-4">
                <div className="text-[14px] font-medium text-[#68677E] w-16 shrink-0">좌석 정보</div>
                <ul className="text-[14px] font-medium text-[#23222A]">
                  <li>1층 B구역 16열 6번</li>
                  <li>1층 B구역 16열 7번</li>
                </ul>
              </div>

              {/* 가격 정보 */}
              <div className="mt-2 flex gap-4 text-sm">
                <span className="text-[14px] font-medium text-[#68677E] w-16 shrink-0">가격 정보</span>
                <span className="text-[14px] font-medium text-[#23222A]">
                  {ticketUnitPrice.toLocaleString()}원 X {ticketQty}매
                </span>
              </div>
            </div>

            <div className="mt-4 h-px bg-[#F1F1F4]" />

            {/* 예약자 정보 */}
            <div className="mt-6">
              <div className="px-5 py-4 flex items-start gap-1">
                {/* 필수 표시 * 추가 (피그마 기준) */}
                <h2 className="text-[16px] font-bold text-[#23222A]">예약자 정보</h2>
                <svg width="4" height="4" viewBox="0 0 4 4" fill="none" xmlns="http://www.w3.org/2000/svg" className="mt-0.5">
                  <circle cx="2" cy="2" r="2" fill="#F93E4B"/>
                </svg>
              </div>
              <div className="px-5">
                <FormRow label="예약자">
                  <input
                    name="name"
                    className={inputCls}
                    onChange={handleChange}
                    placeholder="홍길동" // 피그마 기준 placeholder
                  />
                </FormRow>
                <FormRow label="생년월일">
                  <input
                    name="birth"
                    className={inputCls}
                    onChange={handleChange}
                    placeholder="20XX-XX-XX" // 피그마 기준 placeholder
                  />
                </FormRow>
                <FormRow label="이메일">
                  <input
                    name="email"
                    onChange={handleChange}
                    className={inputCls}
                    placeholder="XXXX@naver.com" // 피그마 기준 placeholder
                  />
                </FormRow>
                <FormRow label="휴대폰">
                  <input
                    name="phone"
                    className={inputCls}
                    onChange={handleChange}
                    placeholder="010-1234-5678" // 피그마 기준 placeholder
                    inputMode="tel"
                  />
                </FormRow>
                <p className="mt-4 text-[14px] font-medium text-[#68677E]">
                  티켓 수령 및 본인 확인을 위해 정확한 정보를 입력해주세요.
                </p>
              </div>
            </div>

            {/* 티켓 수령 방법 */}
            <div className="mt-6">
              <div className="px-5 py-4 flex items-start gap-1">
                {/* 필수 표시 * 추가 (피그마 기준) */}
                <h2 className="text-[16px] font-bold text-[#23222A]">티켓 수령 방법</h2>
                <svg width="4" height="4" viewBox="0 0 4 4" fill="none" xmlns="http://www.w3.org/2000/svg" className="mt-0.5">
                  <circle cx="2" cy="2" r="2" fill="#F93E4B"/>
                </svg>
              </div>
              <div className="px-5">
                <div
                  className={`rounded-sm px-4 inline-block min-w-[120px] border transition-colors cursor-pointer ${
                    receipt === "NONE"
                      ? "border-[#F11322] bg-[#FFE6E8]"
                      : "border-[#B9B9C6] bg-white hover:border-[#F11322] hover:bg-[#FFF5F6]"
                  }`}
                >
                  <RadioRow
                    name="ticket"
                    value="ticket"
                    checked={receipt === "NONE"}
                    onChange={() => setReceipt("NONE")}
                    title="현장수령"
                  />
                </div>
              </div>
            </div>

            {/* 결제 수단 */}
            <div className="mt-6">
              <div className="border-b border-gray-100 px-5 py-4">
                <h2 className="text-[16px] font-bold">결제 수단</h2>
              </div>
              <div className="py-2">
                <PayMethodRow
                  value="CARD"
                  checked={payMethod === "CARD"}
                  onChange={() => setPayMethod("CARD")}
                  title="간편 결제·카드 결제"
                />
                <PayMethodRow
                  value="VIRTUAL_ACCOUNT"
                  checked={payMethod === "VIRTUAL_ACCOUNT"}
                  onChange={() => setPayMethod("VIRTUAL_ACCOUNT")}
                  title="무통장 입금"
                />
              </div>
            </div>

            {/* 약관 동의 */}
            <div className="mt-6">
              <div className="border-b border-gray-100 px-5 py-4">
                <h2 className="text-[16px] font-bold text-[#23222A]">약관 동의</h2>
              </div>
              <div>
                {/* 전체 동의 - PayMethodRow 동일 스타일 */}
                <PayMethodRow
                  value="ALL"
                  checked={agreeAll}
                  onChange={handleAgreeAll}
                  title="이용약관 전체 동의"
                />
                <AgreeRow label="(필수) 취소 규정 안내" checked={agrees[0]} onChange={() => handleAgree(0)} />
                <AgreeRow label="(필수) 티켓 이용정책 동의" checked={agrees[1]} onChange={() => handleAgree(1)} />
                <AgreeRow label="개인정보 제 3자 제공 안내" checked={agrees[2]} onChange={() => handleAgree(2)} />
              </div>
            </div>
          </section>

          {/* RIGHT: 결제 정보 */}
          <aside className="col-span-12 lg:col-span-4">
            <div className="lg:sticky lg:top-6">
              <div className="rounded-xl border border-[#DDDDE4] bg-white p-5">
                <h3 className="text-[16px] font-bold text-[#23222A]">결제 정보</h3>

                <div className="mt-4 space-y-3 text-sm">
                  {/* 티켓금액: 수량만큼 한 장씩 표시 */}
                  <div className="flex items-start justify-between">
                    <div className="text-[16px] font-medium text-[#68677E] shrink-0">티켓금액</div>
                    <div className="text-right font-semibold text-gray-900">
                      {Array.from({ length: ticketQty }).map((_, idx) => (
                        <div key={idx} className="mb-1">
                          {ticketUnitPrice.toLocaleString()}원
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 예매 수수료 */}
                  <Line label="예매 수수료" value={`+${bookingFee.toLocaleString()}원`} />
                </div>

                <div className="my-4 h-px bg-gray-100" />

                <div className="flex items-center justify-between">
                  <div className="text-[16px] font-bold text-[#68677E]">최종 결제금액</div>
                  <div className="text-[16px] font-bold text-[#F11322]">{total.toLocaleString()}원</div>
                </div>

                <button
                  type="button"
                  className="mt-4 w-full rounded-md bg-[#F93E4B] px-4 py-3 text-[16px] font-semibold text-[#FFFFFF] hover:bg-red-600 active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={handlePay}
                  disabled={!isReady || paying}
                >
                  총 {total.toLocaleString()}원 결제하기
                </button>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}

/** ---------- UI helpers ---------- */

function FormRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 py-1">
      <div className="text-[14px] font-medium text-[#68677E] w-16 shrink-0">{label}</div>
      <div className="flex-1">{children}</div>
    </div>
  );
}

function RadioRow({ name, value, checked, onChange, title, desc }: {
  name: string;
  value: string;
  checked: boolean;
  onChange: () => void;
  title: string;
  desc?: string;
}) {
  return (
    <label className="flex cursor-pointer items-center gap-3 py-4 group">
      {/* 커스텀 라디오 */}
        <div
          className={`h-5 w-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
            checked
              ? "border-[#CB0614] bg-[#CB0614]"
              : "border-[#B9B9C6] bg-white group-hover:border-[#FDB5BA] group-hover:bg-[#FFF5F6]"
          }`}
        >
        {checked && <div className="h-2 w-2 rounded-full bg-white" />}
      </div>
      <input type="radio" name={name} value={value} checked={checked} onChange={onChange} className="hidden" />
      <div>
        <div className="text-sm font-semibold text-gray-900">{title}</div>
        {desc && <div className="text-xs text-gray-500">{desc}</div>}
      </div>
    </label>
  );
}

function Line({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <div className="text-[16px] font-medium text-[#68677E] shrink-0">{label}</div>
      <div className="font-semibold text-gray-900">{value}</div>
    </div>
  );
}

const inputCls =
  "w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm outline-none placeholder:text-gray-400 focus:border-[#F11322]";

  function PayMethodRow({
  value,
  checked,
  onChange,
  title,
  desc,
}: {
  value: string;
  checked: boolean;
  onChange: () => void;
  title: string;
  desc?: string;
}) {
  return (
    <label
      className={`flex cursor-pointer items-center gap-3 px-5 py-3 transition-colors group ${
        checked ? "bg-[#FFE6E8]" : "bg-white hover:bg-[#FFF5F6]"
      }`}
    >
      <div
        className={`h-5 w-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
          checked
            ? "border-[#CB0614] bg-[#CB0614]"
            : "border-[#B9B9C6] bg-white group-hover:border-[#FDB5BA] group-hover:bg-[#FFF5F6]"
        }`}
      >
        {checked && <div className="h-2 w-2 rounded-full bg-white" />}
      </div>
      <input type="radio" name="pay" value={value} checked={checked} onChange={onChange} className="hidden" />
      <div>
        <div className="text-[14px] font-bold text-[#23222A]">{title}</div>
        {desc && <div className="text-xs text-gray-500">{desc}</div>}
      </div>
    </label>
  );
}

function AgreeRow({ label, checked, onChange }: { label: string; checked: boolean; onChange: () => void }) {
  return (
    <div
      className="flex items-center justify-between px-5 py-2 cursor-pointer hover:bg-[#FFF5F6] transition-colors"
      onClick={onChange}
    >
      <div className="flex items-center gap-3">
        <span className={`text-sm font-bold ${checked ? "text-[#F11322]" : "text-[#B9B9C6]"}`}>✓</span>
        <span className="text-[14px] font-medium text-[#9E9DAF]">{label}</span>
      </div>
      <span className="text-gray-400 text-sm">{">"}</span>
    </div>
  );
}