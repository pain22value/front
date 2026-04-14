import api from "@/shared/api/axios";
import { ENDPOINTS } from "@/shared/api/endpoints";

/**
 * 내 멤버십 목록 조회
 */
const getMyMemberships = async () => {
  const { data } = await api.get<ApiResponse<MyMembershipData>>(ENDPOINTS.MY.MEMBERSHIP);
  if (!data.data) throw new Error("멤버십 정보를 불러올 수 없습니다.");
  return data.data;
};

export const myMembershipService = {
  getMyMemberships,
};
