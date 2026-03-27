import { useQuery } from "@tanstack/react-query";
import { homeService } from "../services/home.service";

export default function useHomeShows(
  order: ShowsOrder = "DAILY_BOOKING",
  region: ShowsRegion = "ALL",
  page: number = 1,
  size: number = 10,
) {
  return useQuery({
    queryKey: ["homeShows", order, region, page, size],
    queryFn: () => homeService.getHomeShows({ order, region, page, size }),
    staleTime: 1000 * 60 * 5, // 5분
    retry: 1,
  });
}
