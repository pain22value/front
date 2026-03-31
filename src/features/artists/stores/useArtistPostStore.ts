import { create } from "zustand";

interface ArtistPostState {
  selectedPostId: number | null; // 선택된 포스트 ID (null이면 목록 표시)
  selectPost: (postId: number) => void;
  clearPost: () => void;
}

export const useArtistPostStore = create<ArtistPostState>()((set) => ({
  selectedPostId: null,

  // 포스트 선택
  selectPost: (postId) => set({ selectedPostId: postId }),

  // 포스트 선택 해제 (목록으로 복귀)
  clearPost: () => set({ selectedPostId: null }),
}));
