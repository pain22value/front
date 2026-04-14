"use client";

import { Heart, MessageCircle, ChevronLeft } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useArtistComments } from "../../hooks/useArtistPostQuery";
import { Skeleton } from "@/components/ui/skeleton";

export default function ArtistCommentDetail({
  artistId,
  postId,
  onBack,
}: {
  artistId: string | number;
  postId: number | null;
  onBack?: () => void;
}) {
  const { data, isLoading } = useArtistComments(artistId, postId, "ALL");

  if (isLoading) {
    return <ArtistCommentDetailSkeleton onBack={onBack} />;
  }

  if (!data || !data.comments || data.comments.length === 0) {
    return (
      <div className="w-full h-full bg-background pb-10">
        <header className="flex items-center p-4 border-b border-border">
          <ChevronLeft
            onClick={onBack}
            className="w-6 h-6 mr-2 cursor-pointer text-foreground"
          />
          <h1 className="text-lg font-bold">댓글 상세</h1>
        </header>
        <div className="p-8 text-center text-muted-foreground">
          댓글 정보를 불러올 수 없습니다.
        </div>
      </div>
    );
  }

  // 첫 번째 댓글을 메인으로 표시하고 나머지를 답글처럼 표시하는 UI 구성
  const { comments } = data;
  const mainComment = comments[0];
  const replies = comments.slice(1);

  return (
    <div className="w-full h-full bg-background pb-10 transition-colors overflow-y-auto animate-in slide-in-from-right duration-300">
      {/* Header */}
      <header className="flex items-center p-4 border-b border-border">
        <ChevronLeft
          onClick={onBack}
          className="w-6 h-6 mr-2 cursor-pointer text-foreground hover:text-muted-foreground transition-colors"
        />
        <h1
          onClick={onBack}
          className="text-lg font-bold cursor-pointer text-foreground hover:text-muted-foreground transition-colors"
        >
          전체 댓글 보기
        </h1>
      </header>

      <div className="p-4">
        {/* Main Post/Comment */}
        <Card className="border-border border-none shadow-sm mb-6 bg-card text-card-foreground">
          <CardHeader className="flex flex-row items-center space-x-3 p-4">
            <Avatar className="w-12 h-12">
              <AvatarImage src={mainComment.authorThumbnailUrl} alt={mainComment.authorName} />
              <AvatarFallback>{mainComment.authorName[0]}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <div className="flex items-center gap-1">
                <span className="font-bold">{mainComment.authorName}</span>
                {mainComment.isArtist && (
                  <div className="w-4 h-4 bg-cyan-400 rounded-full flex items-center justify-center">
                    <span className="text-[10px] text-white">✓</span>
                  </div>
                )}
                <span className="text-xs text-muted-foreground ml-2">
                  {new Date(mainComment.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <p className="text-md mb-4">{mainComment.content}</p>
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <div className={`flex items-center gap-1 ${mainComment.likedByMe ? 'text-red-500' : ''}`}>
                <Heart className={`w-4 h-4 ${mainComment.likedByMe ? 'fill-current' : ''}`} />
                <span>{mainComment.likeCount}</span>
              </div>
              <div className="flex items-center gap-1">
                <MessageCircle className="w-4 h-4" />
                <span>{mainComment.replyCount}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Input Section */}
        <div className="mb-8">
          <h3 className="font-bold mb-2 text-foreground">답글 작성</h3>
          <Input placeholder="댓글을 작성해주세요." className="h-12 bg-muted border-input mb-2 text-foreground" />
          <div className="flex justify-end gap-2">
            <Button variant="outline" className="px-6 hover:bg-accent hover:text-accent-foreground">
              취소
            </Button>
            <Button className="px-6">등록</Button>
          </div>
        </div>

        {/* Replies List */}
        <div className="space-y-6">
          <div className="flex items-center gap-2 mb-4">
            <span className="font-bold text-lg text-foreground">전체 답글</span>
            <span className="text-muted-foreground text-lg">{replies.length}</span>
          </div>

          {replies.map((reply) => (
            <div key={reply.commentId} className="flex gap-3">
              <Avatar className="w-10 h-10">
                <AvatarImage src={reply.authorThumbnailUrl} alt={reply.authorName} />
                <AvatarFallback>{reply.authorName[0]}</AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-sm text-foreground">{reply.authorName}</span>
                  <span className="text-xs text-muted-foreground">
                    {new Date(reply.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-sm py-1 text-foreground">{reply.content}</p>
                <div className="flex items-center gap-4 pt-1">
                  <button className={`flex items-center gap-1 text-xs ${reply.likedByMe ? 'text-red-500' : 'text-muted-foreground'}`}>
                    <Heart className={`w-3.5 h-3.5 ${reply.likedByMe ? 'fill-current' : ''}`} />
                    {reply.likeCount}
                  </button>
                  <button className="text-xs text-muted-foreground">
                    <MessageCircle className="w-3.5 h-3.5" />
                    {reply.replyCount > 0 && <span className="ml-1">{reply.replyCount}</span>}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const ArtistCommentDetailSkeleton = ({ onBack }: { onBack?: () => void }) => (
  <div className="w-full h-full bg-background pb-10">
    <header className="flex items-center p-4 border-b border-border">
      <ChevronLeft onClick={onBack} className="w-6 h-6 mr-2 cursor-pointer text-muted-foreground" />
      <Skeleton className="h-6 w-32" />
    </header>
    <div className="p-4 space-y-6">
      <Skeleton className="h-32 w-full rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-8 w-24" />
        <Skeleton className="h-12 w-full" />
      </div>
      {[...Array(3)].map((_, i) => (
        <div key={i} className="flex gap-3">
          <Skeleton className="h-10 w-10 rounded-full" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-16 w-full" />
          </div>
        </div>
      ))}
    </div>
  </div>
);
