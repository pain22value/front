"use client";

// 실제 API 연동 대신 목업 데이터를 반환하는 서비스입니다.
export const artistPostService = {
  // 아티스트 포스트 목록 가져오기
  getPosts: async (artistId: string) => {
    // API 지연 시뮬레이션
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return [
      {
        id: 1,
        author: "고은성",
        date: "03. 24. 13:32",
        content: "데스노트 무대 인사: 3/10(화) 공연 종료 후",
        likes: 1200,
        comments: 450,
        images: ["/api/placeholder/400/400", "/api/placeholder/400/400", "/api/placeholder/400/400", "/api/placeholder/400/400"],
      },
      {
        id: 2,
        author: "고은성",
        date: "03. 23. 18:15",
        content: "오늘 공연도 즐거웠습니다! 모두 조심해서 들어가세요.",
        likes: 980,
        comments: 210,
        images: ["/api/placeholder/400/400", "/api/placeholder/400/400"],
      },
      {
        id: 3,
        author: "고은성",
        date: "03. 20. 10:00",
        content: "연습 중 한 컷!",
        likes: 1500,
        comments: 320,
        images: ["/api/placeholder/400/400"],
      },
    ];
  },

  // 포스트 상세 정보 가져오기
  getPostDetail: async (postId: number) => {
    await new Promise((resolve) => setTimeout(resolve, 800));
    return {
      id: postId,
      author: "고은성",
      date: "03. 24. 13:32",
      content: "데스노트 무대 인사: 3/10(화) 공연 종료 후",
      likes: 1200,
      comments: 450,
      images: ["/api/placeholder/400/400", "/api/placeholder/400/400", "/api/placeholder/400/400", "/api/placeholder/400/400"],
    };
  },

  // 댓글 목록 가져오기
  getComments: async (postId: number) => {
    await new Promise((resolve) => setTimeout(resolve, 700));
    return {
      totalCount: 12,
      mainComment: {
        author: "고은성",
        date: "03.25. 13:35",
        content: "화이팅",
        likes: 200,
        comments: 200,
      },
      replies: Array(6).fill({
        author: "김관우",
        date: "03.25. 13:35",
        content: "화이팅",
        likes: 1,
      }),
    };
  },
};
