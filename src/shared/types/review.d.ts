// 리뷰

type Review = {
  reviewId: number;
  userId: string;
  userNickname: string;
  title: string;          // Note: The swagger return has it, but post request body does not. 
  content: string;
  createdAt: string;
  positive: boolean;
};

type ReviewListResponse = {
  content: Review[];
  totalCount: number;
  totalPages: number;
  page: number;
  size: number;
  hasNext: boolean;
  hasPrevious: boolean;
};

type ReviewPostRequest = {
  isPositive: boolean;
  emotionPoints: string[];
  charmPoints: string[];
  content: string;
};

type ReviewPointScore = {
  name: string;
  label: string;
  score: number;
};

type ReviewMetaResponse = {
  weeklyRanking: number;
  truveScore: number;
  showId: number;
  charmPointScores: ReviewPointScore[];
  emotionPointScores: ReviewPointScore[];
};
