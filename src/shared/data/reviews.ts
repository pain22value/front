export const REVIEW_LIST: Review[] = Array.from({ length: 3 }).map((_, i) => ({
  reviewId: i + 1,
  userId: `user-${i}`,
  userNickname: `김**`,
  title: `관람평 제목 ${i + 1}`,
  content: `정말 멋진 공연이었습니다. 배우들의 연기가 인상 깊었어요. ${i + 1}`,
  createdAt: "2026-01-25T10:00:00.000Z",
  positive: i % 3 !== 0,
}));

export const REVIEW_CHART_LEFT_MOCK = [
  { subject: "몰입감", value: 4 },
  { subject: "연출", value: 2 },
  { subject: "스토리", value: 5 },
  { subject: "음악", value: 3 },
  { subject: "배우", value: 4 },
];

export const REVIEW_CHART_RIGHT_MOCK = [
  { subject: "몰입감", value: 4 },
  { subject: "연출", value: 3 },
  { subject: "스토리", value: 4 },
  { subject: "음악", value: 4 },
  { subject: "배우", value: 3 },
];
