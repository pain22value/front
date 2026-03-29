import { useQuery } from "@tanstack/react-query";
import { homeService } from "../services/home.service";

export const useHomeBanners = () => {
  return useQuery({
    queryKey: ["homeBanners"],
    queryFn: () => homeService.getHomeBanners(),
    staleTime: 1000 * 60 * 60, // 1시간
    retry: 1,
    select: (data) =>
      data?.banners?.length
        ? [...data.banners].sort((a, b) => a.displayOrder - b.displayOrder)
        : [],
  });
};
