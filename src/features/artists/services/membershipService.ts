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

/**
 * 아티스트 멤버십 가입 완료 정보 조회
 * @param artistId 아티스트 ID
 * @param params 추가 쿼리 파라미터 (paymentKey, orderId, amount 등)
 * @returns 가입 완료 정보
 */
const getMembershipComplete = async (artistId: number | string, params?: Record<string, string | null>) => {
  const { data } = await api.get<ApiResponse<ArtistMembershipCompleteData>>(
    ENDPOINTS.ARTISTS.MEMBERSHIP_COMPLETE(artistId),
    { params }
  );
  if (!data.data) throw new Error("가입 정보를 불러오는데 실패했습니다.");
  return data.data;
};

export const membershipService = {
  prepareMembershipPayment,
  getMembershipComplete,
};
