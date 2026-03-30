import { useQuery } from "@tanstack/react-query";
import { homeService } from "../services/home.service";

export const useHomePromotions = () => {
  return useQuery({
    queryKey: ["homePromotions"],
    queryFn: () => homeService.getHomePromotions(),
    staleTime: 1000 * 60 * 60, // 1시간
    retry: 1,
    select: (data) => (data?.shows?.length ? [...data.shows].sort((a, b) => a.displayOrder - b.displayOrder) : []),
  });
};
