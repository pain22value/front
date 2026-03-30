import api from "@/shared/api/axios";
import { ENDPOINTS } from "@/shared/api/endpoints";
import { useTicketingStore } from "@/features/ticketing/stores/useTicketingStore";

const withScheduleId = (path: string, id: number) =>
  path.replace(":showScheduleId", String(id));

const sessionHeader = (token: string) => ({
  "X-Session-Ticket": token,
});

// ─── 타입 ─────────────────────────────────────────────────────

export interface ShowInfo {
  title: string;
  venueName: string;
  startAt: string;
}

export interface ApiSeat {
  scheduledSeatId: number;  // seatId → scheduledSeatId
  col: number;
  status: "AVAILABLE" | "HELD" | "HOLD" | "SOLD"; 
}

export interface ApiRow {
  row: string;
  seats: ApiSeat[];
}

export interface ApiSection {
  sectionId: number;
  sectionName: string;
  grade: string;
  price: number;
  rows: ApiRow[];
}

// ─── API 함수 ─────────────────────────────────────────────────

// 티켓팅 입장해서 세션 토큰 발급받기
const enter = async (
  showScheduleId: number,
): Promise<{ sessionToken: string; expireIn: number } | null> => {
  const admissionToken = useTicketingStore.getState().admissionToken; // store에서 가져오기
  
  const { data } = await api.post<ApiResponse<{ sessionToken: string; expireIn: number }>>(
    withScheduleId(ENDPOINTS.SEATS.ENTER, showScheduleId),
    {},
    { headers: { "X-Admission-Token": admissionToken ?? "" } } // 하드코딩 빼기
  );
  return data.data;
};

// 좌석 배치도 조회
const getSeatList = async (
  showScheduleId: number,
): Promise<ApiSection[] | null> => {
  const enterResult = await enter(showScheduleId);
  if (!enterResult) return null;

  // sessionToken store에 저장
  useTicketingStore.getState().setSessionToken(enterResult.sessionToken);

  const { data } = await api.get<ApiResponse<{ sections: ApiSection[] }>>(
    withScheduleId(ENDPOINTS.SEATS.LIST, showScheduleId),
    { headers: sessionHeader(enterResult.sessionToken) }
  );
  return data.data?.sections ?? null;
};

// 공연 기본 정보 조회
const getShowInfo = async (
  showScheduleId: number,
): Promise<ShowInfo | null> => { 
  const sessionToken = useTicketingStore.getState().sessionToken ?? "";
  const { data } = await api.get<ApiResponse<ShowInfo>>(
    withScheduleId(ENDPOINTS.SEATS.SHOW_INFO, showScheduleId),
    { headers: sessionHeader(sessionToken) }
  );
  return data.data;
};

// 좌석 선점 (최대 4개)
const holdSeats = async (
  showScheduleId: number,
  seatIds: number[],
): Promise<string | null> => {
  // store에서 sessionToken 가져오기
  const sessionToken = useTicketingStore.getState().sessionToken ?? "";

  const { data } = await api.post<ApiResponse<string>>(
    withScheduleId(ENDPOINTS.SEATS.HOLD, showScheduleId),
    { scheduledSeatIds: seatIds },
    { headers: sessionHeader(sessionToken) }
  );
  return data.data;
};

// 좌석 선점 취소
const releaseSeats = async (
  showScheduleId: number,
  seatIds: number[],
): Promise<string | null> => {
  const sessionToken = useTicketingStore.getState().sessionToken ?? "";

  const { data } = await api.delete<ApiResponse<string>>(
    withScheduleId(ENDPOINTS.SEATS.RELEASE, showScheduleId),
    {
      headers: sessionHeader(sessionToken),
      data: { scheduledSeatIds: seatIds },
    }
  );
  return data.data;
};

// 세션 heartbeat (연장)
const heartbeat = async (
  showScheduleId: number,
): Promise<void> => {
  const sessionToken = useTicketingStore.getState().sessionToken ?? "";
  await api.post(
    withScheduleId(ENDPOINTS.SEATS.HEARTBEAT, showScheduleId),
    {},
    { headers: sessionHeader(sessionToken) }
  );
};

export const seatService = {
  enter,
  getSeatList,
  getShowInfo,
  holdSeats,
  releaseSeats,
  heartbeat,
};