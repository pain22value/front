import api from "@/shared/api/axios";
import { ENDPOINTS } from "@/shared/api/endpoints";

// 공연 목록 조회
const getShows = async (params?: ShowsListParams): Promise<ShowsData> => {
  const { data } = await api.get<ApiResponse<ShowsData>>(ENDPOINTS.HOME.SHOWS, {
    params: {
      order: params?.order ?? "DAILY_BOOKING",
      region: params?.region ?? "ALL",
      page: params?.page ?? 1,
      size: params?.size ?? 10,
    },
  });
  console.log({ data });
  if (!data.data) throw new Error("홈 공연 목록 데이터가 없습니다.");
  return data.data;
};

// 공연 일정 조회
const getSchedules = async (date: Date): Promise<ShowSchedule[]> => {
  const { data } = await api.get<ApiResponse<ShowSchedule[]>>(ENDPOINTS.SHOWS.SCHEDULES, {
    params: { date: date.toISOString() },
  });
  if (!data || !data.data) throw new Error("공연 일정을 불러올 수 없습니다.");
  return data.data;
};

// // 공연 상세 조회
// const getShowDetail = async (showId: string): Promise<ShowDetail> => {
//   const { data } = await api.get<ApiResponse<ShowDetail>>(ENDPOINTS.SHOWS.DETAIL(showId));
//   if (!data.data) throw new Error("공연 상세 정보를 불러올 수 없습니다.");
//   return data.data;
// };
async function getShowDetail(showId: string): Promise<ShowDetail> {
  try {
    const res = await fetch(`${process.env.API_URL}${ENDPOINTS.SHOWS.DETAIL(showId)}`);
    if (!res.ok) throw new Error(`Failed to fetch show detail: ${res.status}`);
    const result: ApiResponse<ShowDetail> = await res.json();
    if (!result.data) throw new Error("공연 상세 데이터가 없습니다.");
    return result.data;
  } catch (error) {
    console.error("getShowDetail Error:", error);
    throw error;
  }
}

// 공연 캐스팅 일정 조회
const getCastingSchedules = async (showId: string | number): Promise<ShowScheduleData> => {
  const { data } = await api.get<ApiResponse<ShowScheduleData>>(ENDPOINTS.SHOWS.CASTING_SCHEDULES(showId));
  if (!data.data) throw new Error("캐스팅 일정을 불러올 수 없습니다.");
  return data.data;
};

export const showService = {
  getShows,
  getSchedules,
  getShowDetail,
  getCastingSchedules,
};
