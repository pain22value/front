import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function useCommentSidebarAnimation(showDetail: boolean) {
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

  return { detailRef, backdropRef };
}
