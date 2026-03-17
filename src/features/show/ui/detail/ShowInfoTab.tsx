import Image from "next/image";
import { Clock, Heart, Sparkles } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ACTOR_LIST } from "@/shared/data/actors";

export default function ShowInfoTab({ show }: { show: ShowDetail }) {
  const info = {
    cast: { title: "캐스팅", actors: ACTOR_LIST },
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

  return (
    <div className="space-y-10">
      {/* 출연진 */}
      <div>
        <h2 className="mb-4 text-lg font-semibold">{info.cast.title}</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8">
          {info.cast.actors.map((actor) => (
            <div key={actor.id} className="flex flex-col items-center gap-3">
              <div className="relative">
                <Avatar className="size-full">
                  <AvatarImage src={actor.image} alt={actor.name} className="object-cover" />
                  <AvatarFallback>{actor.name.slice(0, 1)}</AvatarFallback>
                </Avatar>
                <button className="absolute bottom-0 right-0 w-3/10 h-3/10 rounded-full bg-white shadow flex items-center justify-center">
                  <Heart className="w-5 h-5 text-neutral-300 fill-neutral-300" />
                </button>
              </div>
              <div className="text-center">
                {/* <p className="text-sm text-muted-foreground">{actor.role}</p> */}
                <p className="text-sm text-muted-foreground">{actor.name}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 배너 */}
      <div className="rounded-2xl border-none bg-linear-to-r from-pink-50 via-white to-emerald-50 shadow-sm text-black">
        <div className="flex items-start gap-3 p-5">
          <div className="mt-0.5 text-pink-400">
            <Sparkles className="h-5 w-5" />
          </div>
          <p className="text-sm font-medium leading-relaxed whitespace-pre-line">{info.banner.text}</p>
        </div>
      </div>

      {/* 공연정보 */}
      <div>
        <div className="flex items-center gap-2">
          <Clock className="h-5 w-5" />
          <h3 className="text-base font-semibold">{info.showInfo.title}</h3>
        </div>
        <div className="whitespace-pre-line text-sm">{info.showInfo.content}</div>
        <p className="text-xs">{info.showInfo.notice}</p>
      </div>

      {/* 공지사항 */}
      <div>
        <h2 className="mb-4 text-lg font-semibold">{info.notice.title}</h2>
        {info.notice.imageUrls.map((url, index) => (
          <Image key={index} src={url} alt="Notice" width={800} height={800} className="w-full" />
        ))}
      </div>
    </div>
  );
}
