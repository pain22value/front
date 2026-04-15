type EmotionPoint = "E01" | "E02" | "E03" | "E04" | "E05";
type CharmPoint = "C01" | "C02" | "C03" | "C04" | "C05";

type Review = {
  reviewId: number;
  userId: string;
  userNickname: string;
  title: string;
  content: string;
  createdAt: string;
  positive: boolean;
  charmPoints: CharmPoint[];
  emotionPoints: EmotionPoint[];
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
