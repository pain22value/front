// 쿼리 파라미터

type ShowCategory = "all" | "now" | "tobe" | "closed";

type QueryParams = {
  category?: ShowCategory;
  actorId?: number | string;
};
