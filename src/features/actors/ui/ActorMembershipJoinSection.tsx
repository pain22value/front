"use client";

import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState } from "react";
import { useArtistLike } from "../../show/hooks/useArtistLike";

export default function ActorMembershipJoinSection({ actor }: { actor: Actor }) {
  // 좋아요 로컬 상태
  const [liked, setLiked] = useState(actor.isLiked ?? false);
  const [prevId, setPrevId] = useState(actor.id);
  const [prevIsLiked, setPrevIsLiked] = useState(actor.isLiked);

  // actor ID가 바뀌었거나 서버의 좋아요 상태가 변경되었을 때 로컬 상태 동기화
  if (actor.id !== prevId || actor.isLiked !== prevIsLiked) {
    setLiked(actor.isLiked ?? false);
    setPrevId(actor.id);
    setPrevIsLiked(actor.isLiked);
  }

  const { toggle, isPending } = useArtistLike(actor.id, liked);

  const handleLike = () => {
    setLiked((prev: boolean) => !prev);
    toggle();
  };

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
        <button
          onClick={handleLike}
          disabled={isPending}
          className="p-2 transition-transform active:scale-90 focus:outline-hidden"
        >
          <Heart
            className={`w-8 h-8 transition-colors duration-300 cursor-pointer ${
              liked ? "text-pink-500 fill-pink-500" : "text-slate-300 fill-slate-300 hover:text-pink-300 hover:fill-pink-300"
            }`}
          />
        </button>
      </div>
    </div>
  );
}
