import { useMutation, useQueryClient } from "@tanstack/react-query";
import { myMembershipService } from "../services/myMembershipService";

export default function useCancelMembershipMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (membershipId: number) => myMembershipService.cancelMembership(membershipId),
    onSuccess: () => {
      // 멤버십 목록 쿼리 무효화
      queryClient.invalidateQueries({ queryKey: ["my", "membership"] });
    },
  });
}
