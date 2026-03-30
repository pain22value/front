import api from "@/shared/api/axios";
import { ENDPOINTS } from "@/shared/api/endpoints";

// 공연 리뷰 목록 조회
const getReviews = async (showId: number, params: { page: number; size: number }) => {
  const { data } = await api.get<ApiResponse<ReviewListResponse>>(ENDPOINTS.SHOWS.REVIEWS(showId), {
    params,
  });
  if (!data.data) throw new Error("리뷰를 불러올 수 없습니다.");
  return data.data;
};

// 공연 리뷰 작성
const postReview = async (showId: number, body: ReviewPostRequest) => {
  const { data } = await api.post<ApiResponse<ReviewPostRequest>>(ENDPOINTS.SHOWS.REVIEWS(showId), body);
  return data.data;
};

// 공연 리뷰 메타 정보 조회
const getReviewMeta = async (showId: number) => {
  const { data } = await api.get<ApiResponse<ReviewMetaResponse>>(ENDPOINTS.SHOWS.REVIEWS_META(showId));
  if (!data.data) throw new Error("리뷰 메타 정보를 불러올 수 없습니다.");
  return data.data;
};

export const reviewService = {
  getReviews,
  postReview,
  getReviewMeta,
};
