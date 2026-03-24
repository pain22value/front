type ShowScheduleData = {
  showId: number;
  range: {
    from: string;
    to: string;
  };
  filters: {
    artists: {
      artistId: number | null;
      artistName: string;
    }[];
  };
  roles: {
    roleName: string;
    order: number;
  }[];
  page: {
    currentPage: number;
    size: number;
    totalElements: number;
    totalPages: number;
  };
  rows: Schedule[];
};

type Schedule = {
  scheduleId: number;
  showTime: string;
  showDateLabel: string;
  showTimeLabel: string;
  casts: Record<string, { artistId: number | null; artistName: string }>;
};
