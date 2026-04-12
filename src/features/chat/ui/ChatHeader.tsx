"use client";

import { ChatMenu } from "./ChatMenu";

export function ChatHeader({ name, artistId }: { name: string; artistId: string | number }) {
  return (
    <header className="h-16 border-b flex items-center justify-between px-6 shrink-0">
      <div className="flex-1 text-center font-semibold">{name}</div>
      <ChatMenu artistId={artistId} />
    </header>
  );
}

