import api from "@/shared/api/axios";
import { ENDPOINTS } from "@/shared/api/endpoints";

// 통합 검색 (공연, 배우를 통합하여 검색)
const getSearchResults = async (params: SearchParams): Promise<SearchResponse> => {
  if (!params.keyword.trim()) {
    return {
      keyword: params.keyword,
      artistCount: 0,
      showCount: 0,
      hasMoreArtists: false,
      hasMoreShows: false,
      artists: [],
      shows: [],
    };
  }
  const { data } = await api.get<ApiResponse<SearchResponse>>(ENDPOINTS.SEARCH.LIST, { params });
  if (!data.data) throw new Error("검색 결과를 불러올 수 없습니다.");
  return data.data;
};

export const searchService = {
  getSearchResults,
};
