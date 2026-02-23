"use client";

import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/shared/utils/cn";
import { toast } from "sonner";

const selectedStyle = "border-red-500 bg-red-50 text-red-500 hover:bg-red-50 hover:text-red-500";

interface ReviewData {
  sentiment: "good" | "bad";
  charmPoints: string[];
  emotionPoints: string[];
  content: string;
}

export default function ShowReviewWriteCard({ onWriteSuccess }: { onWriteSuccess?: () => void }) {
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

  const queryClient = useQueryClient();

  const { mutate: createReview, isPending } = useMutation<unknown, Error, ReviewData>({
    mutationFn: async (data) => {
      // 실제 API 호출
      // return await api.post(`/shows/${showId}/reviews`, data);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("리뷰 데이터 전송:", data);
    },
    onSuccess: () => {
      toast.success("리뷰가 성공적으로 등록되었습니다.");
      queryClient.invalidateQueries({ queryKey: ["reviews"] });
      setMode("done");
      onWriteSuccess?.();
    },
    onError: (error) => {
      console.error("리뷰 작성 실패:", error);
      toast.error(error.message || "리뷰 작성에 실패했습니다.");
    },
  });

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
    createReview({
      sentiment,
      charmPoints,
      emotionPoints,
      content,
    });
  };

  return (
    <section className="space-y-6">
      {mode === "write" ? (
        <Card className="bg-muted/40">
          <CardContent className="space-y-6 p-8">
            <div>
              <h3 className="text-lg font-semibold">뮤지컬 &lt;킹키부츠&gt; 어땠나요?</h3>
              <p className="text-sm text-muted-foreground">2026.01.25</p>
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
                <p className="text-sm text-muted-foreground">2026.01.25</p>
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
