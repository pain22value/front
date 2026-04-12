"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import ArtistProfile from "../ArtistProfile";
import { Button } from "@/components/ui/button";
import { useTossPayment, PayMethod } from "@/features/payments/hooks/useTossPayment";

export default function MembershipPaymentStep({
  onPrev,
  onNext,
  artist,
}: {
  onPrev?: () => void;
  onNext?: () => void;
  artist: Artist;
}) {
  const [method, setMethod] = useState<PayMethod>("CARD");

  const { isReady, requestPayment } = useTossPayment({
    clientKey: "test_ck_jExPeJWYVQxDje9xG7Mj349R5gvN",
    customerKey: `customer_${artist.artistId}`,
    successPath: `/artists/${artist.artistId}/membership?success=true`,
    failPath: `/artists/${artist.artistId}/membership?fail=true`,
  });

  const handlePayment = async () => {
    if (!isReady) return;
    try {
      await requestPayment({
        amountValue: 5000,
        orderId: `order_${new Date().getTime()}_${artist.artistId}`,
        orderName: `${artist.artistName} 월간 멤버십`,
        method,
      });
      if (onNext) onNext();
    } catch (error) {
      console.error("Payment Error:", error);
    }
  };

  return (
    <div className="p-8 font-sans antialiased text-slate-900">
      <ArtistProfile artist={artist} />
      {/* 3. 결제 상세 정보 섹션 */}
      <Card className="shadow-none">
        <CardContent>
          <div className="flex items-center gap-2 mb-6 border-b pb-4">
            <span className="text-xl">💳</span>
            <h3 className="text-lg font-bold">결제 정보 입력</h3>
          </div>
          <PaymentAmountCard amount={5000} />
          <PaymentMethodSelector selectedMethod={method} onChange={setMethod} />
          <PaymentNotice />
          <PaymentActionButtons onPrev={onPrev} onNext={handlePayment} isReady={isReady} />
        </CardContent>
      </Card>
    </div>
  );
}

// 독립된 서브 컴포넌트들
function PaymentAmountCard({ amount }: { amount: number }) {
  return (
    <div className="bg-rose-50 rounded-xl p-6 mb-8 flex justify-between items-center border border-rose-100">
      <div>
        <h4 className="font-bold text-slate-800 text-lg">월간 멤버십</h4>
        <p className="text-rose-400 text-sm font-medium mt-1">매월 자동 결제됩니다</p>
      </div>
      <div className="flex items-baseline">
        <span className="text-3xl font-black text-rose-500">{amount.toLocaleString()}</span>
        <span className="text-rose-500 font-bold ml-1">원</span>
        <span className="text-slate-400 text-sm ml-1">/월</span>
      </div>
    </div>
  );
}

function PaymentMethodSelector({
  selectedMethod,
  onChange,
}: {
  selectedMethod: PayMethod;
  onChange: (method: PayMethod) => void;
}) {
  return (
    <div className="mb-8 text-left">
      <h4 className="font-bold text-slate-800 mb-4">결제 수단</h4>
      <div className="space-y-3">
        <label
          className={`flex items-start gap-4 p-5 border-2 rounded-xl cursor-pointer transition-all ${
            selectedMethod === "CARD"
              ? "border-rose-500 bg-rose-50/50"
              : "border-slate-100 bg-slate-50/30 hover:border-slate-200"
          }`}
        >
          <input
            type="radio"
            name="payment"
            checked={selectedMethod === "CARD"}
            onChange={() => onChange("CARD")}
            className="mt-1 w-5 h-5 accent-rose-500"
          />
          <div className="flex-1">
            <p className="font-bold text-slate-800">간편 결제 · 카드 결제</p>
            <p className="text-slate-400 text-sm mt-0.5 font-medium">신용/체크카드 및 간편결제(토스, 카카오 등)</p>
          </div>
        </label>

        <label
          className={`flex items-start gap-4 p-5 border-2 rounded-xl cursor-pointer transition-all ${
            selectedMethod === "VIRTUAL_ACCOUNT"
              ? "border-rose-500 bg-rose-50/50"
              : "border-slate-100 bg-slate-50/30 hover:border-slate-200"
          }`}
        >
          <input
            type="radio"
            name="payment"
            checked={selectedMethod === "VIRTUAL_ACCOUNT"}
            onChange={() => onChange("VIRTUAL_ACCOUNT")}
            className="mt-1 w-5 h-5 accent-rose-500"
          />
          <div className="flex-1">
            <p className="font-bold text-slate-800">가상계좌</p>
            <p className="text-slate-400 text-sm mt-0.5 font-medium">무통장 입금</p>
          </div>
        </label>
      </div>
    </div>
  );
}

function PaymentNotice() {
  return (
    <div className="bg-slate-50 border border-slate-100 rounded-xl p-6 mb-10">
      <ul className="text-slate-500 text-sm space-y-2.5 list-none">
        <li className="flex gap-2">
          <span className="text-slate-300">•</span>첫 결제 후 매월 같은 날짜에 자동 결제됩니다.
        </li>
        <li className="flex gap-2">
          <span className="text-slate-300">•</span>
          멤버십은 마이페이지에서 언제든 해지할 수 있습니다.
        </li>
        <li className="flex gap-2">
          <span className="text-slate-300">•</span>
          결제 정보는 암호화되어 안전하게 저장됩니다.
        </li>
      </ul>
    </div>
  );
}

function PaymentActionButtons({
  onPrev,
  onNext,
  isReady,
}: {
  onPrev?: () => void;
  onNext?: () => void;
  isReady?: boolean;
}) {
  return (
    <div className="flex gap-4">
      <Button
        onClick={onPrev}
        className="flex-1 h-full py-4 font-bold text-slate-600 hover:bg-slate-100 transition-colors"
        variant="outline"
      >
        이전
      </Button>
      <Button
        onClick={onNext}
        disabled={!isReady}
        className="flex-2 w-full h-full py-4 font-bold bg-rose-500 text-white hover:bg-rose-600 transition-all"
      >
        멤버십 결제하기
      </Button>
    </div>
  );
}
