"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/shared/utils/cn";
import { toast } from "sonner";
import { usePostReview } from "../../hooks/useReviews";

const selectedStyle = "border-red-500 bg-red-50 text-red-500 hover:bg-red-50 hover:text-red-500";

export default function ShowReviewWriteCard({ showId, onWriteSuccess }: { showId: number; onWriteSuccess?: () => void }) {
  // 리뷰 작성 모드 상태 (작성 중 / 작성 완료)
  const [mode, setMode] = useState<"write" | "done">("write");
  // 만족도 상태 (좋았어요 / 별로에요)
  const [sentiment, setSentiment] = useState<"good" | "bad" | null>(null);
  // 매력 포인트 선택 상태 (분리됨)
  const [charmPoints, setCharmPoints] = useState<string[]>([]);
  // 감정 포인트 선택 상태 (분리됨)
  const [emotionPoints, setEmotionPoints] = useState<string[]>([]);
  // 리뷰 내용 상태
  const [content, setContent] = useState("");

  const { mutate: createReview, isPending } = usePostReview(showId);

  // 매력 포인트 토글 함수
  const toggleCharmPoint = (tag: string) => {
    setCharmPoints((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]));
  };

  // 감정 포인트 토글 함수
  const toggleEmotionPoint = (tag: string) => {
    setEmotionPoints((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]));
  };

  const submitReview = () => {
    if (!sentiment) {
      toast.warning("공연에 대한 만족도를 선택해주세요.");
      return;
    }
    if (!content) {
      toast.warning("관람 후기를 작성해주세요.");
      return;
    }
    createReview(
      {
        isPositive: sentiment === "good",
        charmPoints,
        emotionPoints,
        content,
      },
      {
        onSuccess: () => {
          toast.success("리뷰가 성공적으로 등록되었습니다.");
          setMode("done");
          onWriteSuccess?.();
        },
        onError: (error) => {
          console.error("리뷰 작성 실패:", error);
          toast.error(error.message || "리뷰 작성에 실패했습니다.");
        },
      }
    );
  };

  return (
    <section className="space-y-6">
      {mode === "write" ? (
        <Card className="bg-muted/40">
          <CardContent className="space-y-6 p-8">
            <div>
              <h3 className="text-lg font-semibold">어땠나요?</h3>
              <p className="text-sm text-muted-foreground">{new Date().toLocaleDateString()}</p>
            </div>

            {/* 만족도 선택 */}
            <div className="flex gap-4">
              <Button
                variant="outline"
                className={cn("flex-1 rounded-full", sentiment === "good" && selectedStyle)}
                onClick={() => setSentiment("good")}
              >
                좋았어요
              </Button>
              <Button
                variant="outline"
                className={cn("flex-1 rounded-full", sentiment === "bad" && selectedStyle)}
                onClick={() => setSentiment("bad")}
              >
                별로에요
              </Button>
            </div>

            {/* 매력포인트 */}
            <div className="space-y-3">
              <p className="font-medium">매력 포인트 (복수선택 가능)</p>
              <div className="flex flex-wrap gap-3">
                 {/* 여기는 원래 API에서 포인트를 받아오거나 해야하지만, Mocking 으로 임시 사용 하도록 유지합니다 (Swagger에 구체적인 리스트가 없음). */}
                 {/* Swagger 예시로는 "STAGE_PRODUCTION" 등이 있었으니, 라벨값으로 보내면 될 것입니다. */}
                 {/* 만약 서버가 영문을 요구한다면 mapping이 필요합니다, 우선은 라벨을 그대로 사용. */}
                {["몰입감", "연출", "스토리", "음악", "배우"].map((tag) => (
                  <Button
                    key={tag}
                    variant="outline"
                    size="sm"
                    className={cn("rounded-md", charmPoints.includes(tag) && selectedStyle)}
                    onClick={() => toggleCharmPoint(tag)}
                  >
                    {tag}
                  </Button>
                ))}
              </div>
            </div>

            {/* 감정포인트 */}
            <div className="space-y-3">
              <p className="font-medium">감정 포인트 (복수선택 가능)</p>
              <div className="flex flex-wrap gap-3">
                {["몰입감", "감동", "재미", "긴장감", "여운"].map((tag) => {
                  return (
                    <Button
                      key={tag}
                      variant="outline"
                      size="sm"
                      className={cn("rounded-md", emotionPoints.includes(tag) && selectedStyle)}
                      onClick={() => toggleEmotionPoint(tag)}
                    >
                      {tag}
                    </Button>
                  );
                })}
              </div>
            </div>

            {/* 후기 작성 */}
            <div className="space-y-2">
              <p className="font-medium">나의 관람후기</p>
              <Textarea
                placeholder="관람후기를 작성해주세요."
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </div>

            {/* 게시 버튼 */}
            <div className="flex justify-end">
              <Button onClick={submitReview} disabled={isPending}>
                {isPending ? "게시 중..." : "게시하기"}
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        /* 작성 완료 UI */
        <Card>
          <CardContent className="p-6 space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <h4 className="font-semibold">관람후기 제목</h4>
                <p className="text-sm text-muted-foreground">{new Date().toLocaleDateString()}</p>
              </div>

              <Badge variant="outline">{sentiment === "good" ? "좋았어요" : "별로에요"}</Badge>
            </div>

            <p className="text-sm">{content}</p>

            <div className="flex flex-wrap gap-2">
              {[...charmPoints, ...emotionPoints].map((tag, index) => (
                <Badge key={`${tag}-${index}`} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </section>
  );
}
