import { useQuery } from "@tanstack/react-query";
import { showService } from "../services/showService";

export const useShows = (category: ShowCategory = "all") => {
  return useQuery({
    queryKey: ["shows", category],
    queryFn: () => showService.getShows({ category }),
    retry: 1,
  });
};

export const useActorShows = (actorId: string, category?: ShowCategory) => {
  return useQuery({
    queryKey: ["shows", "actor", actorId, category],
    queryFn: () => showService.getShows({ actorId, category }),
    enabled: !!actorId,
    retry: 1,
  });
};
