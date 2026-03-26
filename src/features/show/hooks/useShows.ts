import { useQuery } from "@tanstack/react-query";
import { showService } from "../services/showService";

export const useShows = (category: ShowCategory = "all") => {
  return useQuery({
    queryKey: ["shows", category],
    queryFn: () => showService.getShows({ category }),
    retry: 1,
  });
};

export const useArtistShows = (artistId: string, category?: ShowCategory) => {
  return useQuery({
    queryKey: ["shows", "artist", artistId, category],
    queryFn: () => showService.getShows({ artistId, category }),
    enabled: !!artistId,
    retry: 1,
  });
};
