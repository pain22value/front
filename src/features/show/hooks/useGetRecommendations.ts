import { useQuery } from "@tanstack/react-query";
import { showService } from "../services/showService";

export const useGetRecommendations = () => {
  return useQuery({
    queryKey: ["recommendations"],
    queryFn: showService.getRecommendations,
  });
};
