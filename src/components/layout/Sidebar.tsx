"use client";

import { Button } from "@/components/ui/button";
import { Heart, LayoutGrid, MessageSquare } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useSidebarStore } from "@/shared/hooks/useSidebarStore";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import Link from "next/link";

const RECOMMEND_ARTIST_LIST: Artist[] = [
  {
    artistId: 1,
    artistName: "이재환",
    profileImageUrl: "https://truve-dev-bucket.s3.ap-northeast-2.amazonaws.com/leejaehwan.png",
    isLiked: false,
  },
  {
    artistId: 5,
    artistName: "신재범",
    profileImageUrl: "https://truve-dev-bucket.s3.ap-northeast-2.amazonaws.com/shinjaebeom.png",
    isLiked: false,
  },
  {
    artistId: 9,
    artistName: "김호영",
    profileImageUrl: "https://truve-dev-bucket.s3.ap-northeast-2.amazonaws.com/kimhoyoung.png",
    isLiked: false,
  },
  {
    artistId: 2,
    artistName: "서경수",
    profileImageUrl: "https://truve-dev-bucket.s3.ap-northeast-2.amazonaws.com/seokyungsu.png",
    isLiked: false,
  },
];

export default function Sidebar() {
  const { isExpanded, setExpanded } = useSidebarStore();
  const sidebarRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const borderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sidebarRef.current) return;

    // 사이드바 너비 애니메이션
    gsap.to(sidebarRef.current, {
      width: isExpanded ? 220 : 80,
      duration: 0.4,
      ease: "power3.inOut",
    });

    // 배경 및 테두리 투명도 애니메이션 (색상 번짐 방지)
    if (bgRef.current) {
      gsap.to(bgRef.current, {
        opacity: isExpanded ? 1 : 0,
        duration: 0.4,
        ease: "power3.inOut",
      });
    }
    if (borderRef.current) {
      gsap.to(borderRef.current, {
        opacity: isExpanded ? 1 : 0,
        duration: 0.4,
        ease: "power3.inOut",
      });
    }

    // 레이블 애니메이션
    const labels = sidebarRef.current.querySelectorAll(".sidebar-label");
    gsap.to(labels, {
      opacity: isExpanded ? 1 : 0,
      x: isExpanded ? 0 : -20,
      duration: 0.3,
      stagger: 0.05,
      ease: "power2.out",
      display: isExpanded ? "block" : "none",
    });
  }, [isExpanded]);

  // 사이드바 외부 클릭 감지
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isExpanded && sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
        setExpanded(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isExpanded, setExpanded]);

  return (
    <aside
      ref={sidebarRef}
      className="z-30 
      fixed top-(--header-height) left-0 
      h-[calc(100svh-var(--header-height))]/ 
      h-screen
      flex flex-col items-center gap-4 py-4
      overflow-hidden shrink-0"
      style={{ width: 80 }}
    >
      {/* 배경 레이어 */}
      <div ref={bgRef} className="absolute inset-0 -z-10 bg-background" style={{ opacity: 0 }} />

      {/* 테두리 레이어 (오른쪽 끝 1px 라인) */}
      <div ref={borderRef} className="absolute right-0 top-0 bottom-0 w-px bg-border" style={{ opacity: 0 }} />

      {/* Top */}
      <div className="flex flex-col items-start gap-4 w-full px-5">
        {/* 로고 */}
        <Link href="/" className="flex items-center gap-4 w-full cursor-pointer group">
          <Button
            variant="ghost"
            className="size-9 flex items-center justify-center rounded-lg text-2xl font-bold shrink-0
              border-2 border-black bg-white text-black
              group-hover:bg-black group-hover:text-white group-hover:border-black
              hover:bg-black hover:text-white hover:border-black
              dark:bg-black dark:text-white dark:border-white
              dark:group-hover:bg-white dark:group-hover:text-black dark:group-hover:border-white
              dark:hover:bg-white dark:hover:text-black dark:hover:border-white"
          >
            t
          </Button>
          <span
            className="sidebar-label hidden font-medium whitespace-nowrap relative
            after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 
            after:bg-black dark:after:bg-white
            after:transition-all after:duration-300 group-hover:after:w-full"
          >
            홈
          </span>
        </Link>

        {/* 메뉴 */}
        <Link href="/shows/now" className="flex items-center gap-4 w-full cursor-pointer group">
          <Button
            variant="secondary"
            size="icon"
            className="size-9 rounded-lg shrink-0
              bg-gray-900 group-hover:bg-white
              [&_svg]:fill-white [&_svg]:stroke-white
              group-hover:[&_svg]:fill-black group-hover:[&_svg]:stroke-black
              dark:bg-white dark:group-hover:bg-gray-900
              dark:[&_svg]:fill-black dark:[&_svg]:stroke-black
              dark:group-hover:[&_svg]:fill-white dark:group-hover:[&_svg]:stroke-white"
          >
            <LayoutGrid className="size-5" />
          </Button>
          <span
            className="sidebar-label hidden font-medium whitespace-nowrap relative
            after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 
            after:bg-black dark:after:bg-white
            after:transition-all after:duration-300 group-hover:after:w-full"
          >
            공연 목록
          </span>
        </Link>
      </div>

      <div className="w-full px-5">
        <Separator className="bg-muted-foreground" />
      </div>

      {/* 추천 아티스트 */}
      <div className="flex flex-col items-start gap-4 w-full px-5">
        <div className="flex flex-col gap-4 w-full">
          {RECOMMEND_ARTIST_LIST.map((artist) => (
            <Link
              key={artist.artistId}
              href={`/artists/${artist.artistId}`}
              className="flex items-center gap-4 w-full cursor-pointer group no-underline text-foreground"
            >
              <Avatar className="size-9 rounded-lg shrink-0 transition-transform">
                <AvatarImage src={artist.profileImageUrl} className="object-cover" />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
              <span
                className="sidebar-label hidden font-medium whitespace-nowrap relative
                after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 
                after:bg-black dark:after:bg-white
                after:transition-all after:duration-300 group-hover:after:w-full"
              >
                {artist.artistName}
              </span>
            </Link>
          ))}
        </div>
      </div>

      <div className="w-full px-5">
        <Separator className="bg-muted-foreground" />
      </div>

      {/* Bottom Icons */}
      <div className="flex flex-col gap-4 pb-6 w-full px-5">
        <Link href="/my/favorite" className="flex items-center gap-4 w-full cursor-pointer group">
          <Button
            variant="secondary"
            size="icon"
            className="size-9 rounded-lg shrink-0
              bg-gray-900 group-hover:bg-white
              [&_svg]:fill-white [&_svg]:stroke-white
              group-hover:[&_svg]:fill-black group-hover:[&_svg]:stroke-black
              dark:bg-white dark:group-hover:bg-gray-900
              dark:[&_svg]:fill-black dark:[&_svg]:stroke-black
              dark:group-hover:[&_svg]:fill-white dark:group-hover:[&_svg]:stroke-white"
          >
            <Heart className="size-5" />
          </Button>
          <span
            className="sidebar-label hidden font-medium whitespace-nowrap relative
            after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 
            after:bg-black dark:after:bg-white
            after:transition-all after:duration-300 group-hover:after:w-full"
          >
            즐겨찾기
          </span>
        </Link>

        {/* <div className="flex items-center gap-4 w-full cursor-pointer group">
          <Button
            variant="secondary"
            size="icon"
            className="size-9 rounded-lg shrink-0
              bg-gray-900 group-hover:bg-white
              [&_svg]:fill-white [&_svg]:stroke-white
              group-hover:[&_svg]:fill-black group-hover:[&_svg]:stroke-black
              dark:bg-white dark:group-hover:bg-gray-900
              dark:[&_svg]:fill-black dark:[&_svg]:stroke-black
              dark:group-hover:[&_svg]:fill-white dark:group-hover:[&_svg]:stroke-white"
          >
            <MessageSquare className="size-5" />
          </Button>
          <span
            className="sidebar-label hidden font-medium whitespace-nowrap relative
            after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 
            after:bg-black dark:after:bg-white
            after:transition-all after:duration-300 group-hover:after:w-full"
          >
            라이브 채팅
          </span>
        </div> */}
      </div>
    </aside>
  );
}
