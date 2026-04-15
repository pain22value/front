import { useState } from "react";
import { Heart, MessageCircle, Share2, MoreHorizontal } from "lucide-react";
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useLikeArtistPost, useUnlikeArtistPost } from "../../hooks/useArtistPostMutations";

export default function ArtistPostCard({ post, onClick }: { post: ArtistPost; onClick?: (postId: number) => void }) {
  const { postId, artistName, artistThumbnailUrl, createdAt, imageUrls, likeCount, commentCount, likedByMe } = post;
  const params = useParams();
  const artistId = params.artistId as string;

  const { mutate: likePost } = useLikeArtistPost(artistId);
  const { mutate: unlikePost } = useUnlikeArtistPost(artistId);

  const [localLiked, setLocalLiked] = useState(likedByMe);
  const [localLikeCount, setLocalLikeCount] = useState(likeCount);

  const handleLikeClick = (e: React.MouseEvent) => {
    e.stopPropagation();

    // Optimistic local update
    const newLiked = !localLiked;
    setLocalLiked(newLiked);
    setLocalLikeCount((prev) => (newLiked ? prev + 1 : prev - 1));

    if (localLiked) {
      unlikePost(postId);
    } else {
      likePost(postId);
    }
  };

  return (
    <Card
      className="w-full bg-white dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 
      cursor-pointer shadow-none hover:shadow-md transition-shadow group"
      onClick={() => onClick?.(postId)}
    >
      {/* Header */}
      <CardHeader className="flex flex-row items-center justify-between p-4 space-y-0">
        <div className="flex items-center space-x-3">
          <Avatar className="h-10 w-10 border border-zinc-100">
            <AvatarImage src={artistThumbnailUrl} alt={artistName} />
            <AvatarFallback>{artistName[0]}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="text-sm font-bold text-zinc-900 dark:text-zinc-100">{artistName}</span>
            <span className="text-xs text-zinc-500">{new Date(createdAt).toLocaleDateString()}</span>
          </div>
        </div>
        <Button variant="ghost" size="icon" className="text-zinc-500" onClick={(e) => e.stopPropagation()}>
          <MoreHorizontal className="h-5 w-5" />
        </Button>
      </CardHeader>

      {/* Content Text */}
      <div className="px-4 pb-3">
        <p className="text-[15px] leading-relaxed text-zinc-800 dark:text-zinc-200">{post.content}</p>
      </div>

      {/* Image Grid (4-Panel Style) */}
      <CardContent className="p-0">
        <div className="grid grid-cols-2 gap-[2px] bg-zinc-100 overflow-hidden">
          {imageUrls.slice(0, 4).map((src, idx) => (
            <div key={idx} className="aspect-square overflow-hidden bg-zinc-200 relative">
              <Image src={src} alt={`포스트 이미지 ${idx + 1}`} fill className="object-cover" />
            </div>
          ))}
        </div>
      </CardContent>

      {/* Footer Actions */}
      <CardFooter className="p-3 flex flex-col items-start gap-3">
        <div className="flex items-center space-x-4 w-full">
          <div
            className={`flex items-center space-x-1 cursor-pointer transition-colors ${localLiked ? "text-red-500" : "text-zinc-600 hover:text-red-500"}`}
            onClick={handleLikeClick}
          >
            <Heart className={`h-5 w-5 ${localLiked ? "fill-current" : ""}`} />
            <span className="text-sm font-medium">{localLikeCount.toLocaleString()}</span>
          </div>
          <div className="flex items-center space-x-1 cursor-pointer text-zinc-600 hover:text-blue-500 transition-colors">
            <MessageCircle className="h-5 w-5" />
            <span className="text-sm font-medium">{commentCount.toLocaleString()}</span>
          </div>
          <div className="ml-auto" onClick={(e) => e.stopPropagation()}>
            <Share2 className="h-5 w-5 text-zinc-600 cursor-pointer hover:text-zinc-900" />
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}

export const ArtistPostCardSkeleton = () => (
  <Card className="w-full bg-white dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 shadow-sm">
    <CardHeader className="flex flex-row items-center space-x-3 p-4">
      <Skeleton className="h-10 w-10 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-3 w-16" />
      </div>
    </CardHeader>
    <div className="px-4 pb-3">
      <Skeleton className="h-4 w-3/4" />
    </div>
    <CardContent className="p-0">
      <Skeleton className="aspect-square w-full" />
    </CardContent>
  </Card>
);
