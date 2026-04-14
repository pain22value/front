import { Button } from "@/components/ui/button";
import CommentCard from "./CommentCard";
import { useArtistComments } from "../../hooks/useArtistPostQuery";


export default function CommentSection({
  artistId,
  postId,
  onCommentClick,
}: {
  artistId: string | number;
  postId: number | null;
  onCommentClick?: () => void;
}) {
  const { data: allData, isLoading: isLoadingAll } = useArtistComments(artistId, postId, "ALL");
  const { data: mineData } = useArtistComments(artistId, postId, "MINE");
  const { data: artistData } = useArtistComments(artistId, postId, "ARTIST");

  if (!postId) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-muted-foreground p-8 text-center">
        <p>게시글을 선택하면 댓글을 볼 수 있습니다.</p>
      </div>
    );
  }

  if (isLoadingAll) {
    return <CommentSectionSkeleton />;
  }

  return (
    <div className="max-w-[600px] mx-auto p-4 bg-background min-h-screen font-sans transition-colors">
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
      {mineData?.comments && mineData.comments.length > 0 && (
        <section className="mb-8 p-1">
          <h3 className="font-bold mb-4 text-foreground text-[15px]">내 댓글</h3>
          <div className="space-y-3">
            {mineData.comments.map((comment) => (
              <CommentCard key={comment.commentId} comment={comment} onClick={onCommentClick} />
            ))}
          </div>
        </section>
      )}

      {/* --- 아티스트 댓글 섹션 --- */}
      {artistData?.comments && artistData.comments.length > 0 && (
        <section className="mb-8 p-1">
          <h3 className="font-bold mb-4 flex items-center gap-2 text-foreground text-[15px]">
            아티스트 댓글 <span className="text-muted-foreground font-medium text-xs font-sans italic tracking-tighter">{artistData.summary.artistCount}</span>
          </h3>
          <div className="space-y-3">
            {artistData.comments.map((comment) => (
              <CommentCard key={comment.commentId} comment={comment} onClick={onCommentClick} />
            ))}
          </div>
        </section>
      )}

      {/* --- 전체 댓글 섹션 --- */}
      <section className="p-1">
        <h3 className="font-bold mb-4 flex items-center gap-2 text-foreground text-[15px]">
          전체 댓글 <span className="text-muted-foreground font-medium text-xs font-sans italic tracking-tighter">{allData?.summary.totalCount || 0}</span>
        </h3>
        <div className="space-y-3 pb-20">
          {allData?.comments.map((comment) => (
            <CommentCard key={comment.commentId} comment={comment} onClick={onCommentClick} />
          ))}
          {allData?.comments.length === 0 && (
            <p className="text-center text-muted-foreground py-10 text-sm">첫 댓글을 남겨보세요!</p>
          )}
        </div>
      </section>
    </div>
  );
}

function CommentSectionSkeleton() {
  return (
    <div className="p-4 space-y-8 animate-pulse">
      <div className="space-y-4">
        <div className="h-6 w-32 bg-slate-100 rounded" />
        <div className="h-24 w-full bg-slate-100 rounded-lg" />
      </div>
      {[...Array(3)].map((_, i) => (
        <div key={i} className="space-y-4">
          <div className="h-5 w-24 bg-slate-100 rounded" />
          <div className="h-20 w-full bg-slate-100 rounded-lg" />
        </div>
      ))}
    </div>
  );
}
