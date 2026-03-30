import { useQuery } from "@tanstack/react-query";
import { showService } from "../services/showService";

export const useCastingSchedules = (showId: string | number) => {
  return useQuery<ShowScheduleData>({
    queryKey: ["castingSchedules", showId],
    queryFn: () => showService.getCastingSchedules(showId),
    enabled: !!showId,
    staleTime: 1000 * 60 * 5, // 5분
  });
};
