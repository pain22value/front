import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { reviewService } from "../services/reviewService";

export const useReviews = (showId: number, page: number, size: number = 5) => {
  return useQuery({
    queryKey: ["reviews", showId, { page, size }],
    queryFn: () => reviewService.getReviews(showId, { page, size }),
    retry: 1,
  });
};

export const useReviewMeta = (showId: number) => {
  return useQuery({
    queryKey: ["reviews", "meta", showId],
    queryFn: () => reviewService.getReviewMeta(showId),
  });
};

export const usePostReview = (showId: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: ReviewPostRequest) => reviewService.postReview(showId, body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reviews", showId] });
      queryClient.invalidateQueries({ queryKey: ["reviews", "meta", showId] });
    },
  });
};
