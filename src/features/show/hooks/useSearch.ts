import { useQuery } from "@tanstack/react-query";
import { showService } from "../services/showService";

export const useSearch = (query: string) => {
  return useQuery({
    queryKey: ["search", query],
    queryFn: () => showService.search(query),
    enabled: !!query, // query가 있을 때만 쿼리 실행
  });
};
