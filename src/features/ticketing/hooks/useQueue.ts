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
      // 대기 순서가 0 이하가 되면 폴링 중지
      if (query.state.data && query.state.data.position <= 0) {
        return false;
      }
      return 1000;
    },
  });
};
