import { Heart, MessageCircle, ChevronLeft } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useArtistComments } from "../../hooks/useArtistPostQuery";
import { Skeleton } from "@/components/ui/skeleton";

interface Reply {
  author: string;
  date: string;
  content: string;
  likes: number;
}

interface CommentData {
  totalCount: number;
  mainComment: {
    author: string;
    date: string;
    content: string;
    likes: number;
    comments: number;
  };
  replies: Reply[];
}

export default function ArtistCommentDetail({ onBack }: { onBack?: () => void }) {
  // 실제로는 현재 선택된 postId를 전달해야 합니다.
  const { data, isLoading } = useArtistComments(1);

  if (isLoading) {
    return <ArtistCommentDetailSkeleton onBack={onBack} />;
  }

  if (!data) return null;

  const { totalCount, mainComment, replies } = data as CommentData;

  return (
    <div className="w-full h-full bg-white dark:bg-slate-950 pb-10 transition-colors overflow-y-auto animate-in slide-in-from-right duration-300">
      {/* Header */}
      <header className="flex items-center p-4 border-b dark:border-slate-800">
        <ChevronLeft
          onClick={onBack}
          className="w-6 h-6 mr-2 cursor-pointer text-slate-900 dark:text-slate-100 hover:text-slate-600 dark:hover:text-slate-400 transition-colors"
        />
        <h1
          onClick={onBack}
          className="text-lg font-bold cursor-pointer text-slate-900 dark:text-slate-100 hover:text-slate-600 dark:hover:text-slate-400 transition-colors"
        >
          전체 댓글 보기
        </h1>
      </header>

      <div className="p-4">
        {/* Main Post/Comment */}
        <Card className="border-slate-200 shadow-sm mb-6">
          <CardHeader className="flex flex-row items-center space-x-3 p-4">
            <Avatar className="w-12 h-12">
              <AvatarImage src={`https://placehold.co/48x48`} alt={mainComment.author} />
              <AvatarFallback>{mainComment.author[0]}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <div className="flex items-center gap-1">
                <span className="font-bold">{mainComment.author}</span>
                <div className="w-4 h-4 bg-cyan-400 rounded-full flex items-center justify-center">
                  <span className="text-[10px] text-white">✓</span>
                </div>
                <span className="text-xs text-muted-foreground ml-2">{mainComment.date}</span>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <p className="text-md mb-4">{mainComment.content}</p>
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Heart className="w-4 h-4" />
                <span>{mainComment.likes}</span>
              </div>
              <div className="flex items-center gap-1">
                <MessageCircle className="w-4 h-4" />
                <span>{mainComment.comments}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Input Section */}
        <div className="mb-8">
          <h3 className="font-bold mb-2">답글 작성</h3>
          <Input placeholder="댓글을 작성해주세요." className="h-12 bg-slate-50 border-slate-200 mb-2" />
          <div className="flex justify-end gap-2">
            <Button variant="outline" className="px-6">
              취소
            </Button>
            <Button className="bg-slate-800 px-6">등록</Button>
          </div>
        </div>

        {/* Replies List */}
        <div className="space-y-6">
          <div className="flex items-center gap-2 mb-4">
            <span className="font-bold text-lg">전체 답글</span>
            <span className="text-slate-400 text-lg">{totalCount}</span>
          </div>

          {replies.map((reply: Reply, index: number) => (
            <div key={index} className="flex gap-3">
              <Avatar className="w-10 h-10">
                <AvatarImage src={`https://placehold.co/40x40`} />
                <AvatarFallback>{reply.author[0]}</AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-sm">{reply.author}</span>
                  <span className="text-xs text-muted-foreground">{reply.date}</span>
                </div>
                <p className="text-sm py-1">{reply.content}</p>
                <div className="flex items-center gap-4 pt-1">
                  <button className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Heart className="w-3.5 h-3.5" />
                    {reply.likes}
                  </button>
                  <button className="text-xs text-muted-foreground">
                    <MessageCircle className="w-3.5 h-3.5" />
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
  <div className="w-full h-full bg-white pb-10">
    <header className="flex items-center p-4 border-b">
      <ChevronLeft onClick={onBack} className="w-6 h-6 mr-2 cursor-pointer" />
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

