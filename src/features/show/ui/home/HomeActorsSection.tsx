"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { actors } from "@/shared/data/actors";
import { ChevronRight } from "lucide-react";

export default function HomeActorsSection() {
  return (
    <section className="w-full max-w-[1200] mx-auto space-y-8 rounded-2xl border bg-background p-6">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold">아티스트와 라이브 채팅을 시작해보세요!</h2>
        <Button variant="ghost" className="gap-1 text-muted-foreground">
          더보기 <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      {/* Artist List */}
      <div className="flex gap-3 overflow-x-auto pb-2">
        {actors.map((avatar) => (
          <button
            key={avatar.id}
            className="flex shrink-0 items-center gap-3 rounded-full border px-4 py-2 transition hover:bg-accent"
          >
            <Avatar className="h-10 w-10">
              <AvatarImage src={avatar.image} alt={avatar.name} />
              <AvatarFallback>{avatar.name.slice(0, 1)}</AvatarFallback>
            </Avatar>
            <span className="whitespace-nowrap text-sm font-medium">{avatar.name}</span>
          </button>
        ))}
      </div>
    </section>
  );
}
