"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { actors } from "@/shared/data/actors";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

export default function HomeActorsSection() {
  return (
    <section className="w-full max-w-[1200] mx-auto space-y-8 rounded-2xl border bg-background p-6">
      {/* 아티스트와 라이브 채팅 안내 */}
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold">아티스트와 라이브 채팅을 시작해보세요!</h2>
        <Button variant="ghost" className="gap-1 text-muted-foreground">
          더보기 <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      {/* 배우 목록 */}
      <div className="flex gap-3 flex-wrap pb-2">
        {actors.slice(0, 50).map((actor) => (
          <Link
            key={actor.id}
            href={`/actors/${actor.id}`}
            className="flex shrink-0 items-center gap-3 rounded-full border px-4 py-2 transition hover:bg-accent no-underline text-foreground"
          >
            <Avatar className="h-10 w-10">
              <AvatarImage src={actor.image} alt={actor.name} />
              <AvatarFallback>{actor.name.slice(0, 1)}</AvatarFallback>
            </Avatar>
            <span className="whitespace-nowrap text-sm font-medium">{actor.name}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
