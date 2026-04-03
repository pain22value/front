import { create } from "zustand";

type ArtistPostState = {
  selectedPostId: number | null; // 선택된 포스트 ID (null이면 목록 표시)
  selectPost: (postId: number) => void;
  clearPost: () => void;
};

export const useArtistPostStore = create<ArtistPostState>()((set) => ({
  selectedPostId: null,
  selectPost: (postId) => set({ selectedPostId: postId }),
  clearPost: () => set({ selectedPostId: null }),
}));
