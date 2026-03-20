// 쿼리 파라미터

type ShowCategory = "all" | "now" | "tobe" | "closed";

type QueryParams = {
  category?: ShowCategory;
  actorId?: number | string;
};

type HomeShowsOrder = "DAILY_BOOKING" | "WEEKLY_BOOKING" | "MONTHLY_BOOKING" | "RECENTLY_ADDED";
type HomeShowsRegion =
  | "ALL"
  | "SEOUL"
  | "GYEONGGI"
  | "INCHEON"
  | "DAEJEON"
  | "GWANGJU"
  | "BUSAN"
  | "DAEGU"
  | "ULSAN"
  | "SEJONG"
  | "GANGWON"
  | "CHUNGBUK"
  | "CHUNGNAM"
  | "GYEONGBUK"
  | "GYEONGBUK"
  | "JEOLLABUK"
  | "JEOLLANAM"
  | "GYEONGSANGNAM"
  | "JEJU";

type HomeShowsParams = {
  order?: HomeShowsOrder;
  region?: HomeShowsRegion;
  page?: number;
  size?: number;
};
