"use client";

import { useTossPayment, type PayMethod } from "@/features/payments/hooks/useTossPayment";
import { paymentService } from "@/features/payments/services/paymentService";
import Link from "next/link";
import { useMemo, useState } from "react";
import { custom } from "zod";

export default function CheckoutPage() {
  // 데모용 가격 계산
  const ticketUnitPrice = 160000;
  const ticketQty = 2;
  const bookingFee = 2000;
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

  //결제 성공시 결제 정보 저장

  const handlePay = async () => {
    if (!isReady || paying) return;
    setPaying(true);

    try {
      const orderId = crypto.randomUUID();

      // TODO: 백엔드 나오면 여기만 교체
      // const res = await paymentService.saveInfo({ orderName, amount: total });
      // const orderId = res.orderId;

      // 결제 요청 전 백엔드에 주문 정보 저장
      await fetch("http://api.truve.site:8080/api/payments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          // //결제수단
          // orderId,
          // amount: total,
          // 예약자정보,
          // customerName: customerInfo.name,
          // customerBirth: customerInfo.birth,
          // customerEmail: customerInfo.email,
          // customerPhone: customerInfo.phone,
          // //수령방법
          // //약관동의여부
          orderId,
          amount: total,
          method: payMethod,
        }),
      });

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
/* payMethod 상태 타입을 PayMethod로 : 박영준
  const [payMethod, setPayMethod] = useState<"CARD" | "EASY" | "TRANSFER">(
    "CARD",
  );
*/
  const [payMethod, setPayMethod] = useState<PayMethod>("CARD");
  const [receipt, setReceipt] = useState<"NONE" | "PERSONAL" | "BIZ">("NONE");

  return (
    <div className="min-h-screen bg-white">
      {/* Top bar */}
      <header className="border-b border-gray-100">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <div className="text-lg font-black tracking-tight">truve</div>
          <div className="text-md text-red-500 font-semibold">결제 취소</div>
        </div>
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <p className="text-md font-bold tracking-tight">
            {"뮤지컬<킹키부츠> -2026.01.26(월) 오후 7:00"}
          </p>
          <div className="text-sm text-gray-500">
            결제 마감 시간{" "}
            <span className="font-semibold text-red-500">00:20</span>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8">
        <Link
          href="/cart"
          className="text-sm font-medium text-gray-500 hover:text-gray-900"
        >
          {"<"} 좌석선택페이지로 돌아가기
        </Link>
        <div className="grid grid-cols-12 gap-8">
          {/* LEFT */}
          <section className="col-span-12 lg:col-span-8">
            <div className="mb-6">
              <div>
                <h1 className="text-2xl font-extrabold">티켓 결제</h1>
                <p className="mt-1 text-sm text-gray-500">
                  주문 정보를 확인하고 결제를 진행해주세요.
                </p>
              </div>
            </div>

            {/* 주문 상품 */}
            <div className="rounded-xl border border-gray-100 bg-white">
              <div className="border-b border-gray-100 px-5 py-4">
                <h2 className="text-sm font-extrabold">티켓 주문 상세</h2>
              </div>

              <div className="space-y-4 px-5 py-5">
                <div className="flex items-end gap-4 justify-between">
                  <div className="flex-1">
                    <div>
                      <div className="text-sm font-semibold text-gray-900">
                        {"뮤지컬 <킹키부츠>"}
                      </div>
                      <div className="mt-1 text-xs text-gray-500">
                        2026.01.26(월) 오후 7:00 · 샤롯데씨어터
                      </div>
                    </div>
                    {/* 추가 내용 시작 */}
                    <div className="mt-4 space-y-3 text-sm text-gray-900">
                      <div className="flex items-center gap-1">
                        <span className="font-semibold">VIP석</span>
                        <span className="text-red-500 font-semibold">2</span>
                      </div>

                      <div>
                        <div className="text-xs font-semibold text-gray-700">
                          좌석 정보
                        </div>

                        <ul className="mt-2 space-y-1 text-sm text-gray-900">
                          <li className="flex items-center gap-2">
                            <span className="h-1.5 w-1.5 rounded-full bg-gray-300" />
                            1층 B구역 16열 6번
                          </li>
                          <li className="flex items-center gap-2">
                            <span className="h-1.5 w-1.5 rounded-full bg-gray-300" />
                            1층 B구역 16열 7번
                          </li>
                        </ul>
                      </div>
                    </div>
                    {/* 추가 내용 끝 */}
                  </div>

                  <div className="text-sm font-bold text-gray-900">
                    {total.toLocaleString()}원
                  </div>
                </div>
              </div>
            </div>

            {/* 예약자 정보 */}
            <div className="mt-6 rounded-xl border border-gray-100 bg-white ">
              <div className="border-b border-gray-100 px-5 py-4">
                <h2 className="text-sm font-extrabold">예약자 정보</h2>
              </div>

              <div className="px-5 py-5">
                <FormRow label="예약자">
                  <input
                    name="name"
                    className={inputCls}
                    onChange={handleChange}
                    placeholder="이름을 입력하세요"
                  />
                </FormRow>
                <FormRow label="생년월일">
                  <input
                    name="birth"
                    className={inputCls}
                    onChange={handleChange}
                    placeholder="ex)19960101"
                  />
                </FormRow>
                <FormRow label="이메일">
                  <input
                    name="email"
                    onChange={handleChange}
                    className={inputCls}
                    placeholder="이름을 입력하세요"
                  />
                </FormRow>
                <FormRow label="휴대폰">
                  <input
                    name="phone"
                    className={inputCls}
                    onChange={handleChange}
                    placeholder="010-0000-0000"
                    inputMode="tel"
                  />
                </FormRow>
                <p className="mt-2 text-xs">
                  티켓 수령 및 본인 확인을 위해 정확한 정보를 입력해주세요.
                </p>
              </div>
            </div>

            {/* 티켓 수령 방법 */}
            <div className="mt-6 rounded-xl border border-gray-100 bg-white">
              <div className="border-b border-gray-100 px-5 py-4">
                <h2 className="text-sm font-extrabold">티켓 수령 방법</h2>
              </div>
              <div className="px-5 py-5">
                <div className="rounded-md border border-gray-200 px-3 text-sm font-semibold">
                  <RadioRow
                    name="ticket"
                    value="ticket"
                    checked={receipt === "NONE"}
                    onChange={() => setReceipt("NONE")}
                    title="현장수령"
                  />
                </div>
                <p className="mt-2 text-xs text-red-500">
                  예매 시 부여된 예약번호 또는 QR로 관람 당일 티켓을 수령해
                  입장합니다.
                </p>
              </div>
            </div>

            {/* 결제 수단 */}
            <div className="mt-6 rounded-xl border border-gray-100 bg-white">
              <div className="border-b border-gray-100 px-5 py-4">
                <h2 className="text-sm font-extrabold">결제 수단</h2>
              </div>

              <div className="px-5 py-5">
                <RadioRow
                  name="pay"
                  value="CARD"
                  checked={payMethod === "CARD"}
                  onChange={() => setPayMethod("CARD")}
                  title="간편 결제·카드 결제"
                />
                <RadioRow
                  name="pay"
                  value="VIRTUAL_ACCOUNT"
                  checked={payMethod === "VIRTUAL_ACCOUNT"}
                  onChange={() => setPayMethod("VIRTUAL_ACCOUNT")}
                  title="무통장 입금"
                />
              </div>
            </div>

            {/* 약관 동의 */}
            <div className="mt-6 rounded-xl border border-gray-100 bg-white">
              <div className="border-b border-gray-100 px-5 py-4">
                <h2 className="text-sm font-extrabold">약관 동의</h2>
              </div>

              <div className="px-5 py-5">
                <div className="flex items-center gap-3">
                  <input
                    id="agreeAll"
                    type="checkbox"
                    className="mt-1 h-4 w-4 rounded-full"
                  />
                  <label htmlFor="agreeAll" className="text-sm text-gray-800">
                    이용약관 전체 동의
                  </label>
                </div>
                <div className="flex items-center gap-3 my-3">
                  <input
                    id="agreeAll"
                    type="checkbox"
                    className="mt-1 h-4 w-4 rounded-full"
                  />
                  <label htmlFor="agreeAll" className="text-sm text-gray-500">
                    (필수) 취소 규정 안내
                  </label>
                </div>
                <div className="flex items-center gap-3">
                  <input
                    id="agreeAll"
                    type="checkbox"
                    className="mt-1 h-4 w-4 rounded-full"
                  />
                  <label htmlFor="agreeAll" className="text-sm text-gray-500">
                    (필수) 티켓 이용정책 동의
                  </label>
                </div>
                <div className="mt-4 text-xs text-gray-500">
                  개인정보 제 3자 제공 안내
                </div>
              </div>
            </div>
          </section>

          {/* RIGHT */}
          <aside className="col-span-12 lg:col-span-4">
            <div className="lg:sticky lg:top-6">
              <div className="rounded-xl border border-gray-100 bg-white p-5">
                <h3 className="text-sm font-extrabold">결제 정보</h3>

                <div className="mt-4 space-y-3 text-sm">
                  {/* 티켓금액: 수량만큼 한 장씩 표시 */}
                  <div className="flex items-start justify-between">
                    <div className="text-gray-500">티켓금액</div>
                    <div className="text-right font-semibold text-gray-900">
                      {Array.from({ length: ticketQty }).map((_, idx) => (
                        <div key={idx} className="mb-3">
                          {ticketUnitPrice.toLocaleString()}원
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 예매 수수료 */}
                  <Line
                    label="예매 수수료"
                    value={`+${bookingFee.toLocaleString()}원`}
                  />
                </div>

                <div className="my-4 h-px bg-gray-100" />

                <div className="flex items-center justify-between">
                  <div className="text-sm font-semibold text-gray-700">
                    최종 결제금액
                  </div>
                  <div className="text-lg font-extrabold text-red-500">
                    {total.toLocaleString()}원
                  </div>
                </div>

                <button
                  type="button"
                  className="mt-4 w-full rounded-md bg-red-500 px-4 py-3 text-sm font-extrabold text-white hover:bg-red-600 active:scale-[0.99]"
                  onClick={handlePay}
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

function FormRow({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid grid-cols-12 gap-3 py-3">
      <div className="col-span-12 text-sm font-semibold text-gray-800 sm:col-span-3 sm:pt-2">
        {label}
      </div>
      <div className="col-span-12 sm:col-span-9">{children}</div>
    </div>
  );
}

function RadioRow({
  name,
  value,
  checked,
  onChange,
  title,
  desc,
}: {
  name: string;
  value: string;
  checked: boolean;
  onChange: () => void;
  title: string;
  desc?: string;
}) {
  return (
    <label className="flex cursor-pointer items-start gap-3 py-4">
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        className="mt-1 h-4 w-4"
      />
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
      <div className="text-gray-500">{label}</div>
      <div className="font-semibold text-gray-900">{value}</div>
    </div>
  );
}

const inputCls =
  "w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm outline-none placeholder:text-gray-400 focus:border-gray-400";
