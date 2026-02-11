"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertCircle, ChevronLeft, ChevronRight } from "lucide-react";
import { Users, TrendingUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import ShowReviewChart from "./ShowReviewChart";
import ShowReviewWriteCard from "./ShowReviewWriteCard";

type Review = {
  id: number;
  title: string;
  content: string;
  date: string;
  author: string;
  round: string;
  sentiment: "좋았어요" | "아쉬워요";
};

const REVIEWS: Review[] = Array.from({ length: 6 }).map((_, i) => ({
  id: i,
  title: "관람후기 제목",
  content: "관람후기",
  date: "2026.01.25",
  author: "김**",
  round: "2회차",
  sentiment: "좋았어요",
}));

export default function ShowReviews() {
  const [isWriting, setIsWriting] = useState(false);

  /*
    // [React Query 활용 가이드]
    // 1. 리뷰 목록 조회
    // const { data: reviews } = useQuery({
    //   queryKey: ["reviews", showId],
    //   queryFn: () => fetch(`/api/shows/${showId}/reviews`).then(res => res.json())
    // });
    //
    // 2. 리뷰 작성 (Mutation)
    // const queryClient = useQueryClient();
    // const { mutate } = useMutation({
    //   mutationFn: (newReview) => fetch("/api/reviews", { method: "POST", body: JSON.stringify(newReview) }),
    //   onSuccess: () => {
    //     queryClient.invalidateQueries(["reviews", showId]); // 목록 새로고침
    //     setIsWriting(false); // 작성 폼 닫기
    //   }
    // });
  */

  return (
    <section className="mx-auto max-w-4xl space-y-6">
      {/* 안내 문구 */}
      <Card className="bg-muted/50 border-none py-0!">
        <CardContent className="flex gap-3 p-6 text-sm text-muted-foreground">
          <div className="leading-relaxed">
            <div className="flex items-center gap-2 mb-2">
              <AlertCircle />
              <p className="font-semibold text-foreground ">꼭 읽어주세요.</p>
            </div>
            <p>게시판 운영 규정에 어긋난다고 판단되는 게시글은 사전 통보없이 블라인드 처리될 수 있습니다.</p>
            <p>
              특히 티켓 매매 및 양도의 글은 발견 즉시 임의 삭제되며 전화번호, 이메일 등의 개인정보는 악용될 우려가
              있으므로 게시를 삼가 주시기 바랍니다.
            </p>
            <p>
              사전 경고에도 불구하고 불량 게시물을 계속적으로 게재한 게시자의 경우 truve 관람후기 작성 권한이
              제한됩니다.
            </p>
          </div>
        </CardContent>
      </Card>

      <h2 className="text-2xl font-bold tracking-tight mt-10">관람후기</h2>
      <Separator className="h-1! bg-foreground" />

      {/* 메타 정보 */}
      <div className="flex items-center gap-8 text-muted-foreground">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
            <Users className="h-5 w-5" />
          </div>
          <span className="text-base font-medium text-foreground">뮤지컬 주간 3위</span>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
            <TrendingUp className="h-5 w-5" />
          </div>
          <span className="text-base font-medium text-foreground">truve 지수 98%</span>
        </div>
      </div>

      {/* 필터 + 버튼 */}
      <div className="flex items-center justify-end gap-4">
        <Select defaultValue="all">
          <SelectTrigger className="w-[120]">
            <SelectValue placeholder="전체보기" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">전체보기</SelectItem>
            <SelectItem value="good">좋았어요</SelectItem>
            <SelectItem value="bad">아쉬워요</SelectItem>
          </SelectContent>
        </Select>
        <Button onClick={() => setIsWriting(!isWriting)}>{isWriting ? "작성 취소" : "관람후기 작성"}</Button>
      </div>

      {/* 리뷰 작성 카드 */}
      {isWriting && <ShowReviewWriteCard />}

      {/* 리뷰 리스트 */}
      <div className="space-y-4">
        {REVIEWS.map((review) => (
          <div key={review.id} className="rounded-lg border bg-background p-6">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <h3 className="font-semibold">{review.title}</h3>
                <p className="text-sm text-muted-foreground">{review.date}</p>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-sm text-muted-foreground">
                  {review.author} | {review.round}
                </span>
                <Badge variant="outline">{review.sentiment}</Badge>
              </div>
            </div>

            <p className="mt-4 text-sm">{review.content}</p>
          </div>
        ))}
      </div>

      {/* 페이지네이션 */}
      <div className="flex items-center justify-end gap-2 pt-4">
        <Button variant="ghost" size="icon">
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <span className="text-sm text-muted-foreground">01 | 08</span>
        <Button variant="ghost" size="icon">
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      {/* 관람 포인트 */}
      <ShowReviewChart />
    </section>
  );
}
