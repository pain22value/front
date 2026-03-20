// 공연

type HomeShow = {
  showId: number;
  posterUrl: string;
  showTitle: string;
  venueName: string;
  date: string;
};

type Page = {
  currentPage: number;
  size: number;
  totalElements: number;
  totalPages: number;
};

type HomeShowsData = {
  shows: HomeShow[];
  page: Page;
};

// 배너

type HomeBanner = {
  bannerId: number;
  showId: number;
  showTitle: string;
  venueName: string;
  date: string;
  posterUrl: string;
  displayOrder: number;
};

type HomeBannersData = {
  banners: HomeBanner[];
};
