import Image from "next/image";
import { ReactNode } from "react";
import { Clock, Heart, Sparkles } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function ShowDetailTabs({
  info,
  casting,
  review,
}: {
  info: {
    cast: { title: string; artists: { id: number; name: string; image: string }[] };
    banner: { text: string };
    showInfo: { title: string; content: string; notice: string };
    notice: { title: string; imageUrls: string[] };
  };
  casting?: ReactNode; // 클라이언트 컴포넌트 -> 리액트 쿼리 사용
  review?: ReactNode; // 클라이언트 컴포넌트 -> 리액트 쿼리 사용
}) {
  const tabs = [
    {
      value: "info",
      label: "공연정보",
      content: (
        <div className="space-y-10">
          {/* 출연진 */}
          <div>
            <h2 className="mb-4 text-lg font-semibold">{info.cast.title}</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 /lg:grid-cols-6 gap-8">
              {info.cast.artists.map((artist) => (
                <div key={artist.id} className="flex flex-col items-center gap-3">
                  <div className="relative">
                    <Avatar className="size-30/ size-full">
                      <AvatarImage src={artist.image} alt={artist.name} className="object-cover" />
                      <AvatarFallback>{artist.name.slice(0, 1)}</AvatarFallback>
                    </Avatar>
                    <button className="absolute bottom-0 right-0 w-3/10 h-3/10 rounded-full bg-white shadow flex items-center justify-center">
                      <Heart className="w-5 h-5 text-neutral-300 fill-neutral-300" />
                    </button>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">찰리</p>
                    <p className="text-sm text-muted-foreground">{artist.name}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 배너 */}
          <div className="rounded-2xl border-none bg-gradient-to-r from-pink-50 via-white to-emerald-50 shadow-sm text-black">
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
      ),
    },
    {
      value: "casting",
      label: "캐스팅일정",
      content: casting,
    },
    {
      value: "review",
      label: "관람후기 (999+)",
      content: review,
    },
  ];

  return (
    <Tabs defaultValue="info" className="w-full ">
      <div className="w-full border-b">
        <TabsList variant="line" className="px-0 gap-0">
          {tabs.map((tab) => (
            <TabsTrigger key={tab.value} value={tab.value}>
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </div>

      {tabs.map((tab) => (
        <TabsContent key={tab.value} value={tab.value} className="mt-8">
          {tab.content}
        </TabsContent>
      ))}
    </Tabs>
  );
}
