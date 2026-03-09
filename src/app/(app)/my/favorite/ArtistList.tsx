import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { artists } from "@/shared/data/artists";
import { Heart } from "lucide-react"; // 하트 아이콘을 위해 lucide-react 사용

// interface Artist {
//   id: number;
//   name: string;
//   imageUrl: string;
//   isMembershipActive: boolean;
// }

// const artists: Artist[] = [
//   { id: 1, name: "고은성", imageUrl: "/path/to/image1.jpg", isMembershipActive: true },
//   { id: 2, name: "강홍석", imageUrl: "/path/to/image2.jpg", isMembershipActive: false },
//   { id: 3, name: "김준수", imageUrl: "/path/to/image3.jpg", isMembershipActive: false },
//   { id: 4, name: "정선아", imageUrl: "/path/to/image4.jpg", isMembershipActive: true },
//   // ... 나머지 데이터
// ];

export default function ArtistList() {
  return (
    <div className="w-full max-w-[850] mx-auto mt-10">
      <h2 className="text-2xl font-bold p-4">즐겨찾기</h2>
      <div className="divide-y divide-gray-100 mt-8">
        {artists.map((artist) => (
          <div key={artist.id} className="flex items-center justify-between p-4 hover:bg-slate-50 transition-colors">
            <div className="flex items-center space-x-4">
              <Avatar className="h-12 w-12 border">
                <AvatarImage src={artist.image} alt={artist.name} className="object-cover" />
                <AvatarFallback>{artist.name[0]}</AvatarFallback>
              </Avatar>
              <span className="text-lg font-medium text-slate-900">{artist.name}</span>
            </div>

            <div className="flex items-center space-x-3">
              {artist.isMember && (
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
