import { useQuery } from "@tanstack/react-query";
import { seatService } from "../services/seatService";

export const useGetSeats = (showId: number) => {
  return useQuery({
    queryKey: ["seats", showId], // showId마다 다른 캐시로 저장
    queryFn: () => seatService.getSeatList(showId),
  });
};