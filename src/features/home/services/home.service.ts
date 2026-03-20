import api from "@/shared/api/axios";
import { ENDPOINTS } from "@/shared/api/endpoints";

const getHomeShows = async (params?: HomeShowsParams): Promise<HomeShowsData> => {
  const { data } = await api.get<ApiResponse<HomeShowsData>>(ENDPOINTS.HOME.SHOWS, {
    params: {
      order: params?.order ?? "DAILY_BOOKING",
      region: params?.region ?? "ALL",
      page: params?.page ?? 1,
      size: params?.size ?? 10,
    },
  });
  if (!data.data) throw new Error("홈 공연 목록 데이터가 없습니다.");
  return data.data;
};

const getHomeBanners = async (): Promise<HomeBannersData> => {
  const { data } = await api.get<ApiResponse<HomeBannersData>>(ENDPOINTS.HOME.BANNERS);
  if (!data.data) throw new Error("홈 배너 데이터가 없습니다.");
  return data.data;
};

export const homeService = {
  getHomeShows,
  getHomeBanners,
};
