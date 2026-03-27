// 대기열

type QueueStatus = "WAITING" | "ADMITTED" | "EXPIRED" | "READY";

type QueueStatusResponse = {
  status: QueueStatus;
  rank: number;
  admissionToken?: string;
  expireTime: number;
  waitingUserCount: number;
  pollingMs: number;
};
