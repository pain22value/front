import { create } from "zustand";
import { persist } from "zustand/middleware";

// 즐겨찾기 아티스트 정보 (배열에 있으면 = 좋아요 상태)
export interface FavoriteArtist {
  artistId: number;
  artistName: string;
  profileImageUrl?: string;
}

interface FavoriteState {
  favorites: FavoriteArtist[];
  // 즐겨찾기 추가
  addFavorite: (artist: FavoriteArtist) => void;
  // 즐겨찾기 제거
  removeFavorite: (artistId: number) => void;
  // 좋아요 여부 확인 (배열에 존재 여부로 판단)
  isFavorite: (artistId: number) => boolean;
}

export const useFavoriteStore = create<FavoriteState>()(
  persist(
    (set, get) => ({
      favorites: [],

      addFavorite: (artist) => {
        // 중복 방지: 이미 존재하면 추가하지 않음
        const alreadyExists = get().favorites.some((a) => a.artistId === artist.artistId);
        if (alreadyExists) return;
        set((state) => ({ favorites: [...state.favorites, artist] }));
      },

      removeFavorite: (artistId) => {
        set((state) => ({
          favorites: state.favorites.filter((a) => a.artistId !== artistId),
        }));
      },

      isFavorite: (artistId) => {
        return get().favorites.some((a) => a.artistId === artistId);
      },
    }),
    {
      name: "favorite-storage",
    }
  )
);
