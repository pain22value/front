// 대기열

type QueueStatus = "WAITING" | "ADMITTED" | "EXPIRED";

type QueueStatusResponse = {
  status: QueueStatus;
  rank: number;
  admissionToken?: string;
  expireTime: number;
  waitingUserCount: number;
  pollingMs: number;
};
