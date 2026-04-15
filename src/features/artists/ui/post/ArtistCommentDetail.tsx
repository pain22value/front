"use client";

import { useState } from "react";
import { Heart, MessageCircle, ChevronLeft } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useArtistComments } from "../../hooks/useArtistPostQuery";
import { useCreateArtistReply } from "../../hooks/useArtistPostMutations";
import { Skeleton } from "@/components/ui/skeleton";
import ArtistCheckIcon from "./ArtistCheckIcon";

export default function ArtistCommentDetail({
  artistId,
  postId,
  commentId,
  onBack,
}: {
  artistId: string | number;
  postId: number | null;
  commentId: number | null;
  onBack?: () => void;
}) {
  const [replyContent, setReplyContent] = useState("");
  const { data, isLoading } = useArtistComments(artistId, postId, "ALL");
  const { mutate: createReply, isPending } = useCreateArtistReply(commentId!);

  // commentId에 해당하는 댓글을 메인으로 찾기
  const mainComment = data?.comments.find((c) => c.commentId === commentId) ?? data?.comments[0] ?? null;
  const replies = mainComment?.replies ?? [];

  const handleSubmitReply = () => {
    if (!replyContent.trim() || isPending || !commentId) return;
    createReply(replyContent, {
      onSuccess: () => {
        setReplyContent("");
      },
    });
  };

  const handleCancel = () => {
    setReplyContent("");
  };

  if (isLoading) {
    return <ArtistCommentDetailSkeleton onBack={onBack} />;
  }

  if (!mainComment) {
    return (
      <div className="w-full h-full bg-background pb-10">
        <header className="flex items-center p-4 border-b border-border">
          <ChevronLeft onClick={onBack} className="w-6 h-6 mr-2 cursor-pointer text-foreground" />
          <h1 className="text-lg font-bold">댓글 상세</h1>
        </header>
        <div className="p-8 text-center text-muted-foreground">댓글 정보를 불러올 수 없습니다.</div>
      </div>
    );
  }

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
          댓글 상세
        </h1>
      </header>

      <div className="p-4">
        {/* 메인 댓글 */}
        <Card className="border-border border-none shadow-sm mb-6 bg-card text-card-foreground">
          <CardHeader className="flex flex-row items-center space-x-3 p-4">
            <Avatar className="w-12 h-12">
              <AvatarFallback>{mainComment.authorName[0]}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <div className="flex items-center gap-1">
                <span className="font-bold">{mainComment.authorName}</span>
                {mainComment.isArtist && <ArtistCheckIcon />}
                <span className="text-xs text-muted-foreground ml-2">
                  {new Date(mainComment.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <p className="text-md mb-4">{mainComment.content}</p>
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <ToggleLike initialLiked={mainComment.likedByMe} initialCount={mainComment.likeCount} />
              <div className="flex items-center gap-1">
                <MessageCircle className="w-4 h-4" />
                <span>{mainComment.replyCount}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 답글 작성 */}
        <div className="mb-8">
          <h3 className="font-bold mb-2 text-foreground">답글 작성</h3>
          <Input
            value={replyContent}
            onChange={(e) => setReplyContent(e.target.value)}
            placeholder="답글을 작성해주세요."
            className="h-12 bg-muted border-input mb-2 text-foreground"
          />
          <div className="flex justify-end gap-2">
            <Button
              variant="outline"
              onClick={handleCancel}
              disabled={!replyContent.trim() || isPending}
              className="px-6 hover:bg-accent hover:text-accent-foreground"
            >
              취소
            </Button>
            <Button onClick={handleSubmitReply} disabled={!replyContent.trim() || isPending} className="px-6">
              {isPending ? "등록 중..." : "등록"}
            </Button>
          </div>
        </div>

        {/* 답글 목록 */}
        <div className="space-y-6">
          <div className="flex items-center gap-2 mb-4">
            <span className="font-bold text-lg text-foreground">전체 답글</span>
            <span className="text-muted-foreground text-lg">{replies.length}</span>
          </div>

          {replies.length === 0 && (
            <p className="text-center text-muted-foreground py-10 text-sm">첫 답글을 남겨보세요!</p>
          )}

          {replies.map((reply) => (
            <div key={reply.commentId} className="flex gap-3">
              <Avatar className="w-10 h-10">
                <AvatarFallback>{reply.authorName[0]}</AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-sm text-foreground">{reply.authorName}</span>
                  {reply.isArtist && <ArtistCheckIcon />}
                  <span className="text-xs text-muted-foreground">
                    {new Date(reply.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-sm py-1 text-foreground">{reply.content}</p>
                <div className="flex items-center gap-4 pt-1">
                  <ToggleLike
                    initialLiked={reply.likedByMe}
                    initialCount={reply.likeCount}
                    size="w-3.5 h-3.5"
                    textClass="text-xs"
                  />
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

function ToggleLike({
  initialLiked,
  initialCount,
  size = "w-4 h-4",
  textClass = "text-sm",
}: {
  initialLiked: boolean;
  initialCount: number;
  size?: string;
  textClass?: string;
}) {
  const [liked, setLiked] = useState(initialLiked);
  const [count, setCount] = useState(initialCount);

  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        const newLiked = !liked;
        setLiked(newLiked);
        setCount((prev) => (newLiked ? prev + 1 : prev - 1));
      }}
      className={`flex items-center gap-1 ${textClass} hover:text-red-500 transition-colors ${liked ? "text-red-500" : "text-muted-foreground"}`}
    >
      <Heart className={`${size} ${liked ? "fill-current" : ""}`} />
      <span>{count}</span>
    </button>
  );
}
