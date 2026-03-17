import { useQuery } from "@tanstack/react-query";
import { actorService } from "../services/actorService";

export const useActor = (actorId: number | string) => {
  return useQuery({
    queryKey: ["actor", actorId],
    queryFn: () => actorService.getActorDetail(actorId),
    enabled: !!actorId,
    retry: 1,
  });
};
