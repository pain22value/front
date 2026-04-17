import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { jwtDecode } from "jwt-decode";
import { ENABLE_AI_CHALLENGE } from "../config";

type AdmissionTokenPayload = {
  sub: string;
  // queue/ticketing 백엔드에서 show_id 클레임에는 실제 공연 상세 showId가 아니라
  // 예매 진입 대상인 showScheduleId가 들어간다.
  show_id: string | number;
  token_type: string;
  exp: number;
};

type TicketingState = {
  admissionToken: string | null;
  showId: string | number | null;
  scheduleId: number | null;
  expiresAt: number | null;
  sessionToken: string | null;
  challengeFlowSessionId: string | null;
  challengeModule: string | null;
  challengeType: string | null;
  challengeConfig: Record<string, unknown> | null;
  challengeComplete: boolean;
  challengeBlocked: boolean;
  setAdmissionToken: (token: string | null) => void;
  setSessionToken: (token: string | null) => void;
  setScheduleId: (id: number | null) => void;
  setChallengeState: (payload: {
    flowSessionId: string | null;
    module: string | null;
    challengeType: string | null;
    challengeConfig: Record<string, unknown> | null;
  }) => void;
  setChallengeComplete: (value: boolean) => void;
  setChallengeBlocked: (value: boolean) => void;
  resetChallenge: () => void;
  clearTicketing: () => void;
  hasValidAdmissionToken: (currentShowId: string | number, currentScheduleId?: string | number | null) => boolean;
  getIsValid: (currentShowId: string | number, currentScheduleId?: string | number | null) => boolean;
};


export const useTicketingStore = create<TicketingState>()(
  persist(
    (set, get) => ({
      admissionToken: null,
      showId: null,
      scheduleId: null,
      expiresAt: null,
      sessionToken: null,
      challengeFlowSessionId: null,
      challengeModule: null,
      challengeType: null,
      challengeConfig: null,
      challengeComplete: false,
      challengeBlocked: false,

      setAdmissionToken: (token) => {
        if (!token) {
          set({
            admissionToken: null,
            showId: null,
            scheduleId: null,
            expiresAt: null,
            sessionToken: null,
            challengeFlowSessionId: null,
            challengeModule: null,
            challengeType: null,
            challengeConfig: null,
            challengeComplete: false,
            challengeBlocked: false,
          });
          return;
        }
        try {
          const decoded = jwtDecode<AdmissionTokenPayload>(token);
          const decodedScheduleId = Number(decoded.show_id);
          console.log({ decoded });
          set({
            admissionToken: token,
            showId: decoded.show_id,
            scheduleId: Number.isNaN(decodedScheduleId) ? null : decodedScheduleId,
            expiresAt: decoded.exp * 1000,
            sessionToken: null,
            challengeFlowSessionId: null,
            challengeModule: null,
            challengeType: null,
            challengeConfig: null,
            challengeComplete: false,
            challengeBlocked: false,
          });
        } catch (error) {
          console.error("입장 토큰 디코딩 실패:", error);
          set({
            admissionToken: null,
            showId: null,
            scheduleId: null,
            expiresAt: null,
            sessionToken: null,
            challengeFlowSessionId: null,
            challengeModule: null,
            challengeType: null,
            challengeConfig: null,
            challengeComplete: false,
            challengeBlocked: false,
          });
        }
      },

      setSessionToken: (token) => {
        set({ sessionToken: token });
      },

      setScheduleId: (id) => {
        set({ scheduleId: id });
      },

      setChallengeState: ({ flowSessionId, module, challengeType, challengeConfig }) =>
        set({
          challengeFlowSessionId: flowSessionId,
          challengeModule: module,
          challengeType,
          challengeConfig,
          challengeComplete: false,
          challengeBlocked: false,
        }),

      setChallengeComplete: (value) => set({ challengeComplete: value }),

      setChallengeBlocked: (value) => set({ challengeBlocked: value }),

      resetChallenge: () =>
        set({
          challengeFlowSessionId: null,
          challengeModule: null,
          challengeType: null,
          challengeConfig: null,
          challengeComplete: false,
          challengeBlocked: false,
        }),

      clearTicketing: () =>
        set({
          admissionToken: null,
          showId: null,
          scheduleId: null,
          expiresAt: null,
          sessionToken: null,
          challengeFlowSessionId: null,
          challengeModule: null,
          challengeType: null,
          challengeConfig: null,
          challengeComplete: false,
          challengeBlocked: false,
        }),


      hasValidAdmissionToken: (currentShowId: string | number, currentScheduleId?: string | number | null) => {
        const { admissionToken, showId, scheduleId, expiresAt } = get();
        if (!admissionToken || !expiresAt) return false;
        const isNotExpired = expiresAt > Date.now();
        // admission token의 show_id는 실제로 showScheduleId이므로
        // challenge/seat 진입 검증도 scheduleId 기준으로 맞춘다.
        const tokenScheduleId = scheduleId ?? (showId != null ? Number(showId) : null);
        const isSameSchedule =
          currentScheduleId == null || tokenScheduleId == null
            ? true
            : String(tokenScheduleId) === String(currentScheduleId);
        return isNotExpired && isSameSchedule;
      },

      getIsValid: (currentShowId: string | number, currentScheduleId?: string | number | null) => {
        const { challengeComplete, hasValidAdmissionToken } = get();
        return (
          hasValidAdmissionToken(currentShowId, currentScheduleId) &&
          (!ENABLE_AI_CHALLENGE || challengeComplete)
        );
      },
    }),
    {
      name: "ticketing-storage",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
