import { useMutation, useQueryClient } from "@tanstack/react-query";
import { myMembershipService } from "../services/myMembershipService";
import { AxiosError } from "axios";

export default function useCancelMembershipMutation() {
  const queryClient = useQueryClient();

  return useMutation<ApiResponse<string>, AxiosError<ApiResponse<string>>, number>({
    mutationFn: (membershipId: number) => myMembershipService.cancelMembership(membershipId),
    onSuccess: () => {
      // 멤버십 목록 쿼리 무효화
      queryClient.invalidateQueries({ queryKey: ["my", "membership"] });
    },
  });
}
