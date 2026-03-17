import api from "@/shared/api/axios";
import { ENDPOINTS } from "@/shared/api/endpoints";

// 공연 목록 조회
const getShows = async (params: QueryParams): Promise<Show[]> => {
  const url = ENDPOINTS.SHOWS.LIST;
  const { data } = await api.get<ApiResponse<Show[]>>(url, { params });
  if (!data.data) throw new Error("공연 목록을 불러올 수 없습니다.");
  return data.data;
};

// 추천 공연 목록 조회
const getRecommendedShows = async (): Promise<Show[]> => {
  const { data } = await api.get<ApiResponse<Show[]>>(ENDPOINTS.SHOWS.RECOMMENDATIONS);
  if (!data.data) throw new Error("추천 공연을 불러올 수 없습니다.");
  return data.data;
};

// 공연 일정 조회
const getSchedules = async (date: Date): Promise<ShowSchedule[]> => {
  const { data } = await api.get<ApiResponse<ShowSchedule[]>>(`${ENDPOINTS.SHOWS.LIST}/schedules`, {
    params: { date: date.toISOString() },
  });
  if (!data || !data.data) throw new Error("공연 일정을 불러올 수 없습니다.");
  return data.data;
};

// 공연 상세 조회
const getShowDetail = async (showId: string): Promise<ShowDetail> => {
  const { data } = await api.get<ApiResponse<ShowDetail>>(`${ENDPOINTS.SHOWS.DETAIL}/${showId}`);
  if (!data.data) throw new Error("공연 상세 정보를 불러올 수 없습니다.");
  return data.data;
};

export const showService = {
  getShows,
  getShowDetail,
  getSchedules,
  getRecommendedShows,
};
