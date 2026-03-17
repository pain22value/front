/* 2번쨰 껍질
import { useQuery } from "@tanstack/react-query";
import { seatService } from "../services/seatService";

const MOCK_SECTIONS: SeatSection[] = [
  {
    sectionId: "OP",
    sectionName: "OP",
    grade: "VIP",
    price: 150000,
    rows: [
      {
        rowName: "1",
        seats: Array.from({ length: 10 }, (_, i) => ({
          seatId: `OP-1-${i + 1}`,
          section: "OP",
          row: 1,
          col: i + 1,
          grade: "VIP" as SeatGrade,
          status: (i === 3 ? "unavailable" : i === 5 ? "reserved" : "available") as SeatStatus,
          price: 150000,
        })),
      },
      {
        rowName: "2",
        seats: Array.from({ length: 10 }, (_, i) => ({
          seatId: `OP-2-${i + 1}`,
          section: "OP",
          row: 2,
          col: i + 1,
          grade: "VIP" as SeatGrade,
          status: "available" as SeatStatus,
          price: 150000,
        })),
      },
    ],
  },
  {
    sectionId: "B",
    sectionName: "B",
    grade: "S",
    price: 80000,
    rows: [
      {
        rowName: "1",
        seats: Array.from({ length: 15 }, (_, i) => ({
          seatId: `B-1-${i + 1}`,
          section: "B",
          row: 1,
          col: i + 1,
          grade: "S" as SeatGrade,
          status: (i % 4 === 0 ? "unavailable" : "available") as SeatStatus,
          price: 80000,
        })),
      },
    ],
  },
];


//export const useGetSeats = (showId: number) => {
  //return useQuery({
    //queryKey: ["seats", showId],
    //queryFn: () => seatService.getSeatList(showId),
    //placeholderData: MOCK_SECTIONS,
  //});
//};


// 임시로 이거 사용하다가 API 나오면 위 코드 사용
export const useGetSeats = (showId: number) => {
  return useQuery({
    queryKey: ["seats", showId],
    queryFn: () => seatService.getSeatList(showId),
    placeholderData: MOCK_SECTIONS,
    retry: false, // 실패해도 재시도 안 함
    enabled: false, // API 요청 자체를 안 함 (Mock만 보여줌)
    initialData: MOCK_SECTIONS, // 항상 Mock 데이터 사용
  });
};

*/

import { useQuery } from "@tanstack/react-query";
import { seatService } from "../services/seatService";

// 행별 좌석 수 생성 헬퍼
const makeRow = (
  section: string,
  rowNum: number,
  count: number,
  grade: SeatGrade,
  price: number,
  unavailableIndexes: number[] = [],
): { rowName: string; seats: Seat[] } => ({
  rowName: String(rowNum),
  seats: Array.from({ length: count }, (_, i) => ({
    seatId: `${section}-${rowNum}-${i + 1}`,
    section,
    row: rowNum,
    col: i + 1,
    grade,
    status: unavailableIndexes.includes(i) ? "unavailable" : ("available" as SeatStatus),
    price,
  })),
});

const MOCK_SECTIONS: SeatSection[] = [
  // OP 구역 (3행)
  {
    sectionId: "OP",
    sectionName: "OP",
    grade: "VIP",
    price: 150000,
    rows: [
      makeRow("OP", 1, 16, "VIP", 150000),
      makeRow("OP", 2, 18, "VIP", 150000),
      makeRow("OP", 3, 18, "VIP", 150000),
    ],
  },

  // 1F A구역 (좌, 20행)
  {
    sectionId: "1F-A",
    sectionName: "A",
    grade: "R",
    price: 110000,
    rows: [
      makeRow("1F-A", 1, 6, "R", 110000),
      makeRow("1F-A", 2, 7, "R", 110000),
      makeRow("1F-A", 3, 7, "R", 110000),
      makeRow("1F-A", 4, 7, "R", 110000),
      makeRow("1F-A", 5, 7, "R", 110000),
      makeRow("1F-A", 6, 8, "R", 110000),
      makeRow("1F-A", 7, 8, "R", 110000),
      makeRow("1F-A", 8, 8, "R", 110000),
      makeRow("1F-A", 9, 8, "R", 110000),
      makeRow("1F-A", 10, 8, "R", 110000),
      makeRow("1F-A", 11, 9, "S", 80000),
      makeRow("1F-A", 12, 9, "S", 80000),
      makeRow("1F-A", 13, 9, "S", 80000),
      makeRow("1F-A", 14, 7, "S", 80000),
      makeRow("1F-A", 15, 7, "S", 80000),
      makeRow("1F-A", 16, 6, "S", 80000),
      makeRow("1F-A", 17, 6, "S", 80000),
      makeRow("1F-A", 18, 5, "S", 80000),
      makeRow("1F-A", 19, 4, "S", 80000),
      makeRow("1F-A", 20, 3, "S", 80000),
    ],
  },

  // 1F B구역 (중앙, 20행)
  {
    sectionId: "1F-B",
    sectionName: "B",
    grade: "R",
    price: 110000,
    rows: [
      makeRow("1F-B", 1, 14, "R", 110000),
      makeRow("1F-B", 2, 15, "R", 110000),
      makeRow("1F-B", 3, 15, "R", 110000),
      makeRow("1F-B", 4, 15, "R", 110000),
      makeRow("1F-B", 5, 15, "R", 110000),
      makeRow("1F-B", 6, 16, "R", 110000),
      makeRow("1F-B", 7, 16, "R", 110000),
      makeRow("1F-B", 8, 16, "R", 110000),
      makeRow("1F-B", 9, 16, "R", 110000),
      makeRow("1F-B", 10, 16, "R", 110000),
      makeRow("1F-B", 11, 16, "S", 80000),
      makeRow("1F-B", 12, 16, "S", 80000),
      makeRow("1F-B", 13, 16, "S", 80000),
      makeRow("1F-B", 14, 16, "S", 80000),
      makeRow("1F-B", 15, 16, "S", 80000),
      makeRow("1F-B", 16, 16, "S", 80000),
      makeRow("1F-B", 17, 16, "S", 80000),
      makeRow("1F-B", 18, 15, "S", 80000),
      makeRow("1F-B", 19, 14, "S", 80000),
      makeRow("1F-B", 20, 13, "S", 80000),
    ],
  },

  // 1F C구역 (우, 20행) - A의 거울
  {
    sectionId: "1F-C",
    sectionName: "C",
    grade: "R",
    price: 110000,
    rows: [
      makeRow("1F-C", 1, 6, "R", 110000),
      makeRow("1F-C", 2, 7, "R", 110000),
      makeRow("1F-C", 3, 7, "R", 110000),
      makeRow("1F-C", 4, 7, "R", 110000),
      makeRow("1F-C", 5, 7, "R", 110000),
      makeRow("1F-C", 6, 8, "R", 110000),
      makeRow("1F-C", 7, 8, "R", 110000),
      makeRow("1F-C", 8, 8, "R", 110000),
      makeRow("1F-C", 9, 8, "R", 110000),
      makeRow("1F-C", 10, 8, "R", 110000),
      makeRow("1F-C", 11, 9, "S", 80000),
      makeRow("1F-C", 12, 9, "S", 80000),
      makeRow("1F-C", 13, 9, "S", 80000),
      makeRow("1F-C", 14, 7, "S", 80000),
      makeRow("1F-C", 15, 7, "S", 80000),
      makeRow("1F-C", 16, 6, "S", 80000),
      makeRow("1F-C", 17, 6, "S", 80000),
      makeRow("1F-C", 18, 5, "S", 80000),
      makeRow("1F-C", 19, 4, "S", 80000),
      makeRow("1F-C", 20, 3, "S", 80000),
    ],
  },

  // 2F A구역 (6행)
  {
    sectionId: "2F-A",
    sectionName: "A",
    grade: "A",
    price: 60000,
    rows: [
      makeRow("2F-A", 1, 6, "A", 60000),
      makeRow("2F-A", 2, 6, "A", 60000),
      makeRow("2F-A", 3, 6, "A", 60000),
      makeRow("2F-A", 4, 6, "A", 60000),
      makeRow("2F-A", 5, 5, "A", 60000),
      makeRow("2F-A", 6, 4, "A", 60000),
    ],
  },

  // 2F B구역 (6행)
  {
    sectionId: "2F-B",
    sectionName: "B",
    grade: "A",
    price: 60000,
    rows: [
      makeRow("2F-B", 1, 14, "A", 60000),
      makeRow("2F-B", 2, 14, "A", 60000),
      makeRow("2F-B", 3, 14, "A", 60000),
      makeRow("2F-B", 4, 13, "A", 60000),
      makeRow("2F-B", 5, 12, "A", 60000),
      makeRow("2F-B", 6, 10, "A", 60000),
    ],
  },

  // 2F C구역 (6행)
  {
    sectionId: "2F-C",
    sectionName: "C",
    grade: "A",
    price: 60000,
    rows: [
      makeRow("2F-C", 1, 6, "A", 60000),
      makeRow("2F-C", 2, 6, "A", 60000),
      makeRow("2F-C", 3, 6, "A", 60000),
      makeRow("2F-C", 4, 6, "A", 60000),
      makeRow("2F-C", 5, 5, "A", 60000),
      makeRow("2F-C", 6, 4, "A", 60000),
    ],
  },
];

export const useGetSeats = (showId: number) => {
  return useQuery({
    queryKey: ["seats", showId],
    queryFn: () => seatService.getSeatList(showId),
    enabled: false,
    initialData: MOCK_SECTIONS,
  });
};
