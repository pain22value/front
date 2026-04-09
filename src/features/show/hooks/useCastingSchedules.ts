import { useQuery } from "@tanstack/react-query";
import { showService } from "../services/showService";

export const useCastingSchedules = (
  showId: string | number,
  params?: {
    from?: string;
    to?: string;
    artistIds?: number[];
    page?: number;
    size?: number;
  }
) => {
  return useQuery<ShowScheduleData>({
    queryKey: ["castingSchedules", showId, params],
    queryFn: () => showService.getCastingSchedules(showId, params),
    enabled: !!showId,
    staleTime: 1000 * 60 * 5, // 5분
  });
};
