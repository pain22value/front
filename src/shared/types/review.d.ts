type EmotionPoint = "IMMERSION" | "TENSION" | "ENJOYMENT" | "CATHARSIS" | "TOUCHING";
type CharmPoint = "STAGE_PRODUCTION" | "STORY" | "ACTING" | "DANCE" | "NUMBER";

interface Review {
  reviewId: number;
  userId: string;
  userNickname: string;
  title: string;
  content: string;
  createdAt: string;
  positive: boolean;
}

interface ReviewListResponse {
  content: Review[];
  totalCount: number;
  totalPages: number;
  page: number;
  size: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

interface ReviewPostRequest {
  isPositive: boolean;
  emotionPoints: EmotionPoint[];
  charmPoints: CharmPoint[];
  title: string;
  content: string;
}

interface ReviewPointScore {
  name: string;
  label: string;
  score: number;
}

interface ReviewMetaResponse {
  weeklyRanking: number;
  truveScore: number;
  showId: number;
  charmPointScores: ReviewPointScore[];
  emotionPointScores: ReviewPointScore[];
}

