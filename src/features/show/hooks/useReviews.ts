import { useQuery } from "@tanstack/react-query";
import { showService } from "../services/showService";

export const useReviews = (page: number, sentiment: string) => {
  return useQuery({
    queryKey: ["reviews", { page, sentiment }],
    queryFn: () => showService.getReviews({ page, sentiment }),
  });
};
