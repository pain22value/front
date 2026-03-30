import { useQuery } from "@tanstack/react-query";
import { searchService } from "../services/searchService";

export const useSearch = (params: SearchParams) => {
  return useQuery({
    queryKey: ["search", params],
    queryFn: () => searchService.getSearchResults(params),
    enabled: !!params.keyword,
    retry: 1,
  });
};
