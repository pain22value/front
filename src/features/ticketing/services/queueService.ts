import api from "@/shared/api/axios";
import { ENDPOINTS } from "@/shared/api/endpoints";

const enterQueue = async (scheduleId: string | number) => {
  const { data } = await api.post<ApiResponse<string>>(ENDPOINTS.QUEUE.ENTER(scheduleId));
  if (data.code !== "ok") throw new Error(data.message || "대기열 입장에 실패했습니다.");
  return data.data;
};

const getQueueStatus = async (scheduleId: string | number): Promise<QueueStatusResponse> => {
  const { data } = await api.get<ApiResponse<QueueStatusResponse>>(ENDPOINTS.QUEUE.STATUS(scheduleId));
  if (!data.data) throw new Error("대기열 정보를 불러올 수 없습니다.");
  return data.data;
};

const cancelQueue = async (scheduleId: string | number) => {
  const { data } = await api.delete<ApiResponse<string>>(ENDPOINTS.QUEUE.CANCEL(scheduleId));
  if (data.code !== "ok") throw new Error(data.message || "대기열 취소에 실패했습니다.");
  return data.data;
};


export const queueService = {
  enterQueue,
  getQueueStatus,
  cancelQueue,
};
