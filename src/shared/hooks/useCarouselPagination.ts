import { useState, useEffect, useCallback } from "react";
import { type CarouselApi } from "@/components/ui/carousel";

/**
 * Embla Carousel의 상태(현재 인덱스, 총 슬라이드 수)를 관리하고
 * 특정 인덱스로 이동하는 이동 기능을 제공하는 훅입니다.
 */
export default function useCarouselPagination(api: CarouselApi | undefined) {
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  // api가 준비되었을 때 초기 상태를 동기화합니다.
  // useEffect 내부에서 동기적으로 setState를 호출하면 cascading render가 발생할 수 있으므로,
  // 렌더링 중에 직접 상태를 업데이트하여 이를 방지합니다.
  if (api) {
    const apiCount = api.scrollSnapList().length;
    const apiCurrent = api.selectedScrollSnap();

    if (count !== apiCount) setCount(apiCount);
    if (current !== apiCurrent) setCurrent(apiCurrent);
  }

  const onSelect = useCallback(() => {
    if (!api) return;
    setCurrent(api.selectedScrollSnap());
  }, [api]);

  const onReInit = useCallback(() => {
    if (!api) return;
    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());
  }, [api]);

  useEffect(() => {
    if (!api) return;

    // 이벤트 리스너 등록
    api.on("select", onSelect);
    api.on("reInit", onReInit);

    return () => {
      api.off("select", onSelect);
      api.off("reInit", onReInit);
    };
  }, [api, onSelect, onReInit]);

  return {
    current,
    count,
    scrollTo: (index: number) => api?.scrollTo(index),
  };
}
