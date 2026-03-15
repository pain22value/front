import api from "@/shared/api/axios";
import { ENDPOINTS } from "@/shared/api/endpoints";
import { SHOW_SCHEDULE_LIST } from "@/shared/data/schedules";

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
const getSchedules = async (date: Date | undefined): Promise<ShowSchedule[]> => {
  if (!date) return [];

  try {
    const url = `${ENDPOINTS.SHOWS.LIST}/schedules`;
    type Response = ApiResponse<ShowSchedule[]>;
    const { data } = await api.get<Response>(url, { params: { date: date.toISOString() } });

    if (!data.data || data.data.length === 0) {
      await new Promise((resolve) => setTimeout(resolve, 500));
      return SHOW_SCHEDULE_LIST;
    }

    return data.data;
  } catch (error) {
    console.error("공연 일정 조회 실패 (타임아웃 또는 네트워크 오류):", error);
    await new Promise((resolve) => setTimeout(resolve, 500));
    return SHOW_SCHEDULE_LIST;
  }
};

export const showService = {
  getShows,
  getRecommendedShows,
  getSchedules,
};
