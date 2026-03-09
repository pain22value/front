"use client";

import Link from "next/link";
import { useState } from "react";

type InfoRowData = {
  label: string;
  value: React.ReactNode;
  valueColor?: string;
  labelColor?: string;
  dividerAfter?: boolean;
  expandable?: React.ReactNode; // 펼쳐지는 추가 정보 (무통장 입금 계좌 등)
};

type ActionButton = {
  label: string;
  href: string;
  variant: "primary" | "outline";
};

type Props = {
  title: string;
  description: React.ReactNode;
  orderId?: string;
  infoRows: InfoRowData[];
  buttons: ActionButton[];
};

function InfoRow({ label, value, valueColor, labelColor, dividerAfter, expandable }: InfoRowData) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div
        className={`flex items-start justify-between gap-4 ${expandable ? "cursor-pointer" : ""}`}
        onClick={() => expandable && setOpen((v) => !v)}
      >
        <span className={`shrink-0 text-[14px] ${labelColor ?? "text-[#68677E]"}`}>
          {label}
        </span>
        <span className={`text-right text-[14px] font-semibold flex items-center gap-1 ${valueColor ?? "text-[#23222A]"}`}>
          {value}
          {expandable && (
            <svg
              className={`w-5 h-5 transition-transform shrink-0 ${open ? "rotate-180" : ""}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="#9E9DAF"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          )}
        </span>
      </div>
      {open && expandable && (
        <div className="text-right text-[13px] text-[#68677E] mt-1">
          {expandable}
        </div>
      )}
      {dividerAfter && <div className="h-px bg-[#F1F1F4] my-3" />}
    </>
  );
}

export default function ResultCard({ title, description, orderId, infoRows, buttons }: Props) {
  return (
    <main
      className="flex flex-col items-center pt-16 py-16 px-4 min-h-[calc(100vh-64px)]"
      style={{ background: "radial-gradient(ellipse at bottom right, #FFF5F6 0%, #FFFFFF 80%)" }}
    >
      {/* 체크 아이콘 */}
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#F93E4B]">
        <svg
          className="h-8 w-8 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={3.5}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </div>

      {/* 타이틀 */}
      <h1 className="mt-5 text-[24px] font-bold text-[#23222A]">{title}</h1>
      <div className="mt-1 text-[16px] text-[#68677E] text-center">{description}</div>

      {/* 카드 */}
      <div className="mt-6 w-full max-w-[504px] rounded-xl border border-[#DDDDE4] bg-white">

        {/* 예매번호 섹션 */}
        {orderId && (
          <>
            <div className="px-4 py-3 text-center">
              <p className="text-[16px] font-semibold text-[#23222A]">내 예매 번호</p>
              <p className="mt-1 text-[20px] font-bold tracking-widest text-[#23222A]">{orderId}</p>
            </div>
            <div className="mx-6 h-px bg-[#F1F1F4]" />
          </>
        )}

        {/* info rows */}
        <div className="space-y-2 px-6 py-5">
          {infoRows.map((row, idx) => (
            <InfoRow key={idx} {...row} />
          ))}
        </div>

        {/* 버튼 */}
        <div className="space-y-2 px-6 pb-6 pt-2">
          {buttons.map((btn) => (
            <Link
              key={btn.href}
              href={btn.href}
              className={`block w-full rounded-md py-3 text-center text-[16px] font-semibold transition-colors ${
                btn.variant === "primary"
                  ? "bg-[#F93E4B] text-white hover:bg-[#e0323e]"
                  : "border border-[#9E9DAF] text-[#22212B] hover:bg-gray-50"
              }`}
            >
              {btn.label}
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}