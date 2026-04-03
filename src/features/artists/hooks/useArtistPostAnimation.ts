"use client";

import { useEffect, useState, RefObject } from "react";
import gsap from "gsap";

interface UseArtistPostAnimationProps {
  selectedPostId: number | null;
  detailRef: RefObject<HTMLDivElement | null>;
}

export default function useArtistPostAnimation({
  selectedPostId,
  detailRef,
}: UseArtistPostAnimationProps) {
  // 애니메이션을 위해 렌더링 지연을 관리할 로컬 상태
  const [activePostId, setActivePostId] = useState<number | null>(selectedPostId);

  // selectedPostId가 있을 때는 렌더링 중에 즉시 동기화
  if (selectedPostId !== null && selectedPostId !== activePostId) {
    setActivePostId(selectedPostId);
  }

  useEffect(() => {
    if (!detailRef.current) return;

    if (selectedPostId !== null) {
      // 좌측에서 중앙으로 슬라이딩 인
      gsap.to(detailRef.current, {
        x: 0,
        duration: 0.4,
        ease: "power3.out",
      });
    } else {
      // 중앙에서 좌측으로 슬라이딩 아웃
      gsap.to(detailRef.current, {
        x: "-100%",
        duration: 0.3,
        ease: "power3.in",
        onComplete: () => {
          setActivePostId(null);
        },
      });
    }
  }, [selectedPostId, detailRef]);

  return { activePostId };
}
