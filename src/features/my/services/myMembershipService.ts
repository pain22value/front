import api from "@/shared/api/axios";
import { ENDPOINTS } from "@/shared/api/endpoints";

/**
 * 내 멤버십 목록 조회
 */
const getMyMemberships = async () => {
  const { data } = await api.get<ApiResponse<MyMembershipData>>(ENDPOINTS.MY.MEMBERSHIP_LIST);
  if (!data.data) throw new Error("멤버십 정보를 불러올 수 없습니다.");
  return data.data;
};

/**
 * 멤버십 해지
 */
const cancelMembership = async (membershipId: number) => {
  const { data } = await api.post<ApiResponse<null>>(ENDPOINTS.MY.MEMBERSHIPS.CANCEL(membershipId));
  return data;
};

export const myMembershipService = {
  getMyMemberships,
  cancelMembership,
};
