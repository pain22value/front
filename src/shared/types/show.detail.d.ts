type ShowDetail = {
  showId: number;
  title: string;
  description: string;
  runtimeMin: number;
  ageLimit: number;
  posterUrl: string;
  noticeImgs: string[];
  detailImgs: string[];
  date: string;
  startTime: string;
  endTime: string;
  venue: {
    venueId: number;
    name: string;
    address: string;
  };
  castings: Casting[];
  schedules: ShowSchedule[];
  seatGrades: ShowSeatGrade[];
  ranking?: string;
  truveIndex?: number;
  benefit?: string;
};

type Casting = {
  showCastId: number;
  artistId: number;
  artistName: string;
  profileImageUrl: string;
  roleName: string;
  order: number;
  isLiked?: boolean;
};

type ShowSchedule = {
  scheduleId: number;
  showTime: string;
  showDateLabel: string;
  showTimeLabel: string;
  casts: Record<string, { artistId: number | null; artistName: string }>;
  remainingSeats: {
    gradeName: string;
    remainingSeatCount: number;
    totalCount: number;
  }[];
};

type ShowSeatGrade = {
  showSeatGradeId: number;
  gradeName: string;
  colorCode: string;
  price: number;
};
