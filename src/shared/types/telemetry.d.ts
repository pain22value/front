// 봇 탐지를 위한 텔레메트리 데이터 타입 정의
type PageStage = "captcha" | "queue" | "seatmap" | "hold" | "checkout" | "payment" | "other";

// 5~10초 주기 집계용 텔레메트리 페이로드 구조체
interface ClientTelemetryData {
  session_id: string; // 티켓팅 화면 접속 시 랜덤 발급되는 세션 ID
  page_stage: PageStage; // 현재 티켓팅 진행 단계
  ts_ms_client: number; // 이벤트 수집 시점의 클라이언트 시간
  duration_ms: number; // 집계 대상 기간 (마지막 전송으로부터 경과 시간)
  user_id_client?: string; // (선택) 회원 ID
  device_id_client?: string; // (선택) 로컬 유지되는 랜덤 기기 식별값
  mousemove_count: number; // 기간 내 마우스 움직임 횟수
  mousemove_teleport_count: number; // 기간 내 비정상적인 마우스 순간이동 감지 횟수
  hover_dwell_ms: number; // 마우스가 멈춰있던 시간 누적치 (Hover 상태 머문 시간)
  click_count: number; // 기간 내 마우스 클릭 횟수
  keyboard_event_count?: number; // (선택) 키 다이나믹스 혹은 키 입력 횟수
  page_stay_ms?: number; // (선택) 해당 페이지에 머문 총 누적 시간
  window_blur_count?: number; // (선택) 브라우저 포커스를 잃은 횟수 (매크로, 일괄실행 의심용)
  user_agent?: string; // (선택) 브라우저 종류/정보
  viewport?: string; // (선택) 브라우저 화면 해상도
}
