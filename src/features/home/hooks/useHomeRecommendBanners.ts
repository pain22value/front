import { useQuery } from "@tanstack/react-query";
import { homeService } from "../services/home.service";
import { HOME_BANNER_RECOMMEND_LIST } from "@/shared/data/shows";

export const useHomeRecommendBanners = () => {
  return useQuery({
    queryKey: ["homeRecommendBanners"],
    queryFn: () => homeService.getHomeBanners(),
    staleTime: 1000 * 60 * 60, // 1시간
    retry: 1,
    select: (data) =>
      data && data.banners.length > 0
        ? data.banners.slice().sort((a, b) => a.displayOrder - b.displayOrder)
        : HOME_BANNER_RECOMMEND_LIST,
  });
};
