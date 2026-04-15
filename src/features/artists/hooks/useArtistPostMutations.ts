import { useMutation, useQueryClient } from "@tanstack/react-query";
import { artistPostService } from "../services/artistPostService";

// 게시글 좋아요 훅
export function useLikeArtistPost(artistId: string | number) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (postId: number) => artistPostService.likePost(artistId, postId),
    onSuccess: () => {
      // 좋아요 성공 시 포스트 목록 무효화하여 데이터 다시 불러오기
      queryClient.invalidateQueries({ queryKey: ["artistPosts", artistId] });
    },
  });
}

// 게시글 좋아요 취소 훅
export function useUnlikeArtistPost(artistId: string | number) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (postId: number) => artistPostService.unlikePost(artistId, postId),
    onSuccess: () => {
      // 좋아요 취소 시 포스트 목록 무효화하여 데이터 다시 불러오기
      queryClient.invalidateQueries({ queryKey: ["artistPosts", artistId] });
    },
  });
}

// 아티스트 게시판 댓글 작성 훅
export function useCreateArtistComment(artistId: string | number, postId: number) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (content: string) => artistPostService.createComment(artistId, postId, content),
    onSuccess: () => {
      // 댓글 작성 완료 시 해당 게시글의 댓글 목록과 포스트 목록 무효화 (댓글 수 업데이트 등)
      queryClient.invalidateQueries({ queryKey: ["artistComments", artistId, postId] });
      queryClient.invalidateQueries({ queryKey: ["artistPosts", artistId] });
    },
  });
}

// 아티스트 게시판 답글 작성 훅
export function useCreateArtistReply(commentId: number) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (content: string) => artistPostService.createReply(commentId, content),
    onSuccess: () => {
      // 답글 작성 완료 시 해당 댓글의 답글 목록 무효화
      queryClient.invalidateQueries({ queryKey: ["artistCommentReplies", commentId] });
    },
  });
}
