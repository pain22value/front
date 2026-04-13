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
export function useArtistComments(postId: number | null) {
  return useQuery({
    queryKey: ["artistComments", postId],
    queryFn: () => artistPostService.getComments(postId!),
    enabled: !!postId,
  });
}
