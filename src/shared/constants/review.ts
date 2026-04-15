// src/shared/constants/review.ts

export const REVIEW_CHARM_POINTS: Record<CharmPoint, { label: string; key: string }> = {
  C01: { label: "무대연출", key: "STAGE_PRODUCTION" },
  C02: { label: "스토리", key: "STORY" },
  C03: { label: "배우연기", key: "ACTING" },
  C04: { label: "안무", key: "DANCE" },
  C05: { label: "넘버", key: "NUMBER" },
};

export const REVIEW_EMOTION_POINTS: Record<EmotionPoint, { label: string; key: string }> = {
  E01: { label: "몰입감", key: "IMMERSION" },
  E02: { label: "텐션", key: "TENSION" },
  E03: { label: "즐거움", key: "ENJOYMENT" },
  E04: { label: "카타르시스", key: "CATHARSIS" },
  E05: { label: "감동", key: "TOUCHING" },
};

export const REVIEW_POINTS: Record<string, { label: string; key: string }> = {
  ...REVIEW_CHARM_POINTS,
  ...REVIEW_EMOTION_POINTS,
};

// UI 렌더링을 위한 배열 형태 (value를 C01, E01 등으로 설정)
export const CHARM_POINT_LIST = Object.entries(REVIEW_CHARM_POINTS).map(([code, value]) => ({
  value: code as CharmPoint,
  ...value,
}));

export const EMOTION_POINT_LIST = Object.entries(REVIEW_EMOTION_POINTS).map(([code, value]) => ({
  value: code as EmotionPoint,
  ...value,
}));
