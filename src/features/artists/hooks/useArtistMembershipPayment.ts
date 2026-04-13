import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { membershipService } from "../services/membershipService";

/**
 * 아티스트 멤버십 결제 준비 훅
 * @returns {mutate, isLoading, error, isSuccess, data}
 */
export default function useArtistMembershipPayment() {
  return useMutation<
    PrepareMembershipPaymentResponse,
    AxiosError<ApiResponse<unknown>>,
    { artistId: number | string; body: PrepareMembershipPaymentRequest }
  >({
    mutationFn: ({ artistId, body }) => membershipService.prepareMembershipPayment(artistId, body),
  });
}
