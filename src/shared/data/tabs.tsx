import { artists } from "./artists";

export const tabs = [
  { value: "info", label: "공연정보" },
  { value: "casting", label: "캐스팅일정" },
  { value: "review", label: "관람후기 (999+)" },
];

export const showInfoData = {
  cast: { title: "캐스팅", artists: artists },
  banner: {
    text: `배우를 선택하면 아티스트 페이지로 이동할 수 있습니다.
    관심 배우를 설정하고 소식을 미리 받아보세요.`,
  },
  showInfo: {
    title: "공연시간정보",
    content: `예매가능시간: 관람 5시간 전까지

    화, 목, 금 7시 30분 / 수 2시 30분, 7시 30분 / 토, 일, 공휴일 2시, 7시 / 월 공연 없음

    ※ 2/4(수) 2시 30분, 2/11(수) 2시 30분, 2/22(일) 7시, 2/25(수) 2시 30분, 3/2(월) 7시 공연 없음
    ※ 2/21(토) 2시, 2/21(토) 7시 공연은 전관으로 판매 마감되었습니다. 예매 시, 참고 부탁드립니다.
    ※ 극장, 공연제작사 및 관계사의 협의에 따라 일부 좌석이 마감되었습니다.`,
    notice: "※ 월요일 공연 없음",
  },
  notice: {
    title: "공지사항",
    imageUrls: [
      "https://res.cloudinary.com/dfiaqyaug/image/upload/v1770690953/image_5_yghiiq.png",
      "https://res.cloudinary.com/dfiaqyaug/image/upload/v1770690678/image_6_x7pmhf.png",
    ],
  },
};
