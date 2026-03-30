import api from "@/shared/api/axios";
import { ENDPOINTS } from "@/shared/api/endpoints";

const getHomeShows = async (params?: ShowsListParams): Promise<ShowsData> => {
  const { data } = await api.get<ApiResponse<ShowsData>>(ENDPOINTS.HOME.SHOWS, {
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

const getHomeBanners = async (): Promise<BannersData> => {
  const { data } = await api.get<ApiResponse<BannersData>>(ENDPOINTS.HOME.BANNERS);
  if (!data.data) throw new Error("홈 배너 데이터가 없습니다.");
  return data.data;
};

const getHomePromotions = async (): Promise<PromotionsData> => {
  const { data } = await api.get<ApiResponse<PromotionsData>>(ENDPOINTS.HOME.PROMOTIONS);
  if (!data.data) throw new Error("홈 프로모션 데이터가 없습니다.");
  return data.data;
};

export const homeService = {
  getHomeShows,
  getHomeBanners,
  getHomePromotions,
};
