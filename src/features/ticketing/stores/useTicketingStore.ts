import { create } from "zustand";

type TicketingState = {
  admissionToken: string | null;
  showId: string | number | null;
  setAdmissionToken: (token: string | null, showId: string | number | null) => void;
  clearTicketing: () => void;
};

export const useTicketingStore = create<TicketingState>((set) => ({
  admissionToken: null,
  showId: null,
  setAdmissionToken: (token, showId) => set({ admissionToken: token, showId: showId }),
  clearTicketing: () => set({ admissionToken: null, showId: null }),
}));
