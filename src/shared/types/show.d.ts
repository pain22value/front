type Show = {
  id: number;
  title: string;
  venue: string;
  image: string;
  startTime: string;
  endTime: string;
  // runtimeMin: number;
  // ageLimit: number;
};

type ShowDetail = {
  id: number;
  title: string;
  venue: string;
  runtimeMin: number;
  ageLimit: number;
  startTime: string;
  endTime: string;
  description: string;
  posterImg: string;
  noticeImg?: string;
  castings: Casting[];
  seatGrades: SeatGrade[];
  ranking?: string;
  truveIndex?: number;
  benefit?: string;
};

type Casting = {
  id: number;
  actor: Actor;
  role: string;
  order: number; // 출연진의 표기순서
};

type Actor = {
  id: number;
  name: string;
  image: string;
  description?: string;
  isMember?: boolean; // 로그인한 사용자의 경우 멤버십 가입 여부
};

type SeatGrade = {
  id: number;
  name: string;
  color: string;
  price: number;
};
