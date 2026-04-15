"use client";

import { useQuery } from "@tanstack/react-query";
import { artistPostService } from "../services/artistPostService";

// 포스트 목록 페칭 훅
export function useArtistPosts(artistId: string) {
  return useQuery({
    queryKey: ["artistPosts", artistId],
    queryFn: () => artistPostService.getPosts(artistId),
    enabled: !!artistId,
  });
}

// 포스트 상세 페칭 훅
export function useArtistPostDetail(postId: number | null) {
  return useQuery({
    queryKey: ["artistPostDetail", postId],
    queryFn: () => artistPostService.getPostDetail(postId!),
    enabled: !!postId,
  });
}

// 댓글 목록 페칭 훅
export function useArtistComments(artistId: string | number, postId: number | null, filter: CommentFilter = "ALL") {
  return useQuery({
    queryKey: ["artistComments", artistId, postId, filter],
    queryFn: () => artistPostService.getComments(artistId, postId!, filter),
    enabled: !!artistId && !!postId,
  });
}

// 댓글 답글 목록 페칭 훅
export function useArtistCommentReplies(artistId: string | number, postId: number | string, commentId: number | null) {
  return useQuery({
    queryKey: ["artistCommentReplies", artistId, postId, commentId],
    queryFn: () => artistPostService.getCommentReplies(artistId, postId, commentId!),
    enabled: !!artistId && !!postId && !!commentId,
  });
}
