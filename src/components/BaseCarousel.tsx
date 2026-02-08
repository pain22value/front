"use client";

import { useEffect, useState, type ReactNode } from "react";
import {
  type CarouselApi,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { cn } from "@/shared/utils/cn";

interface BaseCarouselProps<T> {
  items: T[]; // 표시할 데이터 배열 (id 속성 필수)
  renderItem: (item: T, index: number, isSelected: boolean) => ReactNode; // 각 아이템을 렌더링할 함수
  itemsPerView?: number; // 한 번에 표시할 아이템 개수 (설정 시 flex-basis 강제 적용)
  showPagination?: boolean; // 페이지네이션 인디케이터 표시 여부
  showButtonsOnHover?: boolean; // 호버 시에만 네비게이션 버튼 표시 여부
  className?: string; // 전체 컨테이너 클래스
  contentClassName?: string; // CarouselContent 클래스
  itemClassName?: string; // CarouselItem 클래스 (반응형 basis 설정 등)
  loop?: boolean; // 무한 루프 여부
  align?: "start" | "center" | "end"; // 정렬 방식
}

export function BaseCarousel<T extends { id: string | number }>({
  items,
  renderItem,
  itemsPerView,
  showPagination = false,
  showButtonsOnHover = false,
  className,
  contentClassName,
  itemClassName,
  loop = true,
  align = "center",
}: BaseCarouselProps<T>) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    // api가 초기화되지 않았으면 실행하지 않음
    if (!api) return;

    const updateState = () => {
      setCount(api.scrollSnapList().length);
      setCurrent(api.selectedScrollSnap());
    };

    updateState();

    // 이벤트 리스너 등록
    api.on("select", updateState);
    api.on("reInit", updateState);

    // Cleanup 함수: 컴포넌트 언마운트 시 또는 api 변경 시 이벤트 제거
    return () => {
      api.off("select", updateState);
      api.off("reInit", updateState);
    };
  }, [api]); // 의존성 배열에 api 추가

  // useEffect(() => {
  //   if (!api) return;

  //   setCount(api.scrollSnapList().length);
  //   setCurrent(api.selectedScrollSnap());

  //   api.on("select", () => {
  //     setCurrent(api.selectedScrollSnap());
  //   });
  // }, [api]);

  // itemsPerView가 있으면 style로 flex-basis를 계산하여 적용
  const itemStyle = itemsPerView ? { flexBasis: `${100 / itemsPerView}%` } : undefined;

  return (
    <div className={cn("relative w-full group", className)}>
      <Carousel
        setApi={setApi}
        opts={{
          align,
          loop,
        }}
        className="w-full"
      >
        {/* 컨텐트 */}
        <CarouselContent className={cn("-ml-4", contentClassName)}>
          {items.map((item, index) => (
            <CarouselItem key={item.id} className={cn("pl-4", itemClassName)} style={itemStyle}>
              {renderItem(item, index, index === current)}
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* 좌우 버튼 */}
        <CarouselPrevious
          className={cn(
            showButtonsOnHover && "lg:left-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300",
          )}
        />
        <CarouselNext
          className={cn(
            showButtonsOnHover && "lg:right-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300",
          )}
        />
      </Carousel>

      {/* 페이지네이션 */}
      {showPagination && (
        <div className="flex justify-center gap-2 mt-4">
          {Array.from({ length: count }).map((_, index) => (
            <button
              key={index}
              className={cn(
                "h-2 w-2 rounded-full transition-all duration-300",
                index === current ? "bg-primary w-6" : "bg-primary/30 hover:bg-primary/50",
              )}
              onClick={() => api?.scrollTo(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
