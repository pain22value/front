import { useQuery } from "@tanstack/react-query";
import { showService } from "../services/showService";

export const useShows = (params?: ShowsListParams, category: ShowCategory = "all") => {
  return useQuery({
    queryKey: ["shows", category, params],
    queryFn: () => showService.getShows(params),
    retry: 1,
  });
};

export const useArtistShows = (artistId: string, category?: ShowCategory) => {
  return useQuery({
    queryKey: ["shows", "artist", artistId, category],
    // FIXME: getShows가 현재 ShowsListParams만 받도록 수정되어 artistId 기반 필터링이 안 될 수 있음
    queryFn: () => showService.getShows({ page: 1, size: 20 }), 
    enabled: !!artistId,
    retry: 1,
  });
};
