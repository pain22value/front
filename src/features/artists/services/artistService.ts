import api from "@/shared/api/axios";
import { ENDPOINTS } from "@/shared/api/endpoints";

// 아티스트 상세 조회
const getArtistDetail = async (artistId: number | string) => {
  const { data } = await api.get<ApiResponse<ArtistDetail>>(ENDPOINTS.ARTISTS.DETAIL(artistId));
  if (!data.data) throw new Error("아티스트 정보를 불러올 수 없습니다.");
  return data.data;
};

// 아티스트 지난 공연 조회
const getPastShows = async (artistId: number | string, page = 1, size = 10) => {
  const { data } = await api.get<ApiResponse<ArtistPastShowsResponse>>(ENDPOINTS.ARTISTS.PAST_SHOWS(artistId), {
    params: { page, size },
  });
  if (!data.data) throw new Error("지난 공연 내역을 불러올 수 없습니다.");
  return data.data;
};

// 배우 좋아요 등록
const likeArtist = async (artistId: number | string) => {
  const { data } = await api.post<ApiResponse<string>>(ENDPOINTS.ARTISTS.LIKE(artistId));
  return data;
};

// 배우 좋아요 취소
const unlikeArtist = async (artistId: number | string) => {
  const { data } = await api.delete<ApiResponse<string>>(ENDPOINTS.ARTISTS.LIKE(artistId));
  return data;
};

export const artistService = {
  getArtistDetail,
  getPastShows,
  likeArtist,
  unlikeArtist,
};
