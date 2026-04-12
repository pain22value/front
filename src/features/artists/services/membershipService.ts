import api from "@/shared/api/axios";
import { ENDPOINTS } from "@/shared/api/endpoints";

/**
 * 아티스트 멤버십 결제 준비
 * @param artistId 아티스트 ID
 * @param body 결제 준비 요청 데이터
 * @returns 결제 준비 정보
 */
const prepareMembershipPayment = async (artistId: number | string, body: PrepareMembershipPaymentRequest) => {
  const { data } = await api.post<ApiResponse<PrepareMembershipPaymentResponse>>(
    ENDPOINTS.ARTISTS.MEMBERSHIP_PAYMENT(artistId),
    body
  );
  if (!data.data) throw new Error("결제 준비에 실패했습니다.");
  return data.data;
};

export const membershipService = {
  prepareMembershipPayment,
};
