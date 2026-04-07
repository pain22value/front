import { create } from "zustand";


export const useArtistStore = create<ArtistState>()((set) => ({
  activeTab: "intro",
  selectedPostId: null,
  setActiveTab: (tab) => set({ activeTab: tab }),
  selectPost: (postId) => set({ selectedPostId: postId }),
  clearPost: () => set({ selectedPostId: null }),
}));
