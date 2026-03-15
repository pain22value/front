import { useQuery } from "@tanstack/react-query";
import { showService } from "../services/showService";

export const useRecommendShows = () => {
  return useQuery({
    queryKey: ["recommendations"],
    queryFn: showService.getRecommendedShows,
  });
};
