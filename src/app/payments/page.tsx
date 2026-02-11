'use client';

import { loadTossPayments, ANONYMOUS } from '@tosspayments/tosspayments-sdk';
import { useEffect, useMemo, useState } from 'react';

type Money = {
  currency: 'KRW';
  value: number;
};

type TossPayment = Awaited<
  ReturnType<Awaited<ReturnType<typeof loadTossPayments>>['payment']>
>;

export default function CheckoutPage() {
  // ✅ 실제 서비스에서는 .env로 옮기는 걸 추천 (아래에 예시 적어둘게)
  const clientKey = 'test_ck_D5GePWvyJnrK0W0k6q8gLzN97Eoq';
  const customerKey = 'EkTWyj8AhmS5rtOMSB4Ck';

  const [payment, setPayment] = useState<TossPayment | null>(null);

  const amount: Money = useMemo(
    () => ({
      currency: 'KRW',
      value: 50000,
    }),
    [],
  );

  useEffect(() => {
    let mounted = true;

    async function init() {
      try {
        const tossPayments = await loadTossPayments(clientKey);

        // ✅ 회원 결제
        const p = tossPayments.payment({ customerKey });

        // ✅ 비회원 결제(필요하면 위 줄 대신 이거 사용)
        // const p = tossPayments.payment({ customerKey: ANONYMOUS })

        if (mounted) setPayment(p);
      } catch (e) {
        console.error('TossPayments init error:', e);
      }
    }

    init();
    return () => {
      mounted = false;
    };
  }, [clientKey, customerKey]);

  async function requestPayment() {
    if (!payment) return;

    // ⚠️ 실무에서는 여기서 orderId/amount를 서버에 저장(검증용)하고 진행 권장
    await payment.requestPayment({
      method: 'CARD',
      amount,
      orderId: '6OKk3PsL11vRT9dg6JH2g',
      orderName: '토스 티셔츠 외 2건',
      successUrl: `${window.location.origin}/payments/success`,
      failUrl: `${window.location.origin}/payments/fail`,
      customerEmail: 'customer123@gmail.com',
      customerName: '김토스',
      customerMobilePhone: '01012341234',
      card: {
        useEscrow: false,
        flowMode: 'DEFAULT',
        useCardPoint: false,
        useAppCardOnly: false,
      },
    });
  }

  return (
    <button
      className="button"
      onClick={requestPayment}
      disabled={!payment}
      aria-disabled={!payment}
    >
      {payment ? '결제하기' : '결제 준비중...'}
    </button>
  );
}
