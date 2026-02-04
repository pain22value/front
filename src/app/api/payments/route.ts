import { NextResponse } from 'next/server';

type CreatePaymentBody = {
  orderName?: string;
  amount?: number;
};

export async function POST(req: Request) {
  const body = (await req.json().catch(() => ({}))) as CreatePaymentBody;

  const amount = body.amount;
  const orderName = body.orderName ?? '주문';

  if (typeof amount !== 'number' || !Number.isFinite(amount) || amount <= 0) {
    return NextResponse.json(
      { message: 'amount가 올바르지 않습니다.' },
      { status: 400 }
    );
  }

  // 실제 서비스라면 여기서 DB에 주문(PENDING) 저장 후 orderId 발급
  const orderId = `ORDER-${Date.now()}-${Math.random()
    .toString(36)
    .slice(2, 8)}`;

  return NextResponse.json(
    {
      orderId,
      orderName,
      amount,
      status: 'PENDING' as const,
    },
    { status: 200 }
  );
}
