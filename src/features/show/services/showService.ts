import api from "@/shared/api/axios";
import { ENDPOINTS } from "@/shared/api/endpoints";

const getRecommendations = async () => {
  return api.get<ShowItem[]>(ENDPOINTS.SHOWS.RECOMMENDATIONS);
};

export const showService = { getRecommendations };
