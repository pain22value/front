import api from "@/shared/api/axios";
import { ENDPOINTS } from "@/shared/api/endpoints";
import { reviews } from "@/shared/data/reviews";

const getRecommendations = async () => {
  const { data } = await api.get<ApiResponse<ShowItem[]>>(ENDPOINTS.SHOWS.RECOMMENDATIONS);
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

export const showService = { getRecommendations, getReviews, getSchedules };
