// 리뷰

type Review = {
  id: number;
  title: string;
  content: string;
  date: string;
  author: string;
  round?: string;
  sentiment: "좋았어요" | "아쉬워요" | string;
};

type ReviewListResponse = {
  reviews: Review[];
  totalPages: number;
  currentPage: number;
};
