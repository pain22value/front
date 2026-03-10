// 임시 색상 -> 나중에 figma varients 색상과 통일 시켜야함
const GRADE_COLOR: Record<SeatGrade, string> = {
  VIP: "#9b59b6", 
  R: "#8e44ad",
  S: "#27ae60",
  A: "#95a5a6", 
};

interface SeatGradeLegendProps {
  sections: SeatSection[];
}

export const SeatGradeLegend = ({ sections }: SeatGradeLegendProps) => {
  // 등급 중복 제거
  const uniqueGrades = sections.filter(
    (section, index, self) =>
      index === self.findIndex((s) => s.grade === section.grade)
  );

  return (
    <div className="flex flex-col gap-2 p-4 bg-white rounded-lg border">
      <span className="text-sm font-semibold">등급별 가격</span>
      {uniqueGrades.map((section) => (
        <div key={section.grade} className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div
              className="w-4 h-4 rounded-sm"
              style={{ backgroundColor: GRADE_COLOR[section.grade] }}
            />
            <span className="text-sm">{section.grade}</span>
          </div>
          <span className="text-sm font-medium">
            {section.price.toLocaleString()}원
          </span>
        </div>
      ))}
    </div>
  );
};