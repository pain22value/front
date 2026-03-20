import { useQuery } from "@tanstack/react-query";
import { homeService } from "../services/home.service";
import { HOME_SHOW_RECOMMEND_LIST } from "@/shared/data/shows";

export default function useHomeShows(
  order: HomeShowsOrder = "DAILY_BOOKING",
  region: HomeShowsRegion = "ALL",
  page: number = 1,
  size: number = 10,
) {
  return useQuery({
    queryKey: ["homeShows", order, region, page, size],
    queryFn: () => homeService.getHomeShows({ order, region, page, size }),
    staleTime: 1000 * 60 * 5, // 5분
    retry: 1,
    select: (data) => ({
      shows: data && data.shows.length > 0 ? data.shows : HOME_SHOW_RECOMMEND_LIST,
      page: data?.page || {
        currentPage: page,
        size: size,
        totalElements: 0,
        totalPages: 0,
      },
    }),
  });
}

