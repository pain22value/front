import { useMutation, useQueryClient } from "@tanstack/react-query";
import { artistService } from "../services/artistService";

// 배우 좋아요 토글 훅
export const useArtistLike = (artistId: number, isLiked: boolean) => {
  const queryClient = useQueryClient();

  // 좋아요 등록
  const likeMutation = useMutation({
    mutationFn: () => artistService.likeArtist(artistId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["artist", artistId] });
    },
  });

  // 좋아요 취소
  const unlikeMutation = useMutation({
    mutationFn: () => artistService.unlikeArtist(artistId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["artist", artistId] });
    },
  });

  // 현재 좋아요 상태에 따라 토글
  const toggle = () => {
    if (isLiked) {
      unlikeMutation.mutate();
    } else {
      likeMutation.mutate();
    }
  };

  const isPending = likeMutation.isPending || unlikeMutation.isPending;

  return { toggle, isPending };
};
