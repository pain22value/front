import { artistService } from "@/features/artists/services/artistService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useFavoriteStore } from "@/features/artists/stores/useFavoriteStore";

/**
 * 아티스트 좋아요 토글 훅
 * @param artistId 아티스트 ID
 * @param isLiked 현재 좋아요 여부
 * @param artistName 아티스트 이름 (store 저장용)
 * @param profileImageUrl 프로필 이미지 URL (store 저장용)
 */
export function useArtistLike(
  artistId: number,
  isLiked: boolean,
  artistName?: string,
  profileImageUrl?: string
) {
  const queryClient = useQueryClient();
  const { addFavorite, removeFavorite } = useFavoriteStore();

  // 좋아요 등록
  const likeMutation = useMutation({
    mutationFn: () => artistService.likeArtist(artistId),
    onSettled: () => {
      // API 성공/실패 무관하게 로컬 store 업데이트 (백엔드 없는 개발 환경 대응)
      addFavorite({ artistId, artistName: artistName ?? "", profileImageUrl });
      queryClient.invalidateQueries({ queryKey: ["artist", artistId] });
      queryClient.invalidateQueries({ queryKey: ["show"] });
    },
  });

  // 좋아요 취소
  const unlikeMutation = useMutation({
    mutationFn: () => artistService.unlikeArtist(artistId),
    onSettled: () => {
      // API 성공/실패 무관하게 로컬 store 업데이트 (백엔드 없는 개발 환경 대응)
      removeFavorite(artistId);
      queryClient.invalidateQueries({ queryKey: ["artist", artistId] });
      queryClient.invalidateQueries({ queryKey: ["show"] });
    },
  });

  // 현재 좋아요 상태에 따라 호출할 뮤테이션 결정
  const toggle = () => {
    if (isLiked) {
      unlikeMutation.mutate();
    } else {
      likeMutation.mutate();
    }
  };

  const isPending = likeMutation.isPending || unlikeMutation.isPending;

  return { toggle, isPending };
}
