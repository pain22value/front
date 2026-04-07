"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import CommentSection from "./CommentSection";
import ArtistCommentDetail from "./ArtistCommentDetail";

export default function ArtistCommentSidebar() {
  const [showDetail, setShowDetail] = useState(false);
  const detailRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!detailRef.current || !backdropRef.current) return;

    if (showDetail) {
      // 배경 페이드 인 및 클릭 활성화
      gsap.to(backdropRef.current, {
        opacity: 1,
        duration: 0.3,
        pointerEvents: "auto",
      });
      // 오른쪽에서 0지점까지 슬라이딩 인 (w-[90%]이므로 왼쪽 10%가 여백이 됨)
      gsap.to(detailRef.current, {
        x: 0,
        duration: 0.4,
        ease: "power3.out",
      });
    } else {
      // 배경 페이드 아웃 및 클릭 비활성화
      gsap.to(backdropRef.current, {
        opacity: 0,
        duration: 0.2,
        pointerEvents: "none",
      });
      // 다시 오른쪽으로 슬라이딩 아웃
      gsap.to(detailRef.current, {
        x: "100%",
        duration: 0.3,
        ease: "power3.in",
      });
    }
  }, [showDetail]);

  return (
    <div className="relative w-full h-full overflow-hidden bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm">
      {/* 댓글 목록 섹션 */}
      <div className="w-full h-full overflow-y-auto">
        <CommentSection onCommentClick={() => setShowDetail(true)} />
      </div>

      {/* 외부 클릭 감지용 백드롭 (나머지 10% 영역 및 오버레이 배경) */}
      <div
        ref={backdropRef}
        onClick={() => setShowDetail(false)}
        className="absolute inset-0 z-10 bg-black/40 opacity-0 pointer-events-none transition-opacity duration-300"
      />

      {/* 게시글 상세/답글 섹션 (부모의 90% 너비 차지) */}
      <div
        ref={detailRef}
        style={{ transform: "translateX(100%)" }}
        className="absolute top-0 right-0 z-20 w-[90%] h-full bg-white dark:bg-slate-950 shadow-[-20px_0_50px_rgba(0,0,0,0.2)]/ dark:shadow-none"
      >
        <ArtistCommentDetail onBack={() => setShowDetail(false)} />
      </div>
    </div>
  );
}
