import api from "@/shared/api/axios";
import { ENDPOINTS } from "@/shared/api/endpoints";

const MOCK_SESSION_TOKEN = "mock-session-token"; // 나중에 실제 토큰으로 교체

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
  seatId: number;
  col: number;
  status: "AVAILABLE" | "HELD" | "SOLD";
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

// 티켓팅 입장 → 세션 토큰 발급
const enter = async (
  showScheduleId: number,
  admissionToken: string
): Promise<{ sessionToken: string; expireIn: number } | null> => {
  const { data } = await api.post<ApiResponse<{ sessionToken: string; expireIn: number }>>(
    withScheduleId(ENDPOINTS.SEATS.ENTER, showScheduleId),
    {},
    { headers: { "X-Admission-Token": admissionToken } }
  );
  return data.data;
};

// 좌석 배치도 조회
const getSeatList = async (
  showScheduleId: number,
  sessionToken: string = MOCK_SESSION_TOKEN
): Promise<ApiSection[] | null> => {
  const { data } = await api.get<ApiResponse<{ sections: ApiSection[] }>>(
    withScheduleId(ENDPOINTS.SEATS.LIST, showScheduleId),
    { headers: sessionHeader(sessionToken) }
  );
  return data.data?.sections ?? null;  // sections 꺼내기
};

// 공연 기본 정보 조회
const getShowInfo = async (
  showScheduleId: number,
  sessionToken: string = MOCK_SESSION_TOKEN
): Promise<ShowInfo | null> => { 
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
  sessionToken: string = MOCK_SESSION_TOKEN
): Promise<string | null> => { 
  const { data } = await api.post<ApiResponse<string>>(
    withScheduleId(ENDPOINTS.SEATS.HOLD, showScheduleId),
    { seatIds },
    { headers: sessionHeader(sessionToken) }
  );
  return data.data;
};

// 좌석 선점 취소
const releaseSeats = async (
  showScheduleId: number,
  seatIds: number[],
  sessionToken: string = MOCK_SESSION_TOKEN
): Promise<string | null> => { 
  const { data } = await api.delete<ApiResponse<string>>(
    withScheduleId(ENDPOINTS.SEATS.RELEASE, showScheduleId),
    {
      headers: sessionHeader(sessionToken),
      data: { seatIds },
    }
  );
  return data.data;
};

// 세션 heartbeat (연장)
const heartbeat = async (
  showScheduleId: number,
  sessionToken: string = MOCK_SESSION_TOKEN
): Promise<void> => {
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