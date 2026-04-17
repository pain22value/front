"use client";

import { Button } from "@/components/ui/button";
import { Heart, LayoutGrid, MessageSquare } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { useSidebarStore } from "@/shared/hooks/useSidebarStore";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Link from "next/link";
import useShowDetail from "@/features/show/hooks/useShowDetail";
import useMyMembershipQuery from "@/features/my/hooks/useMyMembershipQuery";

export default function Sidebar() {
  const { isExpanded, setExpanded } = useSidebarStore();
  const [isHovered, setIsHovered] = useState(false);
  const sidebarRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const borderRef = useRef<HTMLDivElement>(null);

  // 데이터 패칭
  const { data: showData } = useShowDetail(1);
  const { data: membershipData } = useMyMembershipQuery();

  // 기본 아티스트 (킹키부츠 출연진 중 상위 4명)
  const baseArtists =
    showData?.castings.slice(0, 4).map((c) => ({
      artistId: c.artistId,
      artistName: c.artistName,
      profileImageUrl: c.profileImageUrl,
    })) || [];

  // 멤버십 아티스트
  const membershipArtists =
    membershipData?.memberships.map((m) => ({
      artistId: m.artistId,
      artistName: m.artistName,
      profileImageUrl: m.profileImageUrl,
    })) || [];

  // 중복 제거 및 리스트 합치기
  const allSidebarArtists = [...baseArtists];
  membershipArtists.forEach((ma) => {
    if (!allSidebarArtists.find((ba) => ba.artistId === ma.artistId)) {
      allSidebarArtists.push(ma);
    }
  });

  const isSidebarVisible = isExpanded || isHovered;

  // 메뉴 클릭 시 사이드바 접기
  const handleMenuClick = () => {
    setExpanded(false);
    setIsHovered(false);
  };

  useEffect(() => {
    if (!sidebarRef.current) return;

    // 사이드바 너비 애니메이션
    gsap.to(sidebarRef.current, {
      width: isSidebarVisible ? 220 : 80,
      duration: 0.4,
      ease: "power3.inOut",
    });

    // 배경 및 테두리 투명도 애니메이션 (색상 번짐 방지)
    if (bgRef.current) {
      gsap.to(bgRef.current, {
        opacity: isSidebarVisible ? 1 : 0,
        duration: 0.4,
        ease: "power3.inOut",
      });
    }
    if (borderRef.current) {
      gsap.to(borderRef.current, {
        opacity: isSidebarVisible ? 1 : 0,
        duration: 0.4,
        ease: "power3.inOut",
      });
    }

    // 레이블 애니메이션
    const labels = sidebarRef.current.querySelectorAll(".sidebar-label");
    gsap.to(labels, {
      opacity: isSidebarVisible ? 1 : 0,
      x: isSidebarVisible ? 0 : -20,
      duration: 0.3,
      stagger: 0.05,
      ease: "power2.out",
      display: isSidebarVisible ? "block" : "none",
    });
  }, [isSidebarVisible]);

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
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
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
        <Link href="/" className="flex items-center gap-4 w-full cursor-pointer group" onClick={handleMenuClick}>
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
        <Link href="/shows" className="flex items-center gap-4 w-full cursor-pointer group" onClick={handleMenuClick}>
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
          {(!showData && !membershipData) || allSidebarArtists.length === 0
            ? Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="flex items-center gap-4 w-full">
                  <Skeleton className="size-9 rounded-lg shrink-0" />
                  <Skeleton className="sidebar-label hidden h-4 w-20" />
                </div>
              ))
            : allSidebarArtists.slice(0, 4).map((artist) => (
                <Link
                  key={artist.artistId}
                  href={`/artists/${artist.artistId}`}
                  className="flex items-center gap-4 w-full cursor-pointer group no-underline text-foreground"
                  onClick={handleMenuClick}
                >
                  <Avatar className="size-9 rounded-lg shrink-0 transition-all group-hover:ring-2 group-hover:ring-white group-hover:opacity-80">
                    <AvatarImage src={artist.profileImageUrl} className="object-cover" />
                    <AvatarFallback>{artist.artistName.slice(0, 1)}</AvatarFallback>
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
        <Link
          href="/my/favorite"
          className="flex items-center gap-4 w-full cursor-pointer group"
          onClick={handleMenuClick}
        >
          <Button
            variant="secondary"
            size="icon"
            className="size-9 rounded-lg shrink-0
              bg-gray-900 group-hover:bg-white
              dark:bg-white dark:group-hover:bg-gray-900"
          >
            <Heart className="size-5 text-red-500 fill-red-500 transition-colors" />
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

        <Link href="/chat" className="flex items-center gap-4 w-full cursor-pointer group" onClick={handleMenuClick}>
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
        </Link>
      </div>
    </aside>
  );
}
