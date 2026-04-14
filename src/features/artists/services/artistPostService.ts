import api from "@/shared/api/axios";
import { ENDPOINTS } from "@/shared/api/endpoints";

export const artistPostService = {
  // 아티스트 포스트 목록 가져오기
  getPosts: async (artistId: string | number) => {
    // const { data } = await api.get<ApiResponse<ArtistBoardData>>(ENDPOINTS.ARTISTS.BOARD(artistId));
    // if (!data.data) throw new Error("게시글을 불러오는데 실패했습니다.");
    // return data.data.posts;

    // API 지연 시뮬레이션
    await new Promise((resolve) => setTimeout(resolve, 800));

    return [
      {
        postId: 1,
        artistName: "고은성",
        artistThumbnailUrl: "https://picsum.photos/seed/artist/100/100",
        createdAt: "2026-03-24T13:32:00Z",
        content: "데스노트 무대 인사: 3/10(화) 공연 종료 후 참여해주신 모든 분들 감사합니다!",
        imageUrls: [
          "https://picsum.photos/seed/post1_1/600/600",
          "https://picsum.photos/seed/post1_2/600/600",
          "https://picsum.photos/seed/post1_3/600/600",
          "https://picsum.photos/seed/post1_4/600/600",
        ],
        likeCount: 1200,
        commentCount: 450,
        likedByMe: true,
      },
      {
        postId: 2,
        artistName: "고은성",
        artistThumbnailUrl: "https://picsum.photos/seed/artist/100/100",
        createdAt: "2026-03-23T18:15:00Z",
        content: "오늘 공연도 즐거웠습니다! 모두 조심해서 들어가세요. 내일 또 만나요!",
        imageUrls: ["https://picsum.photos/seed/post2_1/600/600", "https://picsum.photos/seed/post2_2/600/600"],
        likeCount: 980,
        commentCount: 210,
        likedByMe: false,
      },
      {
        postId: 3,
        artistName: "고은성",
        artistThumbnailUrl: "https://picsum.photos/seed/artist/100/100",
        createdAt: "2026-03-20T10:00:00Z",
        content: "열심히 연습 중입니다. 기대해 주세요!",
        imageUrls: ["https://picsum.photos/seed/post3_1/600/600"],
        likeCount: 1500,
        commentCount: 320,
        likedByMe: true,
      },
    ];
  },

  // 포스트 상세 정보 가져오기
  getPostDetail: async (postId: number) => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return null;
  },

  // 댓글 목록 가져오기
  getComments: async (artistId: string | number, postId: number, filter: CommentFilter = "ALL") => {
    const { data } = await api.get<ApiResponse<ArtistCommentData>>(ENDPOINTS.ARTISTS.BOARD_COMMENTS(artistId, postId), {
      params: { filter },
    });
    if (!data.data) throw new Error("댓글을 불러오는데 실패했습니다.");
    return data.data;
  },
};
