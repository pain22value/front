// 공연

type Show = {
  showId: number;
  posterUrl: string;
  showTitle: string;
  venueName: string;
  date: string;
};

type ShowPage = {
  currentPage: number;
  size: number;
  totalElements: number;
  totalPages: number;
};

type ShowCategory = "all" | "now" | "tobe" | "closed";
type ShowsOrder = "DAILY_BOOKING" | "WEEKLY_BOOKING" | "MONTHLY_BOOKING" | "RECENTLY_ADDED";
type ShowsRegion =
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
  | "JEOLLABUK"
  | "JEOLLANAM"
  | "GYEONGSANGNAM"
  | "JEJU";

// 배너

type Banner = {
  bannerId: number;
  showId: number;
  showTitle: string;
  venueName: string;
  date: string;
  posterUrl: string;
  displayOrder: number;
};

// 요청 관련 타입

type ShowsParams = {
  category?: ShowCategory;
  artistId?: number | string;
};

type ShowsListParams = {
  order?: ShowsOrder;
  region?: ShowsRegion;
  page?: number;
  size?: number;
};

// 응답 관련 타입

type ShowsData = {
  shows: Show[];
  page: ShowPage;
};

type BannersData = {
  banners: Banner[];
};

type PromotionsData = {
  totalCount: number;
  shows: Promotion[];
};

type Promotion = {
  displayOrder: number;
  showId: number;
  posterUrl: string;
};
