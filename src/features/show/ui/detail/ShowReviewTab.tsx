"use client";

import { useState } from "react";
import { Separator } from "@/components/ui/separator";
import ShowReviewChart from "./ShowReviewChart";
import ShowReviewWriteCard from "./ShowReviewWriteCard";
import { useReviews } from "../../hooks/useReviews";
import ShowReviewNotice from "./ShowReviewNotice";
import ShowReviewMeta from "./ShowReviewMeta";
import ShowReviewItem from "./ShowReviewItem";
import ShowReviewPagination from "./ShowReviewPagination";
import ShowReviewFilter from "./ShowReviewFilter";

export default function ShowReviewTab() {
  const [isWriting, setIsWriting] = useState(false);
  const [page, setPage] = useState(1);
  const [sentimentFilter, setSentimentFilter] = useState("all"); // 'all', 'good', 'bad'

  const { data, status, error } = useReviews(page, sentimentFilter);

  const handleFilterChange = (value: string) => {
    setSentimentFilter(value);
    setPage(1); // Reset to first page on filter change
  };

  return (
    <section className="mx-auto max-w-4xl space-y-6">
      {/* 안내 문구 */}
      <ShowReviewNotice />

      {/* 메타 정보 */}
      <ShowReviewMeta />

      {/* 관람 포인트 */}
      <ShowReviewChart />

      <h2 className="text-2xl font-bold tracking-tight mt-10">관람평</h2>
      <Separator className="h-1! bg-foreground" />

      {/* 필터 */}
      <ShowReviewFilter
        isWriting={isWriting}
        sentimentFilter={sentimentFilter}
        onSentimentFilterChange={handleFilterChange}
        onWriteButtonClick={() => setIsWriting(!isWriting)}
      />

      {/* 리뷰 작성 카드 */}
      {isWriting && <ShowReviewWriteCard onWriteSuccess={() => setIsWriting(false)} />}

      {/* 리뷰 리스트 */}
      <div className="space-y-4">
        {status === "pending" ? (
          Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="rounded-lg border bg-background p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="space-y-2">
                  <div className="h-5 w-40 bg-muted rounded animate-pulse" />
                  <div className="h-4 w-24 bg-muted rounded animate-pulse" />
                </div>
                <div className="h-8 w-16 bg-muted rounded-full animate-pulse" />
              </div>
              <div className="space-y-2">
                <div className="h-4 w-full bg-muted rounded animate-pulse" />
                <div className="h-4 w-2/3 bg-muted rounded animate-pulse" />
              </div>
            </div>
          ))
        ) : status === "error" ? (
          <div className="py-10 text-center text-destructive">오류가 발생했습니다: {error?.message}</div>
        ) : data?.reviews && data.reviews.length > 0 ? (
          data.reviews.map((review) => <ShowReviewItem key={review.id} review={review} />)
        ) : (
          <div className="py-10 text-center text-muted-foreground">작성된 리뷰가 없습니다.</div>
        )}
      </div>

      {/* 페이지네이션 */}
      <ShowReviewPagination
        currentPage={data?.currentPage ?? 1}
        totalPages={data?.totalPages ?? 1}
        isLoading={status === "pending"}
        onPageChange={setPage}
      />
    </section>
  );
}
