"use client";

import { useQuery } from "@tanstack/react-query";
import { myMembershipService } from "@/features/my/services/myMembershipService";

/**
 * 내 멤버십 목록 조회 훅
 */
export default function useMyMembershipQuery() {
  return useQuery({
    queryKey: ["my", "membership"],
    queryFn: myMembershipService.getMyMemberships,
  });
}
