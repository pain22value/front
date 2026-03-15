import api from "@/shared/api/axios";
import { ENDPOINTS } from "@/shared/api/endpoints";

// 목업 상태 시뮬레이션을 위한 전역 변수
let mockQueueState: QueueStatusResponse = {
  status: "WAITING",
  rank: 2500,
  waitingUserCount: 15000,
  expireTime: 0,
  pollingMs: 3000,
};

export const queueService = {
  enterQueue: async (showId: string | number) => {
    // 실제 API 연동 시
    // const { data } = await api.post<ApiResponse<string>>(ENDPOINTS.QUEUE.ENTER(showId));
    // return data.data;

    await new Promise((resolve) => setTimeout(resolve, 500));

    // 목업 초기화
    mockQueueState = {
      status: "WAITING",
      rank: 2014,
      waitingUserCount: 15000,
      expireTime: 0,
      pollingMs: 3000,
    };

    return "SUCCESS_QUEUE_ENTRY_MOCK";
  },

  getQueueStatus: async (showId: string | number): Promise<QueueStatusResponse> => {
    // 실제 API 연동 시
    // const { data } = await api.get<QueueStatusResponse>(ENDPOINTS.QUEUE.STATUS(showId));
    // return data;

    await new Promise((resolve) => setTimeout(resolve, 300));

    // 목업 로직 시뮬레이션: 순번이 점점 줄어듦
    if (mockQueueState.status === "WAITING") {
      const decrease = Math.floor(Math.random() * 100) + 150;
      mockQueueState.rank = Math.max(0, mockQueueState.rank - decrease);
      mockQueueState.waitingUserCount = Math.max(0, mockQueueState.waitingUserCount - decrease * 2);

      if (mockQueueState.rank === 0) {
        mockQueueState.status = "ADMITTED";
        mockQueueState.admissionToken = "MOCK_ADMISSION_TOKEN_" + Math.random().toString(36).substring(7);
        mockQueueState.expireTime = Date.now() + 600000; // 10분 후 만료
      }
    }

    return { ...mockQueueState };
  },
};
