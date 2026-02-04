type Props = {
  searchParams: { code?: string; message?: string; orderId?: string };
};

export default function Page({ searchParams }: Props) {
  const { code, message, orderId } = searchParams;

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
        <h1 style={{ fontSize: 22, fontWeight: 900 }}>결제 실패</h1>

        <div style={{ marginTop: 16, lineHeight: 1.8 }}>
          <div>
            <b>code</b>: {code ?? '-'}
          </div>
          <div>
            <b>message</b>: {message ?? '-'}
          </div>
          <div>
            <b>orderId</b>: {orderId ?? '-'}
          </div>
        </div>

        <div style={{ marginTop: 18, display: 'flex', gap: 8 }}>
          <a
            href="/payments/checkout"
            style={{
              padding: '10px 12px',
              border: '1px solid #e5e7eb',
              borderRadius: 10,
            }}
          >
            다시 시도하기
          </a>
        </div>
      </div>
    </main>
  );
}
