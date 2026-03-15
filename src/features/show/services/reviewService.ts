import api from "@/shared/api/axios";
import { ENDPOINTS } from "@/shared/api/endpoints";

// 공연 리뷰 목록 조회
const getReviews = async (params: { page: number; sentiment: string }) => {
  const url = ENDPOINTS.SHOWS.LIST + "/reviews";
  const { data } = await api.get<ApiResponse<ReviewListResponse>>(url, { params });
  if (!data.data) throw new Error("리뷰를 불러올 수 없습니다.");
  return data.data;
};

export const reviewService = {
  getReviews,
};
