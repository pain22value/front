import { useMemo, useState } from "react";

export function useShowNotice(show: ShowDetail | undefined) {
  // 1. 일반 공지사항 노출 상태
  const [isNotice, setIsNotice] = useState(true);

  // 2. 사용자가 티켓 오픈 안내를 명시적으로 닫았는지 여부
  const [isOpenTimeNotice, setIsOpenTimeNotice] = useState(false);

  // 3. 최종적으로 티켓 오픈 안내를 노출할 수 있는지 결정 (계산된 값)
  const canShowOpenTimeNotice = useMemo(() => {
    // 사용자가 이미 닫았거나 공연 날짜 정보가 없으면 보여주지 않음
    if (isOpenTimeNotice || !show?.date) return false;

    const targetDateStr = show?.startTime || (show?.date ? `${show.date.replaceAll(".", "-")}T00:00:00` : null);
    if (!targetDateStr) return false;

    const openDate = new Date(targetDateStr);

    // 유효한 날짜이고, 현재 시간이 오픈 시간보다 이전일 때만 true
    return !isNaN(openDate.getTime()) && new Date() < openDate;
  }, [show, isOpenTimeNotice]);

  return {
    isNotice,
    setIsNotice,
    isOpenTimeNotice,
    setIsOpenTimeNotice,
    canShowOpenTimeNotice,
  };
}
