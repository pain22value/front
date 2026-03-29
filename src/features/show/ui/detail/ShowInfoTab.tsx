"use client";

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Clock, Heart, Sparkles, ChevronDown } from "lucide-react";
import { useArtistLike } from "../../hooks/useArtistLike";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function ShowInfoTab({ show }: { show: ShowDetail }) {
  const [openCast, setOpenCast] = useState(false);
  const [openNotice, setOpenNotice] = useState(false);
  const visibleCount = 6;
  const visibleCastings = show.castings.slice(0, visibleCount);
  const hiddenCastings = show.castings.slice(visibleCount);

  return (
    <div className="space-y-10">
      {/* 출연진 */}
      <div>
        <h2 className="mb-4 text-lg font-semibold">캐스팅</h2>
        <Collapsible open={openCast} onOpenChange={setOpenCast}>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8">
            {visibleCastings.map((artist) => (
              <ArtistAvatar key={artist.showCastId} artist={artist} />
            ))}
          </div>
          {hiddenCastings.length > 0 && (
            <>
              <CollapsibleContent>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8 pt-8">
                  {hiddenCastings.map((artist) => (
                    <ArtistAvatar key={artist.showCastId} artist={artist} />
                  ))}
                </div>
              </CollapsibleContent>
              <div className="flex justify-center mt-6">
                <CollapsibleTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors h-auto py-1"
                  >
                    {openCast ? "닫기" : "더 보기"}
                    <ChevronDown
                      className={`h-4 w-4 transition-transform duration-200 ${openCast ? "rotate-180" : ""}`}
                    />
                  </Button>
                </CollapsibleTrigger>
              </div>
            </>
          )}
        </Collapsible>
      </div>

      {/* 배너 */}
      <div className="rounded-2xl border-none bg-linear-to-r from-pink-50 via-white to-emerald-50 shadow-sm text-black">
        <div className="flex items-start gap-3 p-5">
          <div className="mt-0.5 text-pink-400">
            <Sparkles className="h-5 w-5" />
          </div>
          <p className="text-sm font-medium leading-relaxed whitespace-pre-line">{`배우를 선택하면 아티스트 페이지로 이동할 수 있습니다.
    관심 배우를 설정하고 소식을 미리 받아보세요.`}</p>
        </div>
      </div>

      {/* 공연정보 */}
      <div>
        <div className="flex items-center gap-2">
          <Clock className="h-5 w-5" />
          <h3 className="text-base font-semibold">공연시간정보</h3>
        </div>
        <div className="whitespace-pre-line text-sm text-muted-foreground leading-loose">{show.description}</div>
        {/* <div className="whitespace-pre-line text-sm">{info.showInfo.content}</div>
        <p className="text-xs">{info.showInfo.notice}</p> */}
      </div>

      {/* 공지사항 */}
      <div>
        <h2 className="mb-4 text-lg font-semibold">공지사항</h2>
        <Collapsible open={openNotice} onOpenChange={setOpenNotice}>
          <div className="space-y-0">
            {show.noticeImgs.length > 0 && (
              <Image src={show.noticeImgs[0]} alt="Notice" width={1000} height={1000} className="w-full" />
            )}
            {show.noticeImgs.length > 1 && (
              <CollapsibleContent>
                <div className="space-y-0">
                  {show.noticeImgs.slice(1).map((url, index) => (
                    <Image key={index} src={url} alt="Notice" width={1000} height={1000} className="w-full" />
                  ))}
                </div>
              </CollapsibleContent>
            )}
          </div>
          {show.noticeImgs.length > 1 && (
            <div className="flex justify-center mt-6">
              <CollapsibleTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors h-auto py-1"
                >
                  {openNotice ? "닫기" : "공지사항 더 보기"}
                  <ChevronDown
                    className={`h-4 w-4 transition-transform duration-200 ${openNotice ? "rotate-180" : ""}`}
                  />
                </Button>
              </CollapsibleTrigger>
            </div>
          )}
        </Collapsible>
      </div>
    </div>
  );
}

import { useArtistStore } from "@/features/artists/stores/useArtistStore";

function ArtistAvatar({ artist }: { artist: Casting }) {
  // 전역 상태에서 좋아요 여부 가져오기 (없으면 서버 상태 사용)
  const isLiked = useArtistStore((state) => state.likes[artist.artistId] ?? artist.isLiked ?? false);
  const { toggle, isPending } = useArtistLike(artist.artistId, isLiked);

  // 좋아요 토글 핸들러 (낙관적 업데이트는 생략하거나 global store에서 처리)
  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggle();
  };

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative">
        <Link href={`/artists/${artist.artistId}`} className="block transition">
          <Avatar className="size-full">
            <AvatarImage src={artist.profileImageUrl} alt={artist.artistName} className="object-cover" />
            <AvatarFallback>{artist.artistName.slice(0, 1)}</AvatarFallback>
          </Avatar>
        </Link>
        <Button
          variant="secondary"
          size="icon"
          disabled={isPending}
          onClick={handleLike}
          className="absolute bottom-0 right-0 size-8 rounded-full bg-white shadow-sm hover:bg-neutral-50"
        >
          <Heart
            className={`w-4 h-4 transition-colors ${
              isLiked ? "text-pink-500 fill-pink-500" : "text-neutral-300 fill-neutral-300"
            }`}
          />
        </Button>
      </div>
      <Link href={`/artists/${artist.artistId}`} className="text-center hover:underline decoration-neutral-300">
        <p className="text-sm font-medium">{artist.artistName}</p>
        <p className="text-xs text-muted-foreground">{artist.roleName}</p>
      </Link>
    </div>
  );
}

const info = {
  cast: { title: "캐스팅" },
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
