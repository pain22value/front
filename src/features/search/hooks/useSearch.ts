import { useQuery } from "@tanstack/react-query";
import { searchService } from "../services/searchService";

export const useSearch = (query: string) => {
  return useQuery({
    queryKey: ["search", query],
    queryFn: () => searchService.getSearchResults(query),
    enabled: !!query,
    retry: 1,
  });
};
