import { create } from "zustand";

export const useModalStore = create<ModalStore>((set) => ({
  confirm: null,
  alert: null,
  openConfirm: (options) => set({ confirm: { open: true, ...options } }),
  openAlert: (options) => set({ alert: { open: true, ...options } }),
  closeConfirm: () => set({ confirm: null }),
  closeAlert: () => set({ alert: null }),
  closeAll: () => set({ confirm: null, alert: null }),
}));
