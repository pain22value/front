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
export function useCreateArtistReply(artistId: string | number, postId: number | string, commentId: number) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (content: string) => artistPostService.createReply(artistId, postId, commentId, content),
    onSuccess: () => {
      // 답글 작성 완료 시 해당 댓글의 답글 목록 무효화
      queryClient.invalidateQueries({ queryKey: ["artistCommentReplies", artistId, postId, commentId] });
      queryClient.invalidateQueries({ queryKey: ["artistComments", artistId, postId] });
    },
  });
}

// 아티스트 게시판 댓글 좋아요 훅
export function useLikeArtistComment(artistId: string | number, postId: number | string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (commentId: number) => artistPostService.likeComment(artistId, postId, commentId),
    onMutate: async (commentId) => {
      await queryClient.cancelQueries({ queryKey: ["artistComments", artistId, postId] });
      const previousData = queryClient.getQueriesData({ queryKey: ["artistComments", artistId, postId] });

      type OptComment = { commentId: number; likedByMe: boolean; likeCount: number; replies?: OptComment[] };
      type OptData = { summary: unknown; comments: OptComment[] };

      queryClient.setQueriesData({ queryKey: ["artistComments", artistId, postId] }, (oldData: unknown) => {
        const data = oldData as OptData | undefined;
        if (!data || !data.comments) return data;
        
        const updateCommentRecursively = (comments: OptComment[]): OptComment[] => {
          return comments.map((comment) => {
            if (comment.commentId === commentId) {
              return { ...comment, likedByMe: true, likeCount: comment.likeCount + 1 };
            }
            if (comment.replies) {
              return { ...comment, replies: updateCommentRecursively(comment.replies) };
            }
            return comment;
          });
        };

        return { ...data, comments: updateCommentRecursively(data.comments) };
      });

      return { previousData };
    },
    onError: (err, commentId, context) => {
      if (context?.previousData) {
        context.previousData.forEach(([queryKey, data]) => {
          queryClient.setQueryData(queryKey, data);
        });
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["artistComments", artistId, postId] });
    },
  });
}

// 아티스트 게시판 댓글 좋아요 취소 훅
export function useUnlikeArtistComment(artistId: string | number, postId: number | string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (commentId: number) => artistPostService.unlikeComment(artistId, postId, commentId),
    onMutate: async (commentId) => {
      await queryClient.cancelQueries({ queryKey: ["artistComments", artistId, postId] });
      const previousData = queryClient.getQueriesData({ queryKey: ["artistComments", artistId, postId] });

      type OptComment = { commentId: number; likedByMe: boolean; likeCount: number; replies?: OptComment[] };
      type OptData = { summary: unknown; comments: OptComment[] };

      queryClient.setQueriesData({ queryKey: ["artistComments", artistId, postId] }, (oldData: unknown) => {
        const data = oldData as OptData | undefined;
        if (!data || !data.comments) return data;
        
        const updateCommentRecursively = (comments: OptComment[]): OptComment[] => {
          return comments.map((comment) => {
            if (comment.commentId === commentId) {
              return { ...comment, likedByMe: false, likeCount: Math.max(0, comment.likeCount - 1) };
            }
            if (comment.replies) {
              return { ...comment, replies: updateCommentRecursively(comment.replies) };
            }
            return comment;
          });
        };

        return { ...data, comments: updateCommentRecursively(data.comments) };
      });

      return { previousData };
    },
    onError: (err, commentId, context) => {
      if (context?.previousData) {
        context.previousData.forEach(([queryKey, data]) => {
          queryClient.setQueryData(queryKey, data);
        });
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["artistComments", artistId, postId] });
    },
  });
}
