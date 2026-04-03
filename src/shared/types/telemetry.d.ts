// 봇 탐지를 위한 텔레메트리 데이터 타입 정의
type PageStage = "captcha" | "queue" | "seatmap" | "hold" | "checkout" | "payment" | "other";

type MouseMoveData = {
  timestamp: number;
  x: number;
  y: number;
};

// 5~10초 주기 집계용 텔레메트리 페이로드 구조체
type ClientTelemetryData = {
  page_stage: PageStage; // 현재 티켓팅 진행 단계
  mousemove: MouseMoveData[]; // mousemove 이벤트 배열
  mousemove_count: number; // 해당 세션/구간에서 발생한 전체 mousemove 이벤트 수
  viewport_width: number; // 사용자 화면 또는 브라우저 viewport의 가로 크기
  viewport_height: number; // 사용자 화면 또는 브라우저 viewport의 세로 크기
  page_enter_ts: number; // 해당 화면 또는 이벤트 구간에 진입한 시각
  page_leave_ts: number; // 해당 화면 또는 이벤트 구간에서 이탈한 시각
};

// 텔레메트리 상태 구조
type TelemetryState = {
  pageStage: PageStage; // 어떤 예매 프로세스 화면을 진행중인지
  isTracking: boolean; // 트래킹이 시작되어 10초마다 서버로 데이터를 발송하고 있는지
  setPageStage: (stage: PageStage) => void;
  startTracking: () => void;
  stopTracking: () => void;
};
