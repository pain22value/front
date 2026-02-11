import Link from 'next/link';

type Props = {
  searchParams: { code?: string; message?: string; orderId?: string };
};

export default function Page({ searchParams }: Props) {
  const { code, message, orderId } = searchParams;

  return (
    <main className="mx-auto my-12 max-w-[560px] p-4">
      <div className="rounded-[14px] border border-gray-200 bg-white p-5">
        <h1 className="text-[22px] font-extrabold">결제 실패</h1>

        <div className="mt-4 space-y-1 text-sm leading-relaxed text-gray-700">
          <div>
            <b className="font-semibold text-gray-900">code</b>: {code ?? '-'}
          </div>
          <div>
            <b className="font-semibold text-gray-900">message</b>:{' '}
            {message ?? '-'}
          </div>
          <div>
            <b className="font-semibold text-gray-900">orderId</b>:{' '}
            {orderId ?? '-'}
          </div>
        </div>

        <div className="mt-[18px] flex gap-2">
          <Link
            href="/payments/checkout"
            className="rounded-[10px] border border-gray-200 px-3 py-2.5 text-sm hover:bg-gray-50"
          >
            다시 시도하기
          </Link>
        </div>
      </div>
    </main>
  );
}
