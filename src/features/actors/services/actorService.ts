import api from "@/shared/api/axios";

// 배우 정보 조회
const getActorDetail = async (actorId: number | string) => {
  const { data } = await api.get<ApiResponse<Actor>>(`/actors/${actorId}`);
  if (!data.data) throw new Error("배우 정보를 불러올 수 없습니다.");
  return data.data;
};

export const actorService = {
  getActorDetail,
};
