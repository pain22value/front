// 댓글 데이터 인터페이스
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
