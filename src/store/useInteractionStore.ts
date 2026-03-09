import { create } from "zustand";

interface InteractionState {
  isTicketingFlow: boolean;
  startTicketingFlow: () => void;
  stopTicketingFlow: () => void;
}

export const useInteractionStore = create<InteractionState>((set) => ({
  isTicketingFlow: false,
  startTicketingFlow: () => set({ isTicketingFlow: true }),
  stopTicketingFlow: () => set({ isTicketingFlow: false }),
}));
