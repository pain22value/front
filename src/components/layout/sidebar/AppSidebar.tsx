"use client";

import * as React from "react";
import { Command } from "lucide-react";
// import { BookOpen, Bot, Command, Frame, LifeBuoy, Map, PieChart, Send, Settings2, SquareTerminal } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Menu, Plus, ShoppingBag, Wallet } from "lucide-react";
import { recommendedCommunities } from "@/shared/data/sidebar";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar className="top-(--header-height) h-[calc(100svh-var(--header-height))]!" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <Command className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">Truve Inc</span>
                  <span className="truncate text-xs">Enterprise</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        {/* Header */}
        <div className="flex items-center gap-2 py-4">
          <div className="rounded-xl border border-cyan-400 p-2">
            <Menu />
          </div>
          <span className="text-xl font-bold">weverse</span>
        </div>

        <Separator className="my-4 bg-white/10" />

        {/* Login Section */}
        <div className="space-y-3">
          <p className="text-sm text-white/60">
            로그인하고
            <br />
            나만의 아티스트를 만나보세요!
          </p>
          <Button className="w-full border border-cyan-400 bg-transparent text-cyan-400 hover:bg-cyan-400/10">
            로그인
          </Button>
        </div>

        <Separator className="my-6 bg-white/10" />

        {/* Recommended */}
        <div className="space-y-4">
          <p className="text-sm text-white/50">추천 커뮤니티</p>

          <button className="flex items-center gap-3 text-left">
            <div className="flex h-8 w-8 items-center justify-center rounded-full border border-white/20">
              <Plus size={16} />
            </div>
            <span>커뮤니티 찾기</span>
          </button>

          {recommendedCommunities.map((item) => (
            <div key={item.name} className="flex items-center gap-3">
              <Image src={item.icon} alt={item.name} width={28} height={28} className="rounded-full" />
              <span>{item.name}</span>
            </div>
          ))}
        </div>

        <Separator className="my-6 bg-white/10" />

        {/* Quick Links */}
        <div className="space-y-4">
          <p className="text-sm text-white/50">서비스 바로가기</p>

          <div className="flex items-center gap-3">
            <ShoppingBag size={18} />
            <span>Shop</span>
          </div>

          <div className="flex items-center gap-3">
            <Wallet size={18} />
            <span>Jelly Shop</span>
          </div>
        </div>
        {/*  */}
        {/*  */}
      </SidebarContent>
      <SidebarFooter></SidebarFooter>
    </Sidebar>
  );
}
