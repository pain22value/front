import { create } from "zustand";
import { persist } from "zustand/middleware";


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
