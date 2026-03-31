import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea"; // Input보다 Textarea가 더 적합할 수 있습니다.
import { artistComments, generalComments } from "@/shared/data/comments";
import { Heart, MessageCircle, CheckCircle2 } from "lucide-react";

export default function CommentSection() {
  return (
    <div className="max-w-[600px] mx-auto p-4 bg-white min-h-screen font-sans">
      {/* --- 댓글 작성 섹션 --- */}
      <section className="mb-8">
        <h2 className="font-bold text-lg mb-4 text-slate-900">댓글 작성</h2>
        <div className="space-y-4">
          <textarea
            placeholder="댓글을 작성해주세요."
            className="w-full min-h-[80px] p-4 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-200 resize-none placeholder:text-slate-400"
          />
          <div className="flex justify-end gap-2">
            <Button variant="outline" className="rounded-xl px-6 border-slate-300 font-semibold h-11">
              취소
            </Button>
            <Button className="rounded-xl px-6 bg-[#2D2F3A] hover:bg-[#1E1F26] font-semibold h-11">등록</Button>
          </div>
        </div>
      </section>

      {/* --- 내 댓글 섹션 --- */}
      <section className="mb-8">
        <h3 className="font-bold mb-3 text-slate-900">내 댓글</h3>
        <CommentCard comment={generalComments[0]} />
      </section>

      {/* --- 아티스트 댓글 섹션 --- */}
      <section className="mb-8">
        <h3 className="font-bold mb-3 flex items-center gap-2">
          아티스트 댓글 <span className="text-slate-400 font-medium">2</span>
        </h3>
        <div className="space-y-3">
          {artistComments.map((comment) => (
            <CommentCard key={comment.id} comment={comment} />
          ))}
        </div>
      </section>

      {/* --- 전체 댓글 섹션 --- */}
      <section>
        <h3 className="font-bold mb-3 flex items-center gap-2">
          전체 댓글 <span className="text-slate-400 font-medium">12</span>
        </h3>
        <div className="space-y-3">
          {generalComments.map((comment) => (
            <CommentCard key={comment.id} comment={comment} />
          ))}
        </div>
      </section>
    </div>
  );
}

// 개별 댓글 카드 컴포넌트
function CommentCard({ comment }: { comment: CommentData }) {
  return (
    <Card className="border-slate-200 shadow-none rounded-2xl">
      <CardContent className="p-5">
        <div className="flex gap-3">
          <Avatar className="w-12 h-12 border border-slate-100">
            {comment.avatarUrl ? (
              <AvatarImage src={comment.avatarUrl} />
            ) : (
              <div className="bg-slate-200 w-full h-full flex items-center justify-center">
                <span className="text-white text-xs">👤</span>
              </div>
            )}
            <AvatarFallback>{comment.author[0]}</AvatarFallback>
          </Avatar>

          <div className="flex-1 space-y-2">
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-[15px]">{comment.author}</span>
              {comment.isArtist && (
                <CheckCircle2 className="w-4 h-4 text-cyan-400 fill-current bg-white rounded-full" />
              )}
              <span className="text-slate-400 text-sm ml-1">{comment.date}</span>
            </div>

            <p className="text-[15px] leading-relaxed text-slate-800">
              {comment.mention && <span className="font-bold mr-1">@{comment.mention}</span>}
              {comment.content}
            </p>

            <div className="flex items-center gap-4 pt-1">
              <div className="flex items-center gap-1.5 text-slate-900 cursor-pointer">
                <Heart className="w-5 h-5" strokeWidth={1.5} />
                <span className="text-sm font-medium">{comment.likes}</span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-900 cursor-pointer">
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
