interface Show {
  id: number | string;
  title: string;
  venue: string;
  period: string;
  image: string;
}

<<<<<<< HEAD
<<<<<<< HEAD
interface Actor {
  id: number;
  name: string;
  image: string;
  description?: string;
}
=======
=======
>>>>>>> 0d9979d55dbadff03cbc7cab1e80ccfe4f2b0fdf
// 2/21 박영준
// 백엔드에서 오는 데이터 타입을 미리 정의
type SeatStatus = 'available' | 'reserved' | 'unavailable'; // 좌석 상태
type SeatGrade = 'VIP' | 'R' | 'S' | 'A'; // 좌석 등급

// 좌석 하나
interface Seat {
  seatId: string; // 좌석 고유 ID
  section: string; // 구역 (OP, A, B)
  row: number; // 행 (Pixi y좌표 계산에 사용)
  col: number; // 열 (Pixi x좌표 계산에 사용)
  grade: SeatGrade; // 등급 (색상 결정)
  status: SeatStatus; // 상태 (클릭 가능 여부)
  price: number; // 가격
}

/* 구역 하나
      SeatSection (OP구역)
      ├── rows[0] (1행)
      │   ├── seats[0] → Seat (OP-1-1)
      │   ├── seats[1] → Seat (OP-1-2)
      │   └── seats[2] → Seat (OP-1-3)
      └── rows[1] (2행)
          ├── seats[0] → Seat (OP-2-1)
          └── ...
*/
interface SeatSection {
  sectionId: string; // 구역 ID
  sectionName: string; // 구역 이름 (OP, Cantabile)
  grade: SeatGrade; // 구역 전체 등급
  price: number; // 구역 전체 가격
  rows: {
    rowName: string; // 행 이름 (1, 2, A)
    seats: Seat[]; // 해당 행에 속한 좌석
  }[];
}

// 좌석 선택했을 때 백엔드가 돌려주는 응답
interface SeatReserveResponse {
<<<<<<< HEAD
<<<<<<< HEAD
  seatId: string;
  status: SeatStatus;
  expiredAt: string;
}
>>>>>>> d3b310a (feat(seat): shared/api/endpoint.ts update 및 shared/types/show.d.ts update)
=======
  seatId: string; // 어떤 좌석을 점유했는지
  status: SeatStatus; // 현재 상태
  expiredAt: string; // 만료 시간 7분 타이머
}
>>>>>>> a3dc98b (feat(seat): show.d, endpoints 주석 처리)
=======
  seatId: string; // 어떤 좌석을 점유했는지
  status: SeatStatus; // 현재 상태
  expiredAt: string; // 만료 시간 7분 타이머
}
>>>>>>> 0d9979d55dbadff03cbc7cab1e80ccfe4f2b0fdf
