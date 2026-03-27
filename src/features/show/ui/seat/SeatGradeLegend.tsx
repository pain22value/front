const GRADE_INFO: Record<SeatGrade, { fill: string; stroke: string; label: string; price: number }> = {
  VIP: { fill: "#DECFFB", stroke: "#783CF1", label: "VIP", price: 160000 },
  R:   { fill: "#C2F2D8", stroke: "#25B07D", label: "R",   price: 120000 },
  S:   { fill: "#CCEBF6", stroke: "#1D7CD0", label: "S",   price: 90000  },
  A:   { fill: "#FDE5BE", stroke: "#C59805", label: "A",   price: 60000  },
};

const GRADES: SeatGrade[] = ["VIP", "R", "S", "A"];

interface SeatGradeLegendProps {
  sections: SeatSection[];
}

export const SeatGradeLegend = ({ sections }: SeatGradeLegendProps) => {
  // 실제 사용 중인 등급만 필터링
  const usedGrades = GRADES.filter((grade) =>
    sections.some((section) =>
      section.rows.some((row) =>
        row.seats.some((seat) => seat.grade === grade)
      )
    )
  );

  return (
    <div className="flex flex-col gap-2 p-4 bg-white rounded-lg border">
      <span className="text-sm font-semibold">등급별 가격</span>
      {usedGrades.map((grade) => (
        <div key={grade} className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div
              className="w-4 h-4 rounded-sm border"
              style={{
                backgroundColor: GRADE_INFO[grade].fill,
                borderColor: GRADE_INFO[grade].stroke,
              }}
            />
            <span className="text-sm">{GRADE_INFO[grade].label}석</span>
          </div>
          <span className="text-sm font-medium">
            {GRADE_INFO[grade].price.toLocaleString()}원
          </span>
        </div>
      ))}
    </div>
  );
};