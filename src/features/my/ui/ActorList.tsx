import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ARTIST_LIST } from "@/shared/data/artists";
import { Heart } from "lucide-react"; // 하트 아이콘을 위해 lucide-react 사용

export default function ActorList() {
  return (
    <div className="w-full mt-10">
      <h2 className="text-2xl font-bold p-4">즐겨찾기</h2>
      <div className="divide-y divide-gray-100 mt-8">
        {ARTIST_LIST.map((artist) => (
          <div
            key={artist.artistId}
            className="flex items-center justify-between p-4 hover:bg-slate-50 transition-colors"
          >
            <div className="flex items-center space-x-4">
              <Avatar className="h-12 w-12 border">
                <AvatarImage src={artist.profileImageUrl} alt={artist.artistName} className="object-cover" />
                <AvatarFallback>{artist.artistName[0]}</AvatarFallback>
              </Avatar>
              <span className="text-lg font-medium text-slate-900">{artist.artistName}</span>
            </div>

            <div className="flex items-center space-x-3">
              <Button variant="ghost" size="icon" className="hover:bg-transparent">
                <Heart
                  className={`h-6 w-6 ${artist.isLiked ? "fill-pink-500 text-pink-500" : "fill-slate-800 text-slate-800"}`}
                />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
