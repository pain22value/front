"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
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
  const { showId } = useParams();
  const [isWriting, setIsWriting] = useState(false);
  const [page, setPage] = useState(1);
  const [sentimentFilter, setSentimentFilter] = useState("all");

  const { data, status } = useReviews(Number(showId), page);

  const currentReviews = data?.content || [];

  const displayReviews = currentReviews
    .filter((review) => {
      if (sentimentFilter === "all") return true;
      if (sentimentFilter === "good") return review.positive === true;
      if (sentimentFilter === "bad") return review.positive === false;
      return true;
    })
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));

  const handleFilterChange = (value: string) => {
    setSentimentFilter(value);
    setPage(1);
  };

  return (
    <section className="mx-auto max-w-4xl space-y-10">
      <ShowReviewNotice />
      <ShowReviewMeta showId={Number(showId)} />
      <ShowReviewChart showId={Number(showId)} />

      <div className="space-y-3">
        <h2 className="text-2xl font-bold tracking-tight ">관람평</h2>
        <Separator className="h-1! bg-foreground" />
        <ShowReviewFilter
          isWriting={isWriting}
          sentimentFilter={sentimentFilter}
          onSentimentFilterChange={handleFilterChange}
          onWriteButtonClick={() => setIsWriting(!isWriting)}
        />
        {isWriting && (
          <ShowReviewWriteCard
            showId={Number(showId)}
            onWriteSuccess={() => {
              setIsWriting(false);
              setPage(1);
            }}
          />
        )}

        {/* 리뷰 리스트 */}
        <div className="mt-5 space-y-4">
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
          ) : displayReviews.length > 0 ? (
            displayReviews.map((review: Review) => <ShowReviewItem key={review.reviewId} review={review} />)
          ) : (
            <div className="py-10 text-center text-muted-foreground">작성된 리뷰가 없습니다.</div>
          )}
        </div>
        <ShowReviewPagination
          currentPage={data?.page ?? 1}
          totalPages={data?.totalPages ?? 1}
          isLoading={status === "pending"}
          onPageChange={setPage}
        />
      </div>
    </section>
  );
}
