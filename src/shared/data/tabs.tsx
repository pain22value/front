import Image from "next/image";

export const tabs = [
  {
    value: "info",
    label: "공연정보",
    content: (
      <div className="space-y-6">
        <Image
          src="https://res.cloudinary.com/dfiaqyaug/image/upload/v1770427201/%ED%8A%B8%EB%A0%88%EC%9D%B4%EC%8A%A4%EC%9C%A0_s0l2yu.png"
          alt="Curtain Call Week"
          width={800}
          height={800}
          className="rounded-lg border"
        />
      </div>
    ),
  },
  {
    value: "casting",
    label: "캐스팅일정",
  },
  {
    value: "review",
    label: "관람후기 (999+)",
  },
];
