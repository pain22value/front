// 홈

// 홈 히어로 이미지
type HomeHeroImage = {
  musicalId: number;
  posterUrl: string;
  title: string;
  dailyRank: number;
  location: string;
  period: string;
  isActivate: boolean;
};

// 홈 랭킹 아이템
type HomeShowRankItem = {
  bannerId: number;
  musicalId: number;
  imageUrl: string;
  isActive: boolean;
  startAt: string;
  endAt: string;
};

// 홈 랭킹 리스트
type HomeShowRankList = HomeShowRankItem[];

// 홈 추천 아이템
type HomeRecommendItem = {
  musicalId: number;
  posterUrl: string;
  title: string;
  location: string;
  period: string;
  isActive: boolean;
  startAt: string;
  endAt: string;
};

// 홈 추천 리스트
type HomeRecommendList = HomeRecommendItem[];
