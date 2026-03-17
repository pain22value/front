import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ACTOR_LIST } from "@/shared/data/actors";
import { Heart } from "lucide-react"; // 하트 아이콘을 위해 lucide-react 사용

export default function ActorList() {
  return (
    <div className="w-full max-w-[850] mx-auto mt-10">
      <h2 className="text-2xl font-bold p-4">즐겨찾기</h2>
      <div className="divide-y divide-gray-100 mt-8">
        {ACTOR_LIST.map((actor) => (
          <div key={actor.id} className="flex items-center justify-between p-4 hover:bg-slate-50 transition-colors">
            <div className="flex items-center space-x-4">
              <Avatar className="h-12 w-12 border">
                <AvatarImage src={actor.image} alt={actor.name} className="object-cover" />
                <AvatarFallback>{actor.name[0]}</AvatarFallback>
              </Avatar>
              <span className="text-lg font-medium text-slate-900">{actor.name}</span>
            </div>

            <div className="flex items-center space-x-3">
              {actor.isMember && (
                <Badge variant="outline" className="text-teal-500 border-teal-500 bg-teal-50 px-3 py-1 font-normal">
                  멤버십 가입중
                </Badge>
              )}
              <Button variant="ghost" size="icon" className="hover:bg-transparent">
                <Heart className="h-6 w-6 fill-slate-800 text-slate-800" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
