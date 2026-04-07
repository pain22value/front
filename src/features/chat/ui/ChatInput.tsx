"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send, Smile } from "lucide-react";

export function ChatInput() {
  return (
    <footer className="p-4 bg-white border-t shrink-0">
      <div className="relative flex items-center gap-2 max-w-5xl mx-auto bg-slate-100 rounded-lg px-4 py-1.5">
        <Input
          placeholder="message"
          className="border-none bg-transparent focus-visible:ring-0 shadow-none text-sm"
        />
        <Smile className="w-5 h-5 text-slate-400 cursor-pointer hover:text-slate-600" />
        <Button size="sm" className="bg-[#1e2329] hover:bg-black text-white px-4 py-2 h-9 flex gap-2">
          <Send className="w-4 h-4" />
          전송하기
        </Button>
      </div>
    </footer>
  );
}
