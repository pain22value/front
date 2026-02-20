interface Show {
  id: number | string;
  title: string;
  venue: string;
  period: string;
  image: string;
}

<<<<<<< HEAD
interface Actor {
  id: number;
  name: string;
  image: string;
  description?: string;
}
=======
// 2/21 박영준
type SeatStatus = 'available' | 'reserved' | 'unavailable';
type SeatGrade = 'VIP' | 'R' | 'S' | 'A';

interface Seat {
  seatId: string;
  section: string;
  row: number;
  col: number;
  grade: SeatGrade;
  status: SeatStatus;
  price: number;
}

interface SeatSection {
  sectionId: string;
  sectionName: string;
  grade: SeatGrade;
  price: number;
  rows: {
    rowName: string;
    seats: Seat[];
  }[];
}

interface SeatReserveResponse {
  seatId: string;
  status: SeatStatus;
  expiredAt: string;
}
>>>>>>> d3b310a (feat(seat): shared/api/endpoint.ts update 및 shared/types/show.d.ts update)
