import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ArtistState {
  likes: Record<number, boolean>; // artistId: isLiked
  setArtistLike: (artistId: number, isLiked: boolean) => void;
  isArtistLiked: (artistId: number, defaultValue?: boolean) => boolean;
}

export const useArtistStore = create<ArtistState>()(
  persist(
    (set, get) => ({
      likes: {},

      // 특정 아티스트의 좋아요 상태 설정
      setArtistLike: (artistId, isLiked) => {
        set((state) => ({
          likes: {
            ...state.likes,
            [artistId]: isLiked,
          },
        }));
      },

      // 좋아요 여부 확인 (전역 상태에 없으면 defaultValue 반환)
      isArtistLiked: (artistId, defaultValue = false) => {
        const state = get().likes[artistId];
        return state !== undefined ? state : defaultValue;
      },
    }),
    {
      name: "artist-storage",
    }
  )
);
