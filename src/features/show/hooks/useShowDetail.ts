import { useQuery } from "@tanstack/react-query";
import { showService } from "../services/showService";

export default function useShowDetail(showId: string | number) {
  return useQuery({
    queryKey: ["show", "detail", String(showId)],
    queryFn: () => showService.getShowDetailClient(String(showId)),
    enabled: !!showId,
    staleTime: 1000 * 60 * 10, // 10분
  });
}
