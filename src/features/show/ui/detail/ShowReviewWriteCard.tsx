"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { cn } from "@/shared/utils/cn";
import { toast } from "sonner";
import { usePostReview } from "../../hooks/useReviews";
import { useReviewForm } from "../../hooks/useReviewForm";
import { CHARM_POINTS, EMOTION_POINTS } from "../../../../shared/constants/review";

const selectedStyle = "border-red-500 bg-red-50 text-red-500 hover:bg-red-50 hover:text-red-500";

export default function ShowReviewWriteCard({
  showId,
  onWriteSuccess,
}: {
  showId: number;
  onWriteSuccess?: () => void;
}) {
  const [mode, setMode] = useState<"write" | "done">("write");
  const {
    sentiment,
    setSentiment,
    charmPoints,
    toggleCharmPoint,
    emotionPoints,
    toggleEmotionPoint,
    title,
    setTitle,
    content,
    setContent,
  } = useReviewForm();

  const { mutate: createReview, isPending } = usePostReview(showId);

  const submitReview = () => {
    if (!sentiment) {
      toast.warning("공연에 대한 만족도를 선택해주세요.");
      return;
    }
    if (!title) {
      toast.warning("제목을 입력해주세요.");
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
        title,
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
      },
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
                {CHARM_POINTS.map((point) => (
                  <Button
                    key={point.value}
                    variant="outline"
                    size="sm"
                    className={cn("rounded-md", charmPoints.includes(point.value) && selectedStyle)}
                    onClick={() => toggleCharmPoint(point.value)}
                  >
                    {point.label}
                  </Button>
                ))}
              </div>
            </div>

            {/* 감정포인트 */}
            <div className="space-y-3">
              <p className="font-medium">감정 포인트 (복수선택 가능)</p>
              <div className="flex flex-wrap gap-3">
                {EMOTION_POINTS.map((point) => {
                  return (
                    <Button
                      key={point.value}
                      variant="outline"
                      size="sm"
                      className={cn("rounded-md", emotionPoints.includes(point.value) && selectedStyle)}
                      onClick={() => toggleEmotionPoint(point.value)}
                    >
                      {point.label}
                    </Button>
                  );
                })}
              </div>
            </div>

            {/* 후기 제목 및 작성 */}
            <div className="space-y-4">
              <div className="space-y-2">
                <p className="font-medium">제목</p>
                <Input placeholder="제목을 입력해주세요." value={title} onChange={(e) => setTitle(e.target.value)} />
              </div>
              <div className="space-y-2">
                <p className="font-medium">나의 관람후기</p>
                <Textarea
                  placeholder="관람후기를 작성해주세요."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="min-h-[120px]"
                />
              </div>
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
                <h4 className="font-semibold">{title}</h4>
                <p className="text-sm text-muted-foreground">{new Date().toLocaleDateString()}</p>
              </div>

              <Badge variant="outline">{sentiment === "good" ? "좋았어요" : "별로에요"}</Badge>
            </div>

            <p className="text-sm">{content}</p>

            <div className="flex flex-wrap gap-2">
              {charmPoints.map((point) => (
                <Badge key={`charm-${point}`} variant="secondary">
                  {CHARM_POINTS.find((p) => p.value === point)?.label || point}
                </Badge>
              ))}
              {emotionPoints.map((point) => (
                <Badge key={`emotion-${point}`} variant="secondary">
                  {EMOTION_POINTS.find((p) => p.value === point)?.label || point}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </section>
  );
}
