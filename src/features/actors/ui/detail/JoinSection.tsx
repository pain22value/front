import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function JoinSection({ actor }: { actor: Actor }) {
  const isMember = actor.isMember ?? false;

  return (
    <div className="space-y-6 py-6">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-medium">{actor.name}</h1>
      <div className="flex items-center gap-4">
        {isMember ? (
          <Button
            size="lg"
            className="relative px-8 py-6 text-xl font-bold bg-white text-black hover:bg-white/90 border-none transition-colors"
          >
            멤버십 가입완료
          </Button>
        ) : (
          <Button
            size="lg"
            className="relative px-8 py-6 text-xl font-bold bg-white text-black hover:bg-white/90 border-none transition-colors"
          >
            멤버십 가입하기
          </Button>
        )}
        <Heart className="text-slate-300 fill-slate-300 w-8 h-8 transition-colors duration-300 hover:text-red-400 hover:fill-red-400 cursor-pointer" />
      </div>
    </div>
  );
}
