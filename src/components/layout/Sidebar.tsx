"use client";

import { Button } from "@/components/ui/button";
import { Heart, LayoutGrid, MessageSquare } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { actors } from "@/shared/data/actors";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useSidebarStore } from "@/shared/hooks/useSidebarStore";
import { useEffect, useRef } from "react";
import gsap from "gsap";

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
      fixed top-(--header-height) h-[calc(100svh-var(--header-height))] 
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
        <div className="flex items-center gap-4 w-full cursor-pointer group">
          <Button
            variant="outline"
            className="size-10 flex items-center justify-center rounded-lg text-3xl font-bold shrink-0
              border-2 border-black bg-white text-black
              group-hover:bg-black group-hover:text-white group-hover:border-black
              dark:bg-black dark:text-white dark:border-white
              dark:group-hover:bg-white dark:group-hover:text-black dark:group-hover:border-black"
          >
            t
          </Button>
          <span
            className="sidebar-label hidden text-xl font-bold whitespace-nowrap relative
            after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 
            after:bg-black dark:after:bg-white
            after:transition-all after:duration-300 group-hover:after:w-full"
          >
            truve
          </span>
        </div>

        {/* 메뉴 */}
        <div className="flex items-center gap-4 w-full cursor-pointer group">
          <Button
            variant="secondary"
            size="icon"
            className="size-10 rounded-lg shrink-0
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
            전체 서비스
          </span>
        </div>

        {/* 배우 */}
        <div className="flex flex-col gap-5 w-full">
          {actors.map((actor) => (
            <div key={actor.id} className="flex items-center gap-4 w-full cursor-pointer group">
              <Avatar className="size-10 rounded-lg shrink-0 transition-transform group-hover:scale-105">
                <AvatarImage src={actor.image} className="object-cover" />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
              <span
                className="sidebar-label hidden font-medium whitespace-nowrap relative
                after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 
                after:bg-black dark:after:bg-white
                after:transition-all after:duration-300 group-hover:after:w-full"
              >
                {actor.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="w-full px-5">
        <Separator className="bg-muted-foreground" />
      </div>

      {/* Bottom Icons */}
      <div className="flex flex-col gap-4 pb-6 w-full px-5">
        <div className="flex items-center gap-4 w-full cursor-pointer group">
          <Button
            variant="secondary"
            size="icon"
            className="size-10 rounded-lg shrink-0
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
            관심 리스트
          </span>
        </div>

        <div className="flex items-center gap-4 w-full cursor-pointer group">
          <Button
            variant="secondary"
            size="icon"
            className="size-10 rounded-lg shrink-0
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
            피드백
          </span>
        </div>
      </div>
    </aside>
  );
}
