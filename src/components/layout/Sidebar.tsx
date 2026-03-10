"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { AvatarItem } from "../common/AvatarItem";
import { Separator } from "@/components/ui/separator";
import { artists } from "@/shared/data/artists";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useSidebarStore } from "@/shared/hooks/useSidebarStore";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import Link from "next/link";
import { LayoutGrid, Heart, MessageSquare } from "lucide-react";

export default function Sidebar() {
  return (
    <aside
      className="z-30 
      sticky/ fixed top-(--header-height) h-[calc(100svh-var(--header-height))] 
      flex w-20 flex-col items-center gap-4 border-r/ border-dashed/ bg-background/ py-4"
    >
      {/* Top */}
      <div className="flex flex-col items-start gap-4 w-full px-5">
        {/* 로고 */}
        <Link href="/" className="flex items-center gap-4 w-full cursor-pointer group">
          <Button
            variant="ghost"
            className="size-10 flex items-center justify-center rounded-lg text-3xl font-bold shrink-0
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
            className="sidebar-label hidden text-xl font-bold whitespace-nowrap relative
            after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 
            after:bg-black dark:after:bg-white
            after:transition-all after:duration-300 group-hover:after:w-full"
          >
            truve
          </span>
        </Link>

        {/* 메뉴 */}
        <Link href="/shows/now" className="flex items-center gap-4 w-full cursor-pointer group">
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
        </Link>
      </div>

      <div className="w-full px-5">
        <Separator className="bg-muted-foreground" />
      </div>

      {/* 배우 */}
      <div className="flex flex-col items-start gap-4 w-full px-5">
        <div className="flex flex-col gap-5 w-full">
          {artists.map((artist) => (
            <div key={artist.id} className="flex items-center gap-4 w-full cursor-pointer group">
              <Avatar className="size-10 rounded-lg shrink-0 transition-transform group-hover:scale-105">
                <AvatarImage src={artist.image} className="object-cover" />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
              <span
                className="sidebar-label hidden font-medium whitespace-nowrap relative
                after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 
                after:bg-black dark:after:bg-white
                after:transition-all after:duration-300 group-hover:after:w-full"
              >
                {artist.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="w-8">
        <Separator className="bg-gray-500/ bg-muted-foreground" />
      </div>

      {/* Bottom Icons */}
      <div className="flex flex-col gap-4 pb-6 w-full px-5">
        <Link href="/my/favorite" className="flex items-center gap-4 w-full cursor-pointer group">
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
        </Link>

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
