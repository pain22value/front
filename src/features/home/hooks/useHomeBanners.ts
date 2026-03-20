import { useQuery } from "@tanstack/react-query";
import { homeService } from "../services/home.service";
import { HERO_BANNER_LIST } from "@/shared/data/heroBanners";

export const useHomeBanners = () => {
  return useQuery({
    queryKey: ["homeBanners"],
    queryFn: () => homeService.getHomeBanners(),
    staleTime: 1000 * 60 * 60, // 1시간
    retry: 1,
    select: (data) =>
      data && data.banners.length > 0
        ? data.banners.slice().sort((a, b) => a.displayOrder - b.displayOrder)
        : HERO_BANNER_LIST,
  });
};
