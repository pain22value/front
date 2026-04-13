type EmotionPoint = "IMMERSION" | "TENSION" | "ENJOYMENT" | "CATHARSIS" | "TOUCHING";
type CharmPoint = "STAGE_PRODUCTION" | "STORY" | "ACTING" | "DANCE" | "NUMBER";

type Review = {
  reviewId: number;
  userId: string;
  userNickname: string;
  title: string;
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
  emotionPoints: EmotionPoint[];
  charmPoints: CharmPoint[];
  title: string;
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
