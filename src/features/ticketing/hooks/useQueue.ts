import { useQuery, useMutation } from "@tanstack/react-query";
import { queueService } from "../services/queueService";

export const useEnterQueue = () => {
  return useMutation({
    mutationFn: (showId: string | number) => queueService.enterQueue(showId),
  });
};

export const useQueueStatus = (showId: string | number) => {
  return useQuery<QueueStatusResponse>({
    queryKey: ["queueStatus", showId],
    queryFn: () => queueService.getQueueStatus(showId),
    refetchInterval: (query) => {
      // 에러가 발생하면 폴링 중지
      if (query.state.error) return false;

      // 데이터가 아직 없으면 기본 3초 간격
      if (!query.state.data) return 3000;

      // 대기 상태가 WAITING인 경우에만 폴링 계속 진행
      if (query.state.data.status !== "WAITING") {
        return false;
      }

      // 서버에서 전달한 폴링 주기가 있으면 사용, 없으면 기본 3초
      return query.state.data.pollingMs || 3000;
    },
  });
};

export const useCancelQueue = () => {
  return useMutation({
    mutationFn: (showId: string | number) => queueService.cancelQueue(showId),
  });
};

