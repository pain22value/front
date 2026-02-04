'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';

type Props = {
  searchParams: { paymentKey?: string; orderId?: string; amount?: string };
};

type ConfirmResponse = {
  orderId: string;
  status: 'CONFIRMED' | 'FAILED';
  approvedAt?: string;
  method?: string;
  totalAmount?: number;
  code?: string;
  message?: string;
};

export default function SuccessClient({ searchParams }: Props) {
  const paymentKey = searchParams.paymentKey ?? '';
  const orderId = searchParams.orderId ?? '';
  const amountStr = searchParams.amount ?? '';

  const amount = useMemo(() => {
    const n = Number(amountStr);
    return Number.isFinite(n) ? n : NaN;
  }, [amountStr]);

  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState<ConfirmResponse | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    // 1) 쿼리 파라미터 기본 검증
    if (!paymentKey || !orderId || !Number.isFinite(amount)) {
      setLoading(false);
      setErrorMsg('잘못된 결제 성공 URL입니다. (필수 파라미터 누락)');
      return;
    }

    // 2) confirm 호출
    (async () => {
      try {
        setLoading(true);
        setErrorMsg(null);

        const res = await axios.post<ConfirmResponse>(
          `/api/payments/${encodeURIComponent(orderId)}/confirm`,
          { paymentKey, amount }
        );

        setResult(res.data);

        // 서버가 실패를 200으로 내려주는 경우도 대비
        if (res.data.status === 'FAILED') {
          setErrorMsg(res.data.message ?? '결제 승인이 실패했습니다.');
        }
      } catch (e: unknown) {
        console.error(e);

        let message = '결제 승인 요청 중 오류가 발생했습니다.';

        if (axios.isAxiosError(e)) {
          const data = e.response?.data as
            | { message?: string; error?: string }
            | undefined;
          message = data?.message ?? data?.error ?? e.message ?? message;
        } else if (e instanceof Error) {
          message = e.message || message;
        }

        setErrorMsg(message);
      } finally {
        setLoading(false);
      }
    })();
  }, [paymentKey, orderId, amount]);

  return (
    <main style={{ maxWidth: 560, margin: '48px auto', padding: 16 }}>
      <div
        style={{
          border: '1px solid #e5e7eb',
          borderRadius: 14,
          padding: 20,
          background: '#fff',
        }}
      >
        <h1 style={{ fontSize: 22, fontWeight: 900 }}>결제 성공</h1>

        <div style={{ marginTop: 12, fontSize: 13, color: '#6b7280' }}>
          <div>paymentKey: {paymentKey || '-'}</div>
          <div>orderId: {orderId || '-'}</div>
          <div>amount: {amountStr || '-'}</div>
        </div>

        <hr style={{ margin: '18px 0', borderColor: '#f3f4f6' }} />

        {loading ? (
          <div style={{ fontWeight: 700 }}>승인 처리 중...</div>
        ) : errorMsg ? (
          <div>
            <div style={{ color: '#b91c1c', fontWeight: 800 }}>
              승인 실패/오류
            </div>
            <div style={{ marginTop: 8, whiteSpace: 'pre-wrap' }}>
              {errorMsg}
            </div>

            <div style={{ marginTop: 18, display: 'flex', gap: 8 }}>
              <Link
                href="/payments/checkout"
                style={{
                  padding: '10px 12px',
                  border: '1px solid #e5e7eb',
                  borderRadius: 10,
                }}
              >
                다시 시도하기
              </Link>
            </div>
          </div>
        ) : (
          <div>
            <div style={{ color: '#10b981', fontWeight: 900 }}>
              결제 승인 완료 ✅
            </div>

            <div style={{ marginTop: 10, lineHeight: 1.8 }}>
              <div>status: {result?.status}</div>
              <div>method: {result?.method ?? '-'}</div>
              <div>approvedAt: {result?.approvedAt ?? '-'}</div>
              <div>totalAmount: {result?.totalAmount ?? '-'}</div>
            </div>

            <div style={{ marginTop: 18, display: 'flex', gap: 8 }}>
              <Link
                href="/"
                style={{
                  padding: '10px 12px',
                  border: '1px solid #e5e7eb',
                  borderRadius: 10,
                }}
              >
                홈으로
              </Link>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
