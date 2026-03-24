import api from "@/shared/api/axios";
import { ENDPOINTS } from "@/shared/api/endpoints";

// 배우 좋아요 등록
const likeArtist = async (artistId: number) => {
  const { data } = await api.post<ApiResponse<string>>(ENDPOINTS.ARTISTS.LIKE(artistId));
  return data;
};

// 배우 좋아요 취소
const unlikeArtist = async (artistId: number) => {
  const { data } = await api.delete<ApiResponse<string>>(ENDPOINTS.ARTISTS.LIKE(artistId));
  return data;
};

export const artistService = {
  likeArtist,
  unlikeArtist,
};
