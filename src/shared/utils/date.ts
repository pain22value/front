/**
 * 서버에서 오는 날짜 문자열을 받아서 UI에 맞는 형식으로 변환합니다.
 * @param dateStr ISO 문자열이나 "YYYY.MM.DD" 형식 등의 문자열
 * @returns "YYYY.MM.DD" 형식의 문자열
 */
export const formatShowDate = (dateStr: string | Date | undefined): string => {
  if (!dateStr) return "";

  // Date 객체인 경우
  if (dateStr instanceof Date) {
    return dateStr
      .toLocaleDateString("ko-KR", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      })
      .replace(/\. /g, ".")
      .replace(/\.$/, ""); // 끝에 마침표 제거
  }

  // 문자열인 경우 - 이미 YYYY.MM.DD 형식이면 그대로 반환
  if (typeof dateStr === "string" && dateStr.match(/^\d{4}\.\d{2}\.\d{2}$/)) {
    return dateStr;
  }

  // 그 외의 경우 (ISO 문자열 등) Date로 파싱 시도
  try {
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return String(dateStr);

    return date
      .toLocaleDateString("ko-KR", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      })
      .replace(/\. /g, ".")
      .replace(/\.$/, "");
  } catch {
    return String(dateStr);
  }
};

/**
 * 공연 시작일과 종료일을 받아서 "YYYY.MM.DD ~ YYYY.MM.DD" 형식의 기간 문자열을 반환합니다.
 */
export const formatShowPeriod = (startTime: string | Date, endTime: string | Date): string => {
  return `${formatShowDate(startTime)} ~ ${formatShowDate(endTime)}`;
};
