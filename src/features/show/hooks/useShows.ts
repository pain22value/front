import { useQuery } from "@tanstack/react-query";
import { showService } from "../services/showService";

export const useShows = (category: "all" | "now" | "tobe" | "closed") => {
  return useQuery({
    queryKey: ["shows", category],
    queryFn: () => showService.getShows(category),
  });
};
export const useActorShows = (actorId: number | string, category: "now" | "past") => {
  return useQuery({
    queryKey: ["shows", "actor", actorId, category],
    queryFn: () => showService.getShowsByActor(actorId, category),
  });
};
export const useActor = (actorId: number | string) => {
  return useQuery({
    queryKey: ["actor", actorId],
    queryFn: () => showService.getActorById(actorId),
  });
};
