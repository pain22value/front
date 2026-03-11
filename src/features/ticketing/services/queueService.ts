// 목업 상태 시뮬레이션을 위한 전역 변수
let mockQueueState = {
  position: 2500,
  progress: 0,
  waitingCount: 15000,
  reservationRate: 89,
};

export const queueService = {
  enterQueue: async (queueId: string | number) => {
    try {
      const res = await fetch(`/api/queue/${queueId}/enter`, { method: "POST" });
      if (!res.ok) {
        console.warn("대기열 진입 API 실패. 목업으로 진행합니다.");
      }
    } catch (error) {
      console.warn("대기열 진입 요청 에러. 목업으로 진행합니다.");
    }
    // 목업 초기화
    mockQueueState = {
      position: 2014,
      progress: 12,
      waitingCount: 15000,
      reservationRate: 89,
    };
  },
  getQueueStatus: async (queueId: string | number): Promise<QueueStatusResponse> => {
    try {
      const res = await fetch(`/api/queue/${queueId}/status`);
      if (res.ok) {
        return res.json();
      }
    } catch (error) {
      // 에러 시 바로 목업 처리로 넘어감
    }

    // 목업 로직 시뮬레이션
    const decrease = Math.floor(Math.random() * 100) + 50;
    mockQueueState.position = Math.max(0, mockQueueState.position - decrease);
    const totalStart = 2500;
    mockQueueState.progress = Math.min(100, ((totalStart - mockQueueState.position) / totalStart) * 100);
    mockQueueState.waitingCount = Math.max(0, mockQueueState.waitingCount - decrease);

    return { ...mockQueueState };
  },
};
