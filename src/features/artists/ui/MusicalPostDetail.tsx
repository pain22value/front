"use client";

import { ArrowLeft, Heart, MessageCircle, Share2, MoreHorizontal } from "lucide-react";
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";

export default function MusicalPostDetail({ post, onBack }: { post: ArtistPost; onBack: () => void }) {
  if (!post) return null;

  const { artistName, artistThumbnailUrl, createdAt, content, imageUrls, likeCount, commentCount, likedByMe } = post;

  return (
    <div className="animate-in fade-in duration-500">
      {/* 뒤로가기 버튼 */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-sm text-zinc-500 hover:text-zinc-900 transition-colors mb-6"
      >
        <ArrowLeft className="size-4" />
        목록으로
      </button>

      <Card className="w-full bg-white dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 shadow-sm/ shadow-none">
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
          <Button variant="ghost" size="icon" className="text-zinc-500">
            <MoreHorizontal className="h-5 w-5" />
          </Button>
        </CardHeader>

        {/* Content Text */}
        <div className="px-4 pb-3">
          <p className="text-[15px] leading-relaxed text-zinc-800 dark:text-zinc-200">{content}</p>
        </div>

        {/* Image Grid (4-Panel Style) */}
        <CardContent className="p-0">
          <div className="grid grid-cols-2 gap-[2px] bg-zinc-100 overflow-hidden">
            {imageUrls.map((src, idx) => (
              <div key={idx} className="aspect-square overflow-hidden bg-zinc-200 relative">
                <Image
                  src={src}
                  alt={`이미지 ${idx + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </CardContent>

        {/* Footer Actions */}
        <CardFooter className="p-3 flex flex-col items-start gap-3">
          <div className="flex items-center space-x-4 w-full">
            <div className={`flex items-center space-x-1 cursor-pointer transition-colors ${likedByMe ? 'text-red-500' : 'text-zinc-600 hover:text-red-500'}`}>
              <Heart className={`h-5 w-5 ${likedByMe ? 'fill-current' : ''}`} />
              <span className="text-sm font-medium">{likeCount.toLocaleString()}</span>
            </div>
            <div className="flex items-center space-x-1 cursor-pointer text-zinc-600 hover:text-blue-500 transition-colors">
              <MessageCircle className="h-5 w-5" />
              <span className="text-sm font-medium">{commentCount.toLocaleString()}</span>
            </div>
            <div className="ml-auto">
              <Share2 className="h-5 w-5 text-zinc-600 cursor-pointer hover:text-zinc-900" />
            </div>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}

export const MusicalPostDetailSkeleton = ({ onBack }: { onBack: () => void }) => (
  <div>
    <button onClick={onBack} className="flex items-center gap-2 text-sm text-zinc-500 mb-6">
      <ArrowLeft className="size-4" />
      목록으로
    </button>
    <Skeleton className="h-[500px] w-full rounded-xl" />
  </div>
);
