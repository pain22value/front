import { useQuery } from "@tanstack/react-query";
import { seatService, type ApiSection } from "../services/seatService";

const toSeatStatus = (status: "AVAILABLE" | "HELD" | "SOLD"): SeatStatus => {
  if (status === "AVAILABLE") return "available";
  if (status === "HELD") return "reserved";
  return "unavailable";
};

const toSeatGrade = (grade: string): SeatGrade => {
  if (grade === "VIP") return "VIP";
  if (grade === "R") return "R";
  if (grade === "S") return "S";
  return "A";
};

export const adaptSections = (apiSections: ApiSection[]): SeatSection[] =>
  apiSections.map((section) => ({
    sectionId: String(section.sectionId),
    sectionName: section.sectionName,
    grade: toSeatGrade(section.grade),
    price: section.price,
    rows: section.rows.map((row) => ({
      rowName: row.row,
      seats: row.seats.map((seat) => ({
        seatId: String(seat.seatId),
        section: section.sectionName,
        row: Number(row.row),
        col: seat.col,
        grade: toSeatGrade(section.grade),
        status: toSeatStatus(seat.status),
        price: section.price,
      })),
    })),
  }));

// ─── Mock 데이터 ──────────────────────────────────────────────
const makeRow = (
  section: string,
  rowNum: number,
  count: number,
  grade: SeatGrade,
  price: number,
): { rowName: string; seats: Seat[] } => ({
  rowName: String(rowNum),
  seats: Array.from({ length: count }, (_, i) => ({
    seatId: `${section}-${rowNum}-${i + 1}`,
    section,
    row: rowNum,
    col: i + 1,
    grade,
    status: "available" as SeatStatus,
    price,
  })),
});

const MOCK_SECTIONS: SeatSection[] = [
  { sectionId: "OP",   sectionName: "OP", grade: "VIP", price: 150000, rows: [makeRow("OP", 1, 16, "VIP", 150000), makeRow("OP", 2, 18, "VIP", 150000), makeRow("OP", 3, 18, "VIP", 150000)] },
  { sectionId: "1F-A", sectionName: "A",  grade: "R",   price: 110000, rows: Array.from({ length: 20 }, (_, i) => makeRow("1F-A", i + 1, [6,7,7,7,7,8,8,8,8,8,9,9,9,7,7,6,6,5,4,3][i], i < 10 ? "R" : "S", i < 10 ? 110000 : 80000)) },
  { sectionId: "1F-B", sectionName: "B",  grade: "R",   price: 110000, rows: Array.from({ length: 20 }, (_, i) => makeRow("1F-B", i + 1, [14,15,15,15,15,16,16,16,16,16,16,16,16,16,16,16,16,15,14,13][i], i < 10 ? "R" : "S", i < 10 ? 110000 : 80000)) },
  { sectionId: "1F-C", sectionName: "C",  grade: "R",   price: 110000, rows: Array.from({ length: 20 }, (_, i) => makeRow("1F-C", i + 1, [6,7,7,7,7,8,8,8,8,8,9,9,9,7,7,6,6,5,4,3][i], i < 10 ? "R" : "S", i < 10 ? 110000 : 80000)) },
  { sectionId: "2F-A", sectionName: "A",  grade: "A",   price: 60000,  rows: [makeRow("2F-A", 1, 6, "A", 60000), makeRow("2F-A", 2, 6, "A", 60000), makeRow("2F-A", 3, 6, "A", 60000), makeRow("2F-A", 4, 6, "A", 60000), makeRow("2F-A", 5, 5, "A", 60000), makeRow("2F-A", 6, 4, "A", 60000)] },
  { sectionId: "2F-B", sectionName: "B",  grade: "A",   price: 60000,  rows: [makeRow("2F-B", 1, 14, "A", 60000), makeRow("2F-B", 2, 14, "A", 60000), makeRow("2F-B", 3, 14, "A", 60000), makeRow("2F-B", 4, 13, "A", 60000), makeRow("2F-B", 5, 12, "A", 60000), makeRow("2F-B", 6, 10, "A", 60000)] },
  { sectionId: "2F-C", sectionName: "C",  grade: "A",   price: 60000,  rows: [makeRow("2F-C", 1, 6, "A", 60000), makeRow("2F-C", 2, 6, "A", 60000), makeRow("2F-C", 3, 6, "A", 60000), makeRow("2F-C", 4, 6, "A", 60000), makeRow("2F-C", 5, 5, "A", 60000), makeRow("2F-C", 6, 4, "A", 60000)] },
];

export const useGetSeats = (showScheduleId: number) => {
  return useQuery({
    queryKey: ["seats", showScheduleId],
    queryFn: async () => {
      const apiSections = await seatService.getSeatList(showScheduleId);
      if (!apiSections) return MOCK_SECTIONS; // API 실패 시 mock fallback
      return adaptSections(apiSections);
    },
    retry: false,
    initialData: MOCK_SECTIONS, // 초기 렌더링은 mock으로
    enabled: false,
  });
};