import { useQuery, useMutation } from "@tanstack/react-query";
import { queueService } from "../services/queueService";

export const useEnterQueue = () => {
  return useMutation({
    mutationFn: (queueId: string | number) => queueService.enterQueue(queueId),
  });
};

export const useQueueStatus = (queueId: string | number) => {
  return useQuery<QueueStatusResponse>({
    queryKey: ["queueStatus", queueId],
    queryFn: () => queueService.getQueueStatus(queueId),
    refetchInterval: (query) => {
      // 대기 순서가 WAITING이 아니거나 rank가 0이 되면 폴링 중지
      if (query.state.data && (query.state.data.status !== "WAITING" || query.state.data.rank <= 0)) {
        return false;
      }
      return query.state.data?.pollingMs || 3000;
    },
  });
};
