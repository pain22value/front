import Link from "next/link";

type Props = {
  searchParams: { code?: string; message?: string; orderId?: string };
};

export default function Page({ searchParams }: Props) {
  const { code, message, orderId } = searchParams;

  // 실패 사유 매핑
  const failReason = message ?? code ?? "결제 제한 시간 초과";

  // sessionStorage에서 예매 정보 가져오기 (클라이언트에서만 동작)
  // 실제로는 클라이언트 컴포넌트로 분리 필요
  const showTitle = "킹키부츠";
  const datetime = "2026.01.26(월) 오후 7:00";
  const seats = ["1층 B구역 16열 6번", "1층 B구역 16열 7번"];

  return (
    <main className="min-h-screen bg-white flex flex-col items-center justify-center px-4">
      {/* 실패 아이콘 */}
      <div className="flex flex-col items-center mb-6">
        <div className="w-14 h-14 rounded-full bg-[#23222A] flex items-center justify-center mb-5">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 6L6 18M6 6L18 18" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
          </svg>
        </div>
        <h1 className="text-[22px] font-bold text-[#23222A]">예매 실패</h1>
        <p className="mt-1 text-[14px] font-medium text-[#68677E]">선택하신 좌석의 결제 시간이 초과되었습니다.</p>
      </div>

      {/* 예매 정보 카드 */}
      <div className="w-full max-w-[360px] rounded-xl border border-[#F1F1F4] bg-white overflow-hidden">
        {/* 공연 정보 */}
        <div className="px-5 py-4 space-y-3">
          <InfoRow label="공연명" value={showTitle} />
          <InfoRow label="일시" value={datetime} />
          <InfoRow
            label="좌석"
            value={
              <div className="text-right">
                {seats.map((seat, idx) => (
                  <div key={idx} className="text-[14px] font-medium text-[#23222A]">{seat}</div>
                ))}
              </div>
            }
          />
        </div>

        <div className="h-px bg-[#F1F1F4]" />

        {/* 실패 사유 */}
        <div className="px-5 py-4">
          <InfoRow
            label="실패사유"
            value={
              <span className="text-[14px] font-medium text-[#F93E4B]">{failReason}</span>
            }
          />
        </div>

        {/* 버튼 영역 */}
        <div className="px-5 pb-5 space-y-2">
          <Link
            href="/shows/1"
            className="block w-full py-3 rounded-lg bg-[#23222A] text-center text-[15px] font-semibold text-white hover:bg-[#3a3947] active:bg-[#111118] transition-colors"
          >
            다시 예매하기
          </Link>
          <Link
            href="/"
            className="block w-full py-3 rounded-lg border border-[#F1F1F4] text-center text-[15px] font-semibold text-[#23222A] hover:bg-[#F1F1F4] active:bg-[#D5D5DD] transition-colors"
          >
            홈으로 가기
          </Link>
        </div>
      </div>
    </main>
  );
}

function InfoRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-start justify-between gap-4">
      <span className="text-[14px] font-medium text-[#68677E] shrink-0">{label}</span>
      {typeof value === "string" ? (
        <span className="text-[14px] font-medium text-[#23222A] text-right">{value}</span>
      ) : (
        value
      )}
    </div>
  );
}