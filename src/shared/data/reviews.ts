export const reviews: Review[] = Array.from({ length: 25 }).map((_, i) => ({
  id: i + 1,
  title: `관람평 제목 ${i + 1}`,
  content: `정말 멋진 공연이었습니다. 배우들의 연기가 인상 깊었어요. ${i + 1}`,
  date: "2026.01.25",
  author: `김**`,
  round: `${(i % 3) + 1}회차`,
  sentiment: i % 3 === 0 ? "아쉬워요" : "좋았어요",
}));
