// 댓글 관련 타입

type CommentFilter = "ALL" | "MINE" | "ARTIST";

type ArtistComment = {
  commentId: number;
  createdAt: string;
  authorName: string;
  authorThumbnailUrl: string;
  content: string;
  likeCount: number;
  likedByMe: boolean;
  replyCount: number;
  isMine: boolean;
  isArtist: boolean;
  replies?: ArtistComment[];
};

type ArtistCommentData = {
  summary: {
    totalCount: number;
    myCount: number;
    artistCount: number;
  };
  comments: ArtistComment[];
};

// 기존 목업용 타입 유지 (필요한 경우)
type CommentData = {
  id: number;
  author: string;
  avatarUrl?: string;
  isArtist: boolean;
  content: string;
  date: string;
  likes: number;
  replies: number;
  mention?: string;
};
