import { useQuery } from "@tanstack/react-query";
import { showService } from "../services/showService";

export const useSchedules = (date: Date | undefined) => {
  return useQuery<ShowSchedule[]>({
    queryKey: ["schedules", date],
    queryFn: () => showService.getSchedules(date),
    enabled: !!date,
  });
};
