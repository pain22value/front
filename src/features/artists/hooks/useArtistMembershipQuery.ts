"use client";

import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { membershipService } from "@/features/artists/services/membershipService";

/**
 * 아티스트 멤버십 가입 완료 정보 조회 훅
 * @param artistId 아티스트 ID
 */
export default function useMembershipCompleteQuery(artistId: number | string) {
  const searchParams = useSearchParams();
  const params = Object.fromEntries(searchParams.entries());

  return useQuery({
    queryKey: ["artist", artistId, "membership-complete", params],
    queryFn: () => membershipService.getMembershipComplete(artistId, params),
    enabled: !!artistId,
  });
}
