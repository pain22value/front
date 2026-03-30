import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { jwtDecode } from "jwt-decode";

type AdmissionTokenPayload = {
  sub: string;
  show_id: string | number;
  token_type: string;
  exp: number;
};

type TicketingState = {
  admissionToken: string | null;
  showId: string | number | null;
  expiresAt: number | null;
  sessionToken: string | null; //  박영준 추가 0330
  setAdmissionToken: (token: string | null) => void;
  setSessionToken: (token: string | null) => void; // 박영준 추가 0330
  clearTicketing: () => void;
  getIsValid: (currentShowId: string | number) => boolean;
};

export const useTicketingStore = create<TicketingState>()(
  persist(
    (set, get) => ({
      admissionToken: null,
      showId: null,
      expiresAt: null,
      sessionToken: null, // 박영준 추가 0330

      setAdmissionToken: (token) => {
        if (!token) {
          set({ admissionToken: null, showId: null, expiresAt: null });
          return;
        }
        try {
          const decoded = jwtDecode<AdmissionTokenPayload>(token);
          set({
            admissionToken: token,
            showId: decoded.show_id,
            expiresAt: decoded.exp * 1000,
          });
        } catch (error) {
          console.error("입장 토큰 디코딩 실패:", error);
          set({ admissionToken: null, showId: null, expiresAt: null });
        }
      },

      setSessionToken: (token) => { // 박영준 추가 0330
        set({ sessionToken: token });
      },

      clearTicketing: () => set({
        admissionToken: null,
        showId: null,
        expiresAt: null,
        sessionToken: null, // 박영준 추가 0330
      }),

      getIsValid: (currentShowId: string | number) => {
        const { admissionToken, showId, expiresAt } = get();
        if (!admissionToken || !showId || !expiresAt) return false;
        const isNotExpired = expiresAt > Date.now();
        const isSameShow = String(showId) === String(currentShowId);
        return isNotExpired && isSameShow;
      },
    }),
    {
      name: "ticketing-storage",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);