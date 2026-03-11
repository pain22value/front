import api from "@/shared/api/axios";
import { ENDPOINTS } from "@/shared/api/endpoints";
import { reviews } from "@/shared/data/reviews";
import { actors } from "@/shared/data/actors";
import { shows } from "@/shared/data/shows";

const getShows = async (category: "all" | "now" | "tobe" | "closed") => {
  await new Promise((resolve) => setTimeout(resolve, 500));

  if (category === "all") {
    return shows;
  }

  if (category === "now") {
    return shows;
  }

  return [];
};

const getShowsByActor = async (actorId: number | string, category: "now" | "past") => {
  await new Promise((resolve) => setTimeout(resolve, 500));

  // 가상 데이터: 모든 배우가 현재 '렌트', '물랑루즈'에 출연 중이라고 가정
  if (category === "now") {
    return shows.slice(0, 2);
  }

  // 지난 출연 작품: 나머지 작품들
  return shows.slice(2, 6);
};

const getRecommendations = async () => {
  const { data } = await api.get<ApiResponse<Show[]>>(ENDPOINTS.SHOWS.RECOMMENDATIONS);
  return data.data;
};

const getReviews = async ({ page = 1, sentiment = "all" }: { page: number; sentiment: string }) => {
  console.log(`Fetching reviews for page: ${page}, sentiment: ${sentiment}`);

  await new Promise((resolve) => setTimeout(resolve, 500));

  const REVIEWS_PER_PAGE = 5;
  const filtered =
    sentiment === "all"
      ? reviews
      : reviews.filter((review) =>
          sentiment === "good" ? review.sentiment === "좋았어요" : review.sentiment === "아쉬워요",
        );
  const totalPages = Math.ceil(filtered.length / REVIEWS_PER_PAGE);
  const paginatedReviews = filtered.slice((page - 1) * REVIEWS_PER_PAGE, page * REVIEWS_PER_PAGE);

  return { reviews: paginatedReviews, totalPages, currentPage: page };
};

const getSchedules = async (date: Date | undefined) => {
  if (!date) return [];

  await new Promise((resolve) => setTimeout(resolve, 500));

  return [
    { id: "1", round: 1, time: "오후 7:00", cast: "이재환, 백형훈, 허윤슬, 신승환" },
    { id: "2", round: 2, time: "오후 9:00", cast: "이재환, 백형훈, 허윤슬, 신승환" },
  ];
};

const search = async (query: string) => {
  if (!query.trim()) {
    return { shows: [], actors: [] };
  }

  /**
   * const { data } = await api.get<ApiResponse<{
   *   shows: Show[];
   *   actors: Actor[];
   * }>>(ENDPOINTS.SEARCH, {
   *   params: { q: query },
   * });
   *
   * return data.data;
   */

  await new Promise((resolve) => setTimeout(resolve, 500));

  const lower = query.toLowerCase();
  const filteredShows = shows.filter((show) => show.title.toLowerCase().includes(lower));
  const filteredActors = actors.filter((actor) => actor.name.toLowerCase().includes(lower));

  return {
    shows: filteredShows,
    actors: filteredActors,
  };
};

const getActorById = async (actorId: number | string) => {
  await new Promise((resolve) => setTimeout(resolve, 300));
  return actors.find((a) => a.id === Number(actorId));
};

export const showService = {
  getShows,
  getShowsByActor,
  getRecommendations,
  getReviews,
  getSchedules,
  search,
  getActorById,
};
