import { REVIEW_LIST } from "@/shared/data/reviews";
import { ACTOR_LIST } from "@/shared/data/actors";
import { SHOW_LIST } from "@/shared/data/shows";

// 날짜 비교를 통한 공연 상태 카테고리 필터링
export const filterShowsByCategory = (items: Show[], category: "all" | "now" | "tobe" | "closed" = "all"): Show[] => {
  if (category === "all") return items;

  const now = new Date();
  return items.filter((show) => {
    const startDate = new Date(show.startTime.replace(/\./g, "-"));
    const endDate = new Date(show.endTime.replace(/\./g, "-"));

    if (category === "now") return startDate <= now && now <= endDate;
    if (category === "tobe") return now < startDate;
    if (category === "closed") return now > endDate;
    return true;
  });
};

// 배우 ID 기반 공연 필터링
export const filterShowsByActor = (items: Show[], actorId: number | string): Show[] => {
  // 실제 백엔드 연동 전까지는 데이터의 특정 포션만 반환하는 목업 로직
  return items.slice(0, 4);
};

// 검색어 매칭 필터링
export const filterSearchResults = (query: string) => {
  const lower = query.toLowerCase();
  const filteredShows = SHOW_LIST.filter((show) => show.title.toLowerCase().includes(lower));
  const filteredActors = ACTOR_LIST.filter((actor) => actor.name.toLowerCase().includes(lower));

  return {
    shows: filteredShows,
    actors: filteredActors,
  };
};

// 리뷰 평점/감성 필터링 및 페이징
export const filterAndPaginateReviews = (
  items: typeof REVIEW_LIST,
  { page, sentiment }: { page: number; sentiment: string },
) => {
  const REVIEWS_PER_PAGE = 5;
  const filtered =
    sentiment === "all"
      ? items
      : items.filter((review) =>
          sentiment === "good" ? review.sentiment === "좋았어요" : review.sentiment === "아쉬워요",
        );

  const totalPages = Math.ceil(filtered.length / REVIEWS_PER_PAGE);
  const paginatedReviews = filtered.slice((page - 1) * REVIEWS_PER_PAGE, page * REVIEWS_PER_PAGE);

  return { reviews: paginatedReviews, totalPages, currentPage: page };
};
