"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";

export function ChatMessages({
  chat,
}: {
  chat: {
    name: string;
    message: string;
    profileImg?: string;
  };
}) {
  return (
    <ScrollArea className="flex-1 p-6 bg-muted/30">
      <div className="text-center text-xs text-muted-foreground mb-6">2026.02.25. (수)</div>

      {/* Artist Message */}
      <div className="flex items-start gap-3 mb-4">
        <Avatar className="w-10 h-10 border">
          {chat.profileImg && <AvatarImage src={chat.profileImg} />}
          <AvatarFallback>{chat.name[0]}</AvatarFallback>
        </Avatar>
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-sm font-bold text-foreground">{chat.name}</span>
            <span className="bg-cyan-100 text-[10px] text-cyan-600 dark:bg-cyan-900/30 dark:text-cyan-400 px-1.5 py-0.5 rounded font-bold">ARTIST</span>
          </div>
          <div className="flex items-end gap-2">
            <div className="bg-primary text-primary-foreground px-4 py-2 rounded-2xl rounded-tl-none text-sm leading-relaxed">
              {chat.message}
            </div>
            <span className="text-[10px] text-muted-foreground">오후 8:20</span>
          </div>
        </div>
      </div>


      {/* User Message */}
      <div className="flex flex-col items-end gap-2 mb-4">
        <div className="flex items-end gap-2">
          <span className="text-[10px] text-muted-foreground font-medium">오후 8:20</span>
          <div className="bg-background text-foreground border px-4 py-2 rounded-2xl rounded-tr-none text-sm shadow-sm">안녕하세요</div>
        </div>
      </div>
    </ScrollArea>
  );
}
