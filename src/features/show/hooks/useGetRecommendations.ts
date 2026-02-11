import { useQuery } from "@tanstack/react-query";
import { showService } from "../services/showService";
// import { recommendShows } from "@/shared/data/shows";

export const useGetRecommendations = () => {
  return useQuery({
    queryKey: ["recommendations"],
    queryFn: showService.getRecommendations,
    // placeholderData: recommendShows,
  });
};
