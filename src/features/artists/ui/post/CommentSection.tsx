import { Button } from "@/components/ui/button";
import { artistComments, generalComments } from "@/shared/data/comments";
import CommentCard from "./CommentCard";

export default function CommentSection({ onCommentClick }: { onCommentClick?: () => void }) {
  return (
    <div className="max-w-[600px] mx-auto p-4 bg-background min-h-screen font-sans border-x border-border transition-colors">
      {/* --- 댓글 작성 섹션 --- */}
      <section className="mb-8 p-1">
        <h2 className="font-bold text-lg mb-4 text-foreground italic tracking-tight">댓글 작성</h2>
        <div className="space-y-4">
          <textarea
            placeholder="댓글을 작성해주세요."
            className="w-full min-h-[80px] p-4 rounded-lg border border-input bg-background focus:outline-none focus:ring-1 focus:ring-ring resize-none placeholder:text-muted-foreground text-foreground transition-all text-sm"
          />
          <div className="flex justify-end gap-2">
            <Button
              variant="outline"
              className="rounded-lg px-6 font-semibold h-10 text-sm hover:bg-accent transition-colors"
            >
              취소
            </Button>
            <Button className="rounded-lg px-6 font-semibold h-10 text-sm shadow-sm transition-all active:scale-95">
              등록
            </Button>
          </div>
        </div>
      </section>

      {/* --- 내 댓글 섹션 --- */}
      <section className="mb-8 p-1">
        <h3 className="font-bold mb-4 text-foreground text-[15px]">내 댓글</h3>
        <CommentCard comment={generalComments[0]} onClick={onCommentClick} />
      </section>

      {/* --- 아티스트 댓글 섹션 --- */}
      <section className="mb-8 p-1">
        <h3 className="font-bold mb-4 flex items-center gap-2 text-foreground text-[15px]">
          아티스트 댓글 <span className="text-muted-foreground font-medium text-xs">2</span>
        </h3>
        <div className="space-y-3">
          {artistComments.map((comment) => (
            <CommentCard key={comment.id} comment={comment} onClick={onCommentClick} />
          ))}
        </div>
      </section>

      {/* --- 전체 댓글 섹션 --- */}
      <section className="p-1">
        <h3 className="font-bold mb-4 flex items-center gap-2 text-foreground text-[15px]">
          전체 댓글 <span className="text-muted-foreground font-medium text-xs">12</span>
        </h3>
        <div className="space-y-3 pb-20">
          {generalComments.map((comment) => (
            <CommentCard key={comment.id} comment={comment} onClick={onCommentClick} />
          ))}
        </div>
      </section>
    </div>
  );
}
