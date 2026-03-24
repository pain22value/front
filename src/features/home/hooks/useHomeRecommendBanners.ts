import { useQuery } from "@tanstack/react-query";
import { homeService } from "../services/home.service";

export const useHomeRecommendBanners = () => {
  return useQuery({
    queryKey: ["homeRecommendBanners"],
    queryFn: () => homeService.getHomeBanners(),
    staleTime: 1000 * 60 * 60, // 1시간
    retry: 1,
    select: (data) =>
      data && data.banners.length > 0 && [...data.banners].sort((a, b) => a.displayOrder - b.displayOrder),
  });
};
