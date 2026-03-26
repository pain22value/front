import { artistService } from "@/features/artists/services/artistService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useArtistStore } from "@/features/artists/stores/useArtistStore";

/**
 * 아티스트 좋아요 토글 훅
 * @param artistId 아티스트 ID
 * @param isLiked 현재 좋아요 여부 (UI의 즉각적인 반영을 위해 컴포넌트에서 전달)
 */
export function useArtistLike(artistId: number, isLiked: boolean) {
  const queryClient = useQueryClient();
  const setArtistLike = useArtistStore((state) => state.setArtistLike);

  // 좋아요 등록
  const likeMutation = useMutation({
    mutationFn: () => artistService.likeArtist(artistId),
    onSuccess: () => {
      // 전역 상태 업데이트: 좋아요(true)
      setArtistLike(artistId, true);
      queryClient.invalidateQueries({ queryKey: ["artist", artistId] });
      queryClient.invalidateQueries({ queryKey: ["show"] });
    },
  });

  // 좋아요 취소
  const unlikeMutation = useMutation({
    mutationFn: () => artistService.unlikeArtist(artistId),
    onSuccess: () => {
      // 전역 상태 업데이트: 취소(false)
      setArtistLike(artistId, false);
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
