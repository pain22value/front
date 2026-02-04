'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import axios from 'axios';
import {
  loadPaymentWidget,
  type PaymentWidgetInstance,
} from '@tosspayments/payment-widget-sdk';

type CreatePaymentResponse = {
  orderId: string;
  orderName: string;
  amount: number;
  status?: 'PENDING' | 'CONFIRMED' | 'FAILED' | 'CANCELED';
};

export default function CheckoutClient() {
  const clientKey = process.env.NEXT_PUBLIC_TOSS_CLIENT_KEY;
  if (!clientKey) {
    throw new Error(
      'NEXT_PUBLIC_TOSS_CLIENT_KEY가 없습니다. (.env.local 확인)'
    );
  }

  // ✅ 주문 정보(임시: 실제로는 장바구니/상품에서 계산)
  const amount = 1000;
  const orderName = '테스트 결제';

  // ✅ 로그인 붙기 전: 임시 customerKey (로그인 후 userId로 대체 권장)
  const customerKey = useMemo(() => {
    const saved = localStorage.getItem('customerKey');
    if (saved) return saved;
    const newKey = crypto.randomUUID();
    localStorage.setItem('customerKey', newKey);
    return newKey;
  }, []);

  const widgetRef = useRef<PaymentWidgetInstance | null>(null);
  const mountedRef = useRef(false);

  const [ready, setReady] = useState(false);
  const [creatingOrder, setCreatingOrder] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // ✅ 위젯 렌더
  useEffect(() => {
    // React dev StrictMode에서 effect 2번 실행 방지
    if (mountedRef.current) return;
    mountedRef.current = true;

    let alive = true;

    // 혹시 남아있을 수 있는 이전 렌더 제거
    const pm = document.querySelector('#payment-method');
    const ag = document.querySelector('#agreement');
    if (pm) pm.innerHTML = '';
    if (ag) ag.innerHTML = '';

    (async () => {
      const widget = await loadPaymentWidget(clientKey, customerKey);
      if (!alive) return;

      widgetRef.current = widget;

      const pmWidget = widget.renderPaymentMethods(
        '#payment-method',
        { value: amount },
        { variantKey: 'DEFAULT' }
      );

      widget.renderAgreement('#agreement', { variantKey: 'DEFAULT' });

      pmWidget.on('ready', () => {
        if (!alive) return;
        setReady(true);
      });
    })().catch((e) => {
      console.error(e);
      setErrorMsg(
        '결제위젯 로딩 실패! (키/네트워크/차단 문제)\n콘솔(Network/Console) 확인'
      );
    });

    return () => {
      alive = false;
      widgetRef.current = null;
      setReady(false);
    };
  }, [clientKey, customerKey, amount]);

  // ✅ 결제 버튼 클릭: 주문 생성 API → requestPayment
  const onPay = async () => {
    try {
      setErrorMsg(null);

      const widget = widgetRef.current;
      if (!widget || !ready) return;

      setCreatingOrder(true);

      // 1) 주문 생성(결제 정보 저장) API 호출
      //    - 서버가 orderId 발급 + DB에 PENDING 저장한다고 가정
      const createRes = await axios.post<CreatePaymentResponse>(
        '/api/payments',
        {
          orderName,
          amount,
        }
      );

      const { orderId } = createRes.data;
      if (!orderId) throw new Error('orderId가 응답에 없습니다.');

      // 2) 토스 결제 요청 (성공/실패는 리다이렉트로 넘어감)
      const origin = window.location.origin;

      await widget.requestPayment({
        orderId,
        orderName,
        successUrl: `${origin}/payments/success`,
        failUrl: `${origin}/payments/fail`,
      });
    } catch (e: unknown) {
      console.error(e);

      let message = '결제 요청 중 오류가 발생했습니다.';

      if (axios.isAxiosError(e)) {
        message =
          (e.response?.data as { message?: string } | undefined)?.message ??
          e.message ??
          message;
      } else if (e instanceof Error) {
        message = e.message || message;
      }

      setErrorMsg(message);
    } finally {
      setCreatingOrder(false);
    }
  };

  return (
    <main className="mx-auto my-12 max-w-[560px] p-4">
      <div className="rounded-[14px] border border-gray-200 bg-white p-5 shadow-md">
        <div className="flex justify-between">
          <div>
            <div className="text-sm text-gray-500">결제 금액</div>
            <div className="mt-1 text-2xl font-extrabold">
              {amount.toLocaleString()}원
            </div>
          </div>
          <div className="text-right text-xs text-gray-400">
            <div>결제 준비</div>
            <div className="mt-1">
              {ready ? '위젯 준비 완료' : '위젯 로딩중...'}
            </div>
          </div>
        </div>

        <hr className="my-5 border-t border-gray-100" />

        <h2 className="mb-3 text-lg font-extrabold">결제 방법</h2>

        {errorMsg ? (
          <pre className="whitespace-pre-wrap text-sm text-red-700">
            {errorMsg}
          </pre>
        ) : (
          <>
            <div id="payment-method" />
            <div id="agreement" className="mt-3" />

            <button
              onClick={onPay}
              disabled={!ready || creatingOrder}
              className={`mt-4 w-full rounded-[10px] border border-transparent px-4 py-3.5 text-base font-extrabold text-white transition-colors ${
                !ready || creatingOrder
                  ? 'cursor-not-allowed bg-blue-300'
                  : 'cursor-pointer bg-blue-600 hover:bg-blue-700'
              }`}
            >
              {creatingOrder
                ? '주문 생성 중...'
                : ready
                ? '결제하기'
                : '위젯 로딩중...'}
            </button>
          </>
        )}
      </div>
    </main>
  );
}
