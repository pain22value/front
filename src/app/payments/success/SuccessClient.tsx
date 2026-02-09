'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { paymentService } from '@/services/paymentService';

type Props = {
  searchParams: { paymentKey?: string; orderId?: string; amount?: string };
};

export default function SuccessClient({ searchParams }: Props) {
  const paymentKey = searchParams.paymentKey ?? '';
  const orderId = searchParams.orderId ?? '';
  const amountStr = searchParams.amount ?? '';

  const amount = useMemo(() => {
    const n = Number(amountStr);
    return Number.isFinite(n) ? n : NaN;
  }, [amountStr]);

  const isValid = Boolean(paymentKey && orderId && Number.isFinite(amount));

  const [confirming, setConfirming] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    if (!isValid || confirmed) return;
    (async () => {
      try {
        setConfirming(true);

        await paymentService.confirm(orderId, {
          paymentKey,
          amount,
        });
        setConfirmed(true);
      } catch (e) {
        console.error(e);
        setErrorMsg(
          e instanceof Error ? e.message : '결제 승인 중 오류가 발생했습니다.'
        );
      } finally {
        setConfirming(false);
      }
    })();
  }, [isValid, confirmed, orderId, paymentKey, amount]);

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

        {isValid ? (
          <div>
            <div style={{ color: '#10b981', fontWeight: 900 }}>
              성공 리다이렉트 확인 완료 ✅
            </div>
            <div style={{ marginTop: 8, color: '#6b7280', fontSize: 13 }}>
              (다음주에 백엔드 confirm 붙이면 여기서 승인 API 호출하면 됩니다)
            </div>
          </div>
        ) : (
          <div>
            <div style={{ color: '#b91c1c', fontWeight: 800 }}>
              잘못된 성공 URL
            </div>
            <div style={{ marginTop: 8, whiteSpace: 'pre-wrap' }}>
              필수 파라미터(paymentKey, orderId, amount)가 누락됐습니다.
            </div>
          </div>
        )}

        <div style={{ marginTop: 18, display: 'flex', gap: 8 }}>
          <Link
            href="/payments/checkout"
            style={{
              padding: '10px 12px',
              border: '1px solid #e5e7eb',
              borderRadius: 10,
            }}
          >
            다시 결제하기
          </Link>

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
    </main>
  );
}
