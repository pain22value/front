"use client";

import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function JoinSection({ actor }: { actor: Actor }) {
  return (
    <div className="space-y-6 py-6 font-geist">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-medium">{actor.name}</h1>
      <div className="flex items-center gap-4">
        <Link href={`/actors/${actor.id}/membership`}>
          <Button
            size="lg"
            className="relative px-8 py-6 text-xl font-bold bg-white text-black hover:bg-white/90 border-none transition-colors"
          >
            멤버십 가입하기
          </Button>
        </Link>
        <Heart className="text-slate-300 fill-slate-300 w-8 h-8 transition-colors duration-300 hover:text-red-400 hover:fill-red-400 cursor-pointer" />
      </div>
    </div>
  );
}
