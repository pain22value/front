import { Heart, MessageCircle, Share2, MoreHorizontal } from "lucide-react";
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

export default function MusicalPostCard({ postId, onClick }: { postId: number; onClick?: (postId: number) => void }) {
  return (
    <Card
      className="w-full bg-white dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 shadow-sm cursor-pointer hover:shadow-md transition-shadow"
      onClick={() => onClick?.(postId)}
    >
      {/* Header */}
      <CardHeader className="flex flex-row items-center justify-between p-4 space-y-0">
        <div className="flex items-center space-x-3">
          <Avatar className="h-10 w-10 border border-zinc-100">
            <AvatarImage src="/api/placeholder/40/40" alt="고은성" />
            <AvatarFallback>고</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="text-sm font-bold text-zinc-900 dark:text-zinc-100">고은성</span>
            <span className="text-xs text-zinc-500">03. 24. 13:32</span>
          </div>
        </div>
        <Button variant="ghost" size="icon" className="text-zinc-500">
          <MoreHorizontal className="h-5 w-5" />
        </Button>
      </CardHeader>

      {/* Content Text */}
      <div className="px-4 pb-3">
        <p className="text-[15px] leading-relaxed text-zinc-800 dark:text-zinc-200">
          데스노트 무대 인사: 3/10(화) 공연 종료 후
        </p>
      </div>

      {/* Image Grid (4-Panel Style) */}
      <CardContent className="p-0">
        <div className="grid grid-cols-2 gap-[2px] bg-zinc-100 overflow-hidden">
          {/* Top Left - Portrait */}
          <div className="aspect-square overflow-hidden bg-zinc-200">
            <img
              src="/api/placeholder/400/400"
              alt="데스노트 프로필"
              className="w-full h-full object-cover transition-hover hover:opacity-90 cursor-pointer"
            />
          </div>
          {/* Top Right - Stage holding book */}
          <div className="aspect-square overflow-hidden bg-zinc-200">
            <img
              src="/api/placeholder/400/400"
              alt="무대 위 고은성"
              className="w-full h-full object-cover transition-hover hover:opacity-90 cursor-pointer"
            />
          </div>
          {/* Bottom Left - Rainy scene */}
          <div className="aspect-square overflow-hidden bg-zinc-200">
            <img
              src="/api/placeholder/400/400"
              alt="데스노트 장면"
              className="w-full h-full object-cover transition-hover hover:opacity-90 cursor-pointer"
            />
          </div>
          {/* Bottom Right - Selfie with co-star */}
          <div className="aspect-square overflow-hidden bg-zinc-200 relative">
            <img
              src="/api/placeholder/400/400"
              alt="대기실 셀카"
              className="w-full h-full object-cover transition-hover hover:opacity-90 cursor-pointer"
            />
          </div>
        </div>
      </CardContent>

      {/* Footer Actions */}
      <CardFooter className="p-3 flex flex-col items-start gap-3">
        <div className="flex items-center space-x-4 w-full">
          <div className="flex items-center space-x-1 cursor-pointer text-zinc-600 hover:text-red-500 transition-colors">
            <Heart className="h-5 w-5" />
            <span className="text-sm font-medium">1,000</span>
          </div>
          <div className="flex items-center space-x-1 cursor-pointer text-zinc-600 hover:text-blue-500 transition-colors">
            <MessageCircle className="h-5 w-5" />
            <span className="text-sm font-medium">500</span>
          </div>
          <div className="ml-auto">
            <Share2 className="h-5 w-5 text-zinc-600 cursor-pointer hover:text-zinc-900" />
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
