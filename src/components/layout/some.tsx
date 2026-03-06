"use client";

import Image from "next/image";
import { Home, Grid2X2, Heart, MessageSquare } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const artists = [
  {
    name: "김호영",
    image: "/artists/kim-hoyeong.png",
  },
  {
    name: "이재환",
    image: "/artists/lee-jaehwan.png",
  },
  {
    name: "신재범",
    image: "/artists/shin-jaebeom.png",
  },
  {
    name: "강홍석",
    image: "/artists/kang-hongseok.png",
  },
];

export function Sidebar2() {
  return (
    <aside className="w-[280px] h-full bg-white border-r px-6 py-6 flex flex-col gap-6">
      {/* 상단 메뉴 */}
      <div className="flex flex-col gap-5">
        <MenuItem icon={<Home size={22} />} label="홈" />
        <MenuItem icon={<Grid2X2 size={22} />} label="공연 목록" />
      </div>

      <Separator />

      {/* 추천 아티스트 */}
      <div className="flex flex-col gap-4">
        <p className="text-sm text-muted-foreground font-medium">추천 아티스트</p>

        <div className="flex flex-col gap-4">
          {artists.map((artist) => (
            <ArtistItem key={artist.name} {...artist} />
          ))}
        </div>
      </div>

      <Separator />

      {/* 서비스 바로가기 */}
      <div className="flex flex-col gap-5">
        <p className="text-sm text-muted-foreground font-medium">서비스 바로가기</p>

        <MenuItem icon={<Heart size={22} />} label="즐겨찾기" />
        <MenuItem icon={<MessageSquare size={22} />} label="라이브 채팅" />
      </div>
    </aside>
  );
}

function MenuItem({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex items-center gap-4 cursor-pointer group">
      <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center group-hover:bg-muted/80">
        {icon}
      </div>
      <span className="text-base font-medium">{label}</span>
    </div>
  );
}

function ArtistItem({ name, image }: { name: string; image: string }) {
  return (
    <div className="flex items-center gap-3 cursor-pointer">
      <Image src={image} alt={name} width={36} height={36} className="rounded-lg object-cover" />
      <span className="text-sm font-medium">{name}</span>
    </div>
  );
}
