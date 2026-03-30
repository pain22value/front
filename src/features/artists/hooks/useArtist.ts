import { useQuery } from "@tanstack/react-query";
import { artistService } from "../services/artistService";

export const useArtistDetail = (artistId: number | string) => {
  return useQuery({
    queryKey: ["artist", artistId],
    queryFn: () => artistService.getArtistDetail(artistId),
    enabled: !!artistId,
    retry: 1,
  });
};

export const useArtistPastShows = (artistId: number | string, page = 0, size = 10) => {
  return useQuery({
    queryKey: ["artist", artistId, "past-shows", page, size],
    queryFn: () => artistService.getPastShows(artistId, page, size),
    enabled: !!artistId,
    retry: 1,
  });
};
