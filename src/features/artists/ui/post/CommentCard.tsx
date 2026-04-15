
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, MessageCircle } from "lucide-react";
import { AVATAR_URL } from "@/shared/constants/avatar";
import ArtistCheckIcon from "./ArtistCheckIcon";
import { useLikeArtistComment, useUnlikeArtistComment } from "../../hooks/useArtistPostMutations";

export default function CommentCard({
  comment,
  artistId,
  postId,
  onClick,
}: {
  comment: ArtistComment;
  artistId: string | number;
  postId: number | string;
  onClick?: () => void;
}) {
  const { authorName, authorThumbnailUrl, createdAt, content, likeCount, replyCount, isArtist, likedByMe, commentId } =
    comment;

  const { mutate: likeComment } = useLikeArtistComment(artistId, postId);
  const { mutate: unlikeComment } = useUnlikeArtistComment(artistId, postId);

  const handleLikeClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (likedByMe) {
      unlikeComment(commentId);
    } else {
      likeComment(commentId);
    }
  };

  return (
    <Card
      onClick={onClick}
      className={`border-border shadow-none rounded-lg bg-background hover:bg-muted/50 overflow-hidden ${onClick ? "cursor-pointer active:scale-[0.98]" : ""} transition-all`}
    >
      <CardContent className="p-5">
        <div className="flex gap-3">
          <Avatar className="w-12 h-12 border border-border">
            <AvatarImage src={authorThumbnailUrl || AVATAR_URL} />
            <AvatarFallback>{authorName[0]}</AvatarFallback>
          </Avatar>

          <div className="flex-1 space-y-2">
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-[15px] text-foreground">{authorName}</span>
              {isArtist && (
                <div className="flex items-center justify-center">
                  <ArtistCheckIcon />
                </div>
              )}
              <span className="text-muted-foreground text-sm ml-1">{new Date(createdAt).toLocaleDateString()}</span>
            </div>

            <p className="text-[15px] leading-relaxed text-foreground/90">{content}</p>

            <div className="flex items-center gap-4 pt-1">
              <div
                onClick={handleLikeClick}
                className={`flex items-center gap-1.5 cursor-pointer transition-colors ${
                  likedByMe ? "text-red-500" : "text-muted-foreground hover:text-red-500"
                }`}
              >
                <Heart className={`w-5 h-5 ${likedByMe ? "fill-current" : ""}`} strokeWidth={1.5} />
                <span className="text-sm font-medium">{likeCount.toLocaleString()}</span>
              </div>
              <div className="flex items-center gap-1.5 text-muted-foreground cursor-pointer hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
                <MessageCircle className="w-5 h-5" strokeWidth={1.5} />
                {replyCount > 0 && <span className="text-sm font-medium">{replyCount}</span>}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
