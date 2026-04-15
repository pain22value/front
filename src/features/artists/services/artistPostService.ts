import api from "@/shared/api/axios";
import { ENDPOINTS } from "@/shared/api/endpoints";
import { MOCK_ARTIST_POSTS, MOCK_ARTIST_COMMENTS } from "@/shared/data/artistBoard";

export const artistPostService = {
  // 아티스트 포스트 목록 가져오기
  getPosts: async (artistId: string | number) => {
    // const { data } = await api.get<ApiResponse<ArtistBoardData>>(ENDPOINTS.ARTISTS.BOARD(artistId));
    // if (!data.data) throw new Error("게시글을 불러오는데 실패했습니다.");
    // return data.data.posts;

    // API 지연 시뮬레이션 (스켈레톤 확인용)
    await new Promise((resolve) => setTimeout(resolve, 800));

    return MOCK_ARTIST_POSTS;
  },

  // 포스트 상세 정보 가져오기
  getPostDetail: async (postId: number) => {
    // API 지연 시뮬레이션
    await new Promise((resolve) => setTimeout(resolve, 800));
    return MOCK_ARTIST_POSTS.find((p) => p.postId === postId) || null;
  },

  // 댓글 목록 가져오기
  getComments: async (artistId: string | number, postId: number, filter: CommentFilter = "ALL") => {
    // const { data } = await api.get<ApiResponse<ArtistCommentData>>(ENDPOINTS.ARTISTS.BOARD_COMMENTS(artistId, postId), {
    //   params: { filter },
    // });
    // if (!data.data) throw new Error("댓글을 불러오는데 실패했습니다.");
    // return data.data;

    // API 지연 시뮬레이션 (스켈레톤 확인용)
    await new Promise((resolve) => setTimeout(resolve, 800));

    let filteredComments = MOCK_ARTIST_COMMENTS.comments;
    if (filter === "MINE") {
      filteredComments = filteredComments.filter((c) => c.isMine);
    } else if (filter === "ARTIST") {
      filteredComments = filteredComments.filter((c) => c.isArtist);
    }

    return {
      summary: MOCK_ARTIST_COMMENTS.summary,
      comments: filteredComments,
    } as ArtistCommentData;
  },

  // 게시글 좋아요
  likePost: async (artistId: string | number, postId: number) => {
    // const { data } = await api.post(ENDPOINTS.ARTISTS.BOARD_LIKES(artistId, postId));
    // return data;

    await new Promise((resolve) => setTimeout(resolve, 300));
    const target = MOCK_ARTIST_POSTS.find((p) => p.postId === postId);
    if (target && !target.likedByMe) {
      target.likedByMe = true;
      target.likeCount += 1;
    }
    return { success: true };
  },

  // 게시글 좋아요 취소
  unlikePost: async (artistId: string | number, postId: number) => {
    // const { data } = await api.delete(ENDPOINTS.ARTISTS.BOARD_LIKES(artistId, postId));
    // return data;

    await new Promise((resolve) => setTimeout(resolve, 300));
    const target = MOCK_ARTIST_POSTS.find((p) => p.postId === postId);
    if (target && target.likedByMe) {
      target.likedByMe = false;
      target.likeCount -= 1;
    }
    return { success: true };
  },

  // 댓글 작성
  createComment: async (artistId: string | number, postId: number, content: string) => {
    // const { data } = await api.post(ENDPOINTS.ARTISTS.BOARD_COMMENTS(artistId, postId), { content });
    // return data;

    // API 지연 시뮬레이션
    await new Promise((resolve) => setTimeout(resolve, 500));

    const newComment = {
      commentId: Date.now(),
      createdAt: new Date().toISOString(),
      authorName: "현재 사용자",
      authorThumbnailUrl: "https://picsum.photos/seed/me/100/100",
      content,
      likeCount: 0,
      likedByMe: false,
      replyCount: 0,
      isMine: true,
      isArtist: false,
    };

    MOCK_ARTIST_COMMENTS.comments.push(newComment);
    MOCK_ARTIST_COMMENTS.summary.totalCount += 1;
    MOCK_ARTIST_COMMENTS.summary.myCount += 1;

    return { success: true };
  },

  // 댓글 좋아요
  likeComment: async (artistId: string | number, postId: number | string, commentId: number) => {
    // const { data } = await api.post(ENDPOINTS.ARTISTS.BOARD_COMMENT_LIKES(artistId, postId, commentId));
    // return data;

    await new Promise((resolve) => setTimeout(resolve, 300));
    const comment = MOCK_ARTIST_COMMENTS.comments.find((c) => c.commentId === commentId);
    if (comment && !comment.likedByMe) {
      comment.likedByMe = true;
      comment.likeCount += 1;
    }
    return { success: true };
  },

  // 댓글 좋아요 취소
  unlikeComment: async (artistId: string | number, postId: number | string, commentId: number) => {
    // const { data } = await api.delete(ENDPOINTS.ARTISTS.BOARD_COMMENT_LIKES(artistId, postId, commentId));
    // return data;

    await new Promise((resolve) => setTimeout(resolve, 300));
    const comment = MOCK_ARTIST_COMMENTS.comments.find((c) => c.commentId === commentId);
    if (comment && comment.likedByMe) {
      comment.likedByMe = false;
      comment.likeCount -= 1;
    }
    return { success: true };
  },

  // 댓글 답글 목록 가져오기
  getCommentReplies: async (artistId: string | number, postId: number | string, commentId: number) => {
    // const { data } = await api.get<{ code: string, message: string, data: { replies: ArtistComment[] } }>(ENDPOINTS.ARTISTS.BOARD_COMMENT_REPLIES(artistId, postId, commentId));
    // return data.data.replies;

    await new Promise((resolve) => setTimeout(resolve, 500));
    const comment = MOCK_ARTIST_COMMENTS.comments.find((c) => c.commentId === commentId);
    return comment?.replies ?? [];
  },

  // 답글 작성
  createReply: async (artistId: string | number, postId: number | string, commentId: number, content: string) => {
    // const { data } = await api.post(ENDPOINTS.ARTISTS.BOARD_COMMENT_REPLIES(artistId, postId, commentId), { content });
    // return data;

    await new Promise((resolve) => setTimeout(resolve, 500));
    const comment = MOCK_ARTIST_COMMENTS.comments.find((c) => c.commentId === commentId);
    if (comment) {
      const newReply: ArtistComment = {
        commentId: Date.now(),
        createdAt: new Date().toISOString(),
        authorName: "현재 사용자",
        authorThumbnailUrl: "https://picsum.photos/seed/me/100/100",
        content,
        likeCount: 0,
        likedByMe: false,
        replyCount: 0,
        isMine: true,
        isArtist: false,
      };
      if (!comment.replies) comment.replies = [];
      comment.replies.push(newReply);
      comment.replyCount += 1;
    }
    return { success: true };
  },
};
