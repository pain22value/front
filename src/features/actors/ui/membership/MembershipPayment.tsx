export default function MembershipPayment() {
  return (
    <div className="max-w-4xl mx-auto p-8 font-sans antialiased text-slate-900">
      {/* 1. 상단 단계 인디케이터 (Step Indicator) */}
      <div className="flex items-center justify-center space-x-4 mb-10 text-sm font-semibold">
        <div className="flex items-center text-slate-400">
          <span className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center mr-2 text-white">1</span>
          플랜 선택
        </div>
        <div className="w-16 h-px bg-slate-300"></div>
        <div className="flex items-center text-slate-900">
          <span className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center mr-2 text-white font-bold">
            2
          </span>
          결제
        </div>
        <div className="w-16 h-px bg-slate-300"></div>
        <div className="flex items-center text-slate-300">
          <span className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center mr-2">3</span>
          완료
        </div>
      </div>

      {/* 2. 배우 프로필 섹션 */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 mb-6 flex gap-6 shadow-sm">
        <div className="w-32 h-40 bg-slate-100 rounded-xl overflow-hidden flex-shrink-0">
          <img src="https://via.placeholder.com/128x160" alt="Profile" className="w-full h-full object-cover" />
        </div>
        <div className="flex flex-col justify-center">
          <h2 className="text-2xl font-extrabold mb-1">고은성</h2>
          <p className="text-slate-400 text-sm mb-3">뮤지컬 배우</p>
          <p className="text-slate-600 text-[15px] leading-relaxed">
            활동 작품: 뮤지컬 〈한복 입은 남자〉(2025), 뮤지컬 〈멤피스〉 - 성남(2025), 뮤지컬 데스노트(The Musical
            Death Note (2025)
          </p>
        </div>
      </div>

      {/* 3. 결제 상세 정보 섹션 */}
      <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
        <div className="flex items-center gap-2 mb-6 border-b pb-4">
          <span className="text-xl">💳</span>
          <h3 className="text-lg font-bold">결제 정보 입력</h3>
        </div>

        {/* 멤버십 금액 카드 */}
        <div className="bg-rose-50 rounded-xl p-6 mb-8 flex justify-between items-center border border-rose-100">
          <div>
            <h4 className="font-bold text-slate-800 text-lg">월간 멤버십</h4>
            <p className="text-rose-400 text-sm font-medium mt-1">매월 자동 결제됩니다</p>
          </div>
          <div className="flex items-baseline">
            <span className="text-3xl font-black text-rose-500">5,000</span>
            <span className="text-rose-500 font-bold ml-1">원</span>
            <span className="text-slate-400 text-sm ml-1">/월</span>
          </div>
        </div>

        {/* 결제 수단 선택 */}
        <div className="mb-8 text-left">
          <h4 className="font-bold text-slate-800 mb-4">결제 수단</h4>
          <label className="flex items-start gap-4 p-5 border-2 border-slate-100 rounded-xl cursor-pointer hover:border-slate-200 transition-all bg-slate-50/30">
            <input type="radio" name="payment" defaultChecked className="mt-1 w-5 h-5 accent-rose-500" />
            <div className="flex-1">
              <p className="font-bold text-slate-800">간편 결제 · 카드 결제</p>
              <p className="text-slate-400 text-sm mt-0.5 font-medium">Text</p>
            </div>
          </label>
        </div>

        {/* 안내 사항 (유의사항) */}
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

        {/* 하단 버튼 */}
        <div className="flex gap-4">
          <button className="flex-1 py-4 text-slate-600 font-bold rounded-xl hover:bg-slate-100 transition-colors">
            취소
          </button>
          <button className="flex-[2] py-4 bg-rose-500 text-white font-bold rounded-xl shadow-lg shadow-rose-200 hover:bg-rose-600 transition-all active:scale-[0.98]">
            멤버십 가입하기
          </button>
        </div>
      </div>
    </div>
  );
}
