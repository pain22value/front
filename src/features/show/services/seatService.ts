// 백엔드한테 실제로 요청 보내는 파일
import api from "@/shared/api/axios";
import { ENDPOINTS } from "@/shared/api/endpoints";

// 좌석 목록 조회
const getSeatList = async (showId: number) => {
  const { data } = await api.get<ApiResponse<SeatSection[]>>(
    `${ENDPOINTS.SEATS.LIST}/${showId}/seats`
  );
  return data.data;
};

// 좌석 임시 점유
const reserveSeat = async (showId: number, seatId: string) => {
  const { data } = await api.post<ApiResponse<SeatReserveResponse>>(
    `${ENDPOINTS.SEATS.RESERVE}/${showId}/seats/${seatId}/reserve`
  );
  return data.data;
};

// 좌석 임시 점유 취소
const cancelReserveSeat = async (showId: number, seatId: string) => {
  const { data } = await api.delete<ApiResponse<null>>(
    `${ENDPOINTS.SEATS.RESERVE}/${showId}/seats/${seatId}/reserve`
  );
  return data.data;
};

export const seatService = { getSeatList, reserveSeat, cancelReserveSeat };