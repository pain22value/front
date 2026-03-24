import { useState, useMemo } from "react";
import { DateRange } from "react-day-picker";

export default function useShowScheduleFilter(scheduleData: ShowScheduleData | undefined) {
  const [selectedCast, setSelectedCast] = useState<string | null>(null);
  const [range, setRange] = useState<DateRange | undefined>(undefined);
  const [prevServerRange, setPrevServerRange] = useState<string | undefined>(undefined);

  // 서버에서 내려온 기본 범위 문자열 (변경 감지용)
  const serverRangeStr = scheduleData?.range ? `${scheduleData.range.from}-${scheduleData.range.to}` : undefined;

  // 서버 데이터가 로드되거나 변경되면 range 상태를 갱신 (렌더링 중 상태 조정 패턴)
  if (serverRangeStr !== prevServerRange) {
    setPrevServerRange(serverRangeStr);
    if (scheduleData?.range) {
      setRange({
        from: new Date(scheduleData.range.from),
        to: new Date(scheduleData.range.to),
      });
    }
  }

  const { allArtists, roleNames, filteredSchedule } = useMemo(() => {
    if (!scheduleData) {
      return { allArtists: [], roleNames: [], filteredSchedule: [] };
    }

    const { filters, roles, rows } = scheduleData;

    // 모든 아티스트 목록 (필터용)
    const artists = filters.artists.map((a) => a.artistName);

    // 모든 역할 목록 (테이블 헤더용)
    const rolesSorted = [...roles].sort((a, b) => a.order - b.order).map((r) => r.roleName);

    // 필터링된 일정
    const filtered = rows.filter((s) => {
      const scheduleDate = new Date(s.showTime);

      // 캐스팅 필터
      const isCastMatch = selectedCast ? Object.values(s.casts).some((c) => c.artistName === selectedCast) : true;

      // 날짜 필터
      let isDateMatch = true;
      if (range?.from) {
        const from = new Date(range.from);
        from.setHours(0, 0, 0, 0);
        const to = range.to ? new Date(range.to) : from;
        to.setHours(23, 59, 59, 999);
        isDateMatch = scheduleDate >= from && scheduleDate <= to;
      }

      return isCastMatch && isDateMatch;
    });

    return {
      allArtists: artists,
      roleNames: rolesSorted,
      filteredSchedule: filtered,
    };
  }, [scheduleData, selectedCast, range]);

  const toggleCast = (name: string) => {
    setSelectedCast((prev) => (prev === name ? null : name));
  };

  return {
    range,
    setRange,
    selectedCast,
    toggleCast,
    allArtists,
    roleNames,
    filteredSchedule,
  };
}
