import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

// 토스 결제 수단 타입 (hook 수입 방지용 재정의)
export type PayMethod = "CARD" | "VIRTUAL_ACCOUNT";

type MembershipStep = 1 | 2 | 3 | 4;

interface MembershipState {
  currentStep: MembershipStep;
  
  // 결제 정보 (Toss 및 승인 요청용)
  orderId: string;
  amount: number;
  paymentMethod: PayMethod;
  paymentKey: string;

  // Actions
  setStep: (step: MembershipStep) => void;
  setPaymentInfo: (info: Partial<Pick<MembershipState, "orderId" | "amount" | "paymentMethod" | "paymentKey">>) => void;
  reset: () => void;
}

export const useArtistMembershipStore = create<MembershipState>()(
  persist(
    (set) => ({
      currentStep: 1,
      orderId: "",
      amount: 5000,
      paymentMethod: "CARD",
      paymentKey: "",

      setStep: (step) => set({ currentStep: step }),
      setPaymentInfo: (info) => set((state) => ({ ...state, ...info })),
      reset: () =>
        set({
          currentStep: 1,
          orderId: "",
          amount: 5000,
          paymentMethod: "CARD",
          paymentKey: "",
        }),
    }),
    {
      name: "artist-membership-storage",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
