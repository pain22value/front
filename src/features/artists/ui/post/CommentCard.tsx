import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, MessageCircle } from "lucide-react";
import { AVATAR_URL } from "@/shared/constants/avatar";
import ArtistCheckIcon from "./ArtistCheckIcon";

export default function CommentCard({ comment, onClick }: { comment: CommentData; onClick?: () => void }) {
  return (
    <Card 
      onClick={onClick}
      className="border-border shadow-none rounded-lg bg-background hover:bg-muted/50 overflow-hidden cursor-pointer active:scale-[0.98] transition-all"
    >
      <CardContent className="p-5">
        <div className="flex gap-3">
          <Avatar className="w-12 h-12 border border-border">
            <AvatarImage src={comment.avatarUrl || AVATAR_URL} />
            <AvatarFallback>{comment.author[0]}</AvatarFallback>
          </Avatar>

          <div className="flex-1 space-y-2">
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-[15px] text-foreground">{comment.author}</span>
              {comment.isArtist && (
                <div className="flex items-center justify-center">
                  <ArtistCheckIcon />
                </div>
              )}
              <span className="text-muted-foreground text-sm ml-1">{comment.date}</span>
            </div>

            <p className="text-[15px] leading-relaxed text-foreground/90">
              {comment.mention && (
                <span className="font-bold mr-1 text-foreground">@{comment.mention}</span>
              )}
              {comment.content}
            </p>

            <div className="flex items-center gap-4 pt-1">
              <div className="flex items-center gap-1.5 text-muted-foreground cursor-pointer hover:text-red-500 transition-colors">
                <Heart className="w-5 h-5" strokeWidth={1.5} />
                <span className="text-sm font-medium">{comment.likes}</span>
              </div>
              <div className="flex items-center gap-1.5 text-muted-foreground cursor-pointer hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
                <MessageCircle className="w-5 h-5" strokeWidth={1.5} />
                {comment.replies > 0 && <span className="text-sm font-medium">{comment.replies}</span>}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
