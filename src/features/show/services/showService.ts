import api from "@/shared/api/axios";
import { ENDPOINTS } from "@/shared/api/endpoints";

const getRecommendations = async () => {
  const { data } = await api.get<ApiResponse<ShowItem[]>>(ENDPOINTS.SHOWS.RECOMMENDATIONS);
  return data.data;
};

export const showService = { getRecommendations };
