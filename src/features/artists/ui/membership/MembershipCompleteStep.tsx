import Link from "next/link";

export default function MembershipCompleteStep({ onPrev }: { onPrev?: () => void }) {
  return (
    <div className="text-center py-20 bg-white dark:bg-zinc-900 rounded-3xl shadow-sm border border-slate-100 dark:border-zinc-800">
      <div className="w-20 h-20 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-6">
        <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <h2 className="text-3xl font-black text-slate-900 dark:text-zinc-100 mb-2">가입 완료!</h2>
      <p className="text-slate-500 dark:text-zinc-400 font-medium mb-10">이제 아티스트와의 특별한 순간을 함께하세요.</p>
      <Link href="/">
        <button className="px-10 py-4 bg-slate-900 dark:bg-zinc-100 text-white dark:text-zinc-950 font-bold rounded-2xl hover:bg-slate-800 dark:hover:bg-zinc-200 transition-all active:scale-[0.98]">
          홈으로 이동
        </button>
      </Link>
    </div>
  );
}
