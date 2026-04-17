import { useQuery } from "@tanstack/react-query";
import { seatService, type ApiSection } from "../services/seatService";
import { useTicketingStore } from "@/features/ticketing/stores/useTicketingStore";

const toSeatGradeBySection = (sectionId: string, col: number, rowName: string, rowMaxCol: number): SeatGrade => {
  const row = Number(rowName);

  if (sectionId === "OP") return "VIP";

  if (sectionId === "1F-A") {
    if (row >= 16) return "R";
    if (row >= 11) return col <= 4 ? "R" : "VIP"; // 11~15행: 1~4열 R, 5~7열 VIP
    if (row >= 7) return col <= 3 ? "R" : "VIP"; // 7~10행: 1~3열 R, 4~6열 VIP
    return col <= 2 ? "R" : "VIP"; // 1~6행: 1~2열 R, 3~5열 VIP
  }

  if (sectionId === "1F-B") {
    return row <= 15 ? "VIP" : "R"; // 1~15행 VIP, 16~20행 R
  } // 1~20행 모두 R석

  if (sectionId === "1F-C") {
    if (row >= 16) return "R";
    if (row >= 11) return col <= 3 ? "VIP" : "R"; // 11~15행: 1~3열 VIP, 4~7열 R
    if (row >= 7) return col <= 3 ? "VIP" : "R"; // 7~10행: 1~3열 VIP, 4~6열 R
    return col <= 3 ? "VIP" : "R"; // 1~6행: 1~3열 VIP, 4~5열 R
  }

  if (sectionId === "2F-A") {
    if (row <= 2) return "R";
    if (row <= 4) return "S";
    return "A";
  }

  if (sectionId === "2F-B") {
    if (row === 1) return "VIP";
    if (row === 2) return "R";
    if (row <= 4) return "S";
    return "A";
  }

  if (sectionId === "2F-C") {
    if (row <= 2) return "R";
    if (row <= 4) return "S";
    return "A";
  }

  return "A";
};

const toSeatStatus = (status: "AVAILABLE" | "HELD" | "HOLD" | "SOLD"): SeatStatus => {
  if (status === "AVAILABLE") return "available";
  if (status === "HELD" || status === "HOLD") return "reserved";
  return "unavailable";
};

const toSeatGrade = (grade: string): SeatGrade => {
  if (grade === "VIP") return "VIP";
  if (grade === "R") return "R";
  if (grade === "S") return "S";
  return "A";
};

const toSectionId = (sectionName: string): string => {
  if (sectionName === "VIP섹션1") return "OP";
  if (sectionName === "VIP섹션2") return "1F-B";
  if (sectionName === "S섹션1") return "1F-A";
  if (sectionName === "A섹션1") return "2F-A";
  return sectionName;
};

const toSeatPrice = (grade: string): number => {
  if (grade === "VIP") return 160000;
  if (grade === "R") return 120000;
  if (grade === "S") return 90000;
  return 60000; // A
};

export const adaptSections = (apiSections: ApiSection[]): SeatSection[] =>
  apiSections.map((section) => ({
    sectionId: toSectionId(section.sectionName),
    sectionName: section.sectionName,
    grade: toSeatGrade(section.grade),
    price: section.price,
    rows: section.rows
      .sort((a, b) => Number(a.row) - Number(b.row))
      .map((row) => {
        const rowMaxCol = Math.max(...row.seats.map((s) => s.col)); // ← 여기서 계산
        return {
          rowName: row.row,
          seats: row.seats.map((seat) => ({
            seatId: String(seat.scheduledSeatId),
            section: section.sectionName,
            row: Number(row.row),
            col: seat.col,
            grade: toSeatGradeBySection(toSectionId(section.sectionName), seat.col, row.row, rowMaxCol),
            status: toSeatStatus(seat.status),
            price: section.price,
          })),
        };
      }),
  }));

// ─── Mock 데이터 ──────────────────────────────────────────────
const makeRow = (section: string, rowNum: number, count: number, grade: SeatGrade, price: number) =>
  makeRowWithAisle(
    section,
    rowNum,
    Array.from({ length: count }, (_, i) => i + 1), // count=6 이면 [1,2,3,4,5,6]
    grade,
    price,
  );

const makeRowWithAisle = (
  section: string,
  rowNum: number,
  cols: number[], // ← 실제 좌석이 있는 col 번호 배열
  grade: SeatGrade,
  price: number,
): { rowName: string; seats: Seat[] } => ({
  rowName: String(rowNum),
  seats: cols.map((col) => ({
    seatId: `${section}-${rowNum}-${col}`,
    section,
    row: rowNum,
    col, // ← 실제 위치
    grade,
    status: "available" as SeatStatus,
    price,
  })),
});

// 한 행에 총 35좌석
// cols에 빈 번호 건너뛰면 거기가 통로가 됨
const MOCK_SECTIONS: SeatSection[] = [
  {
    sectionId: "OP",
    sectionName: "OP",
    grade: "VIP",
    price: 150000,
    rows: [
      makeRowWithAisle(
        "OP",
        1,
        [5, 6, 7, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 27, 28, 29],
        "VIP",
        160000,
      ),
      makeRowWithAisle(
        "OP",
        2,
        [4, 5, 6, 7, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 27, 28, 29, 30],
        "VIP",
        160000,
      ),
      makeRowWithAisle(
        "OP",
        3,
        [3, 4, 5, 6, 7, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 27, 28, 29, 30, 31],
        "VIP",
        160000,
      ),
    ],
  },
  {
    sectionId: "1F-A",
    sectionName: "A",
    grade: "R",
    price: 110000,
    rows: [
      makeRow("1F-A", 1, 5, "R", 110000),
      makeRow("1F-A", 2, 5, "R", 110000),
      makeRow("1F-A", 3, 5, "R", 110000),
      makeRow("1F-A", 4, 5, "R", 110000),
      makeRow("1F-A", 5, 5, "R", 110000),
      makeRow("1F-A", 6, 5, "R", 110000),
      makeRow("1F-A", 7, 6, "R", 110000),
      makeRow("1F-A", 8, 6, "R", 110000),
      makeRow("1F-A", 9, 6, "R", 110000),
      makeRow("1F-A", 10, 6, "R", 110000),
      makeRow("1F-A", 11, 7, "R", 110000),
      makeRow("1F-A", 12, 7, "R", 110000),
      makeRow("1F-A", 13, 7, "R", 110000),
      { rowName: "", seats: [] }, // ← 통로 (B구역이랑 같은 행)
      makeRow("1F-A", 14, 7, "S", 80000),
      makeRow("1F-A", 15, 7, "S", 80000),
      makeRow("1F-A", 16, 6, "S", 80000),
      makeRow("1F-A", 17, 5, "S", 80000),
      makeRow("1F-A", 18, 4, "S", 80000),
      makeRow("1F-A", 19, 3, "S", 80000),
      makeRow("1F-A", 20, 2, "S", 80000),
    ],
  },
  {
    sectionId: "1F-B",
    sectionName: "B",
    grade: "R",
    price: 110000,
    rows: [
      makeRow("1F-B", 1, 15, "R", 110000),
      makeRow("1F-B", 2, 15, "R", 110000),
      makeRow("1F-B", 3, 15, "R", 110000),
      makeRow("1F-B", 4, 15, "R", 110000),
      makeRow("1F-B", 5, 15, "R", 110000),
      makeRow("1F-B", 6, 15, "R", 110000),
      makeRow("1F-B", 7, 15, "R", 110000),
      makeRow("1F-B", 8, 15, "R", 110000),
      makeRow("1F-B", 9, 15, "R", 110000),
      makeRow("1F-B", 10, 15, "R", 110000),
      makeRow("1F-B", 11, 15, "R", 110000),
      makeRow("1F-B", 12, 15, "R", 110000),
      makeRow("1F-B", 13, 15, "R", 110000),
      { rowName: "", seats: [] }, // ← 빈 행 (통로)
      makeRow("1F-B", 14, 15, "S", 80000),
      makeRow("1F-B", 15, 15, "S", 80000),
      makeRow("1F-B", 16, 15, "S", 80000),
      makeRow("1F-B", 17, 15, "S", 80000),
      makeRow("1F-B", 18, 15, "S", 80000),
      makeRow("1F-B", 19, 15, "S", 80000),
      makeRow("1F-B", 20, 15, "S", 80000),
    ],
  },
  {
    sectionId: "1F-C",
    sectionName: "C",
    grade: "R",
    price: 110000,
    rows: [
      makeRow("1F-C", 1, 5, "R", 110000),
      makeRow("1F-C", 2, 5, "R", 110000),
      makeRow("1F-C", 3, 5, "R", 110000),
      makeRow("1F-C", 4, 5, "R", 110000),
      makeRow("1F-C", 5, 5, "R", 110000),
      makeRow("1F-C", 6, 5, "R", 110000),
      makeRow("1F-C", 7, 6, "R", 110000),
      makeRow("1F-C", 8, 6, "R", 110000),
      makeRow("1F-C", 9, 6, "R", 110000),
      makeRow("1F-C", 10, 6, "R", 110000),
      makeRow("1F-C", 11, 7, "R", 110000),
      makeRow("1F-C", 12, 7, "R", 110000),
      makeRow("1F-C", 13, 7, "R", 110000),
      { rowName: "", seats: [] }, // ← 통로
      makeRow("1F-C", 14, 7, "S", 80000),
      makeRow("1F-C", 15, 7, "S", 80000),
      makeRow("1F-C", 16, 6, "S", 80000),
      makeRow("1F-C", 17, 5, "S", 80000),
      makeRow("1F-C", 18, 4, "S", 80000),
      makeRow("1F-C", 19, 3, "S", 80000),
      makeRow("1F-C", 20, 2, "S", 80000),
    ],
  },
  {
    sectionId: "2F-B",
    sectionName: "B",
    grade: "A",
    price: 60000,
    rows: [
      makeRow("2F-B", 1, 15, "A", 60000),
      makeRow("2F-B", 2, 15, "A", 60000),
      makeRow("2F-B", 3, 15, "A", 60000),
      makeRow("2F-B", 4, 15, "A", 60000),
      makeRow("2F-B", 5, 15, "A", 60000),
      makeRow("2F-B", 6, 15, "A", 60000),
    ],
  },

  {
    sectionId: "2F-A",
    sectionName: "A",
    grade: "A",
    price: 60000,
    rows: [
      makeRow("2F-A", 1, 5, "A", 60000),
      makeRow("2F-A", 2, 5, "A", 60000),
      makeRow("2F-A", 3, 5, "A", 60000),
      makeRow("2F-A", 4, 5, "A", 60000),
      makeRow("2F-A", 5, 4, "A", 60000),
      makeRow("2F-A", 6, 3, "A", 60000),
    ],
  },

  {
    sectionId: "2F-C",
    sectionName: "C",
    grade: "A",
    price: 60000,
    rows: [
      makeRow("2F-C", 1, 5, "A", 60000),
      makeRow("2F-C", 2, 5, "A", 60000),
      makeRow("2F-C", 3, 5, "A", 60000),
      makeRow("2F-C", 4, 5, "A", 60000),
      makeRow("2F-C", 5, 4, "A", 60000),
      makeRow("2F-C", 6, 3, "A", 60000),
    ],
  },
];

export const useGetSeats = (showScheduleId: number) => {
  const admissionToken = useTicketingStore((state) => state.admissionToken);
  const challengeComplete = useTicketingStore((state) => state.challengeComplete);

  return useQuery({
    queryKey: ["seats", showScheduleId],
    queryFn: async () => {
      const apiSections = await seatService.getSeatList(showScheduleId); // sessionToken 제거 (기본값 사용)
      if (!apiSections) return MOCK_SECTIONS;
      return adaptSections(apiSections); // ← apiSections가 이미 ApiSection[]이라서 바로 사용
    },
    retry: false,
    initialData: undefined, // 초기 렌더링은 mock으로
    enabled: Boolean(showScheduleId && admissionToken && challengeComplete),
  });
};
