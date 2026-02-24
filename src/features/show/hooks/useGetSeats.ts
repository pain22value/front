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

/*
export const useGetSeats = (showId: number) => {
  return useQuery({
    queryKey: ["seats", showId],
    queryFn: () => seatService.getSeatList(showId),
    placeholderData: MOCK_SECTIONS,
  });
};
*/

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