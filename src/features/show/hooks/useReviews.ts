import { useQuery } from "@tanstack/react-query";
import { reviewService } from "../services/reviewService";

export const useReviews = (page: number, sentiment: string) => {
  return useQuery({
    queryKey: ["reviews", { page, sentiment }],
    queryFn: () => reviewService.getReviews({ page, sentiment }),
  });
};
