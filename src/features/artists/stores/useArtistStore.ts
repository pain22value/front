import { create } from "zustand";
import { persist } from "zustand/middleware";

// 좋아요 아티스트 정보 (개발 편의를 위해 이름도 함께 저장)
interface LikedArtistInfo {
  isLiked: boolean;
  artistName: string;
  profileImageUrl?: string;
}

interface ArtistState {
  likes: Record<number, LikedArtistInfo>; // artistId: { isLiked, artistName, profileImageUrl }
  setArtistLike: (artistId: number, isLiked: boolean, artistName?: string, profileImageUrl?: string) => void;
  isArtistLiked: (artistId: number, defaultValue?: boolean) => boolean;
  getLikedArtists: () => Array<{ artistId: number } & LikedArtistInfo>;
}

export const useArtistStore = create<ArtistState>()(
  persist(
    (set, get) => ({
      likes: {},

      // 특정 아티스트의 좋아요 상태 설정 (이름, 이미지도 함께 저장)
      setArtistLike: (artistId, isLiked, artistName = "", profileImageUrl = "") => {
        set((state) => ({
          likes: {
            ...state.likes,
            [artistId]: {
              isLiked,
              artistName: artistName || state.likes[artistId]?.artistName || "",
              profileImageUrl: profileImageUrl || state.likes[artistId]?.profileImageUrl || "",
            },
          },
        }));
      },

      // 좋아요 여부 확인 (전역 상태에 없으면 defaultValue 반환)
      isArtistLiked: (artistId, defaultValue = false) => {
        const info = get().likes[artistId];
        return info !== undefined ? info.isLiked : defaultValue;
      },

      // 좋아요된 아티스트 목록 반환
      getLikedArtists: () => {
        const { likes } = get();
        return Object.entries(likes)
          .filter(([, info]) => info.isLiked)
          .map(([id, info]) => ({ artistId: Number(id), ...info }));
      },
    }),
    {
      name: "artist-storage",
    }
  )
);
