// 게시글 (아티스트/뮤지컬)

type ArtistPost = {
  postId: number;
  createdAt: string;
  artistName: string;
  artistThumbnailUrl: string;
  content: string;
  imageUrls: string[];
  likeCount: number;
  commentCount: number;
  likedByMe: boolean;
};

type ArtistBoardData = {
  posts: ArtistPost[];
};
