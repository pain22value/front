"use client";

import { useAuthStore } from "@/features/auth/store/useAuthStore";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { REVIEW_POINTS } from "@/shared/constants/review";

export default function ShowReviewItem({ review }: { review: Review }) {
  const { user } = useAuthStore();
  // const isMyReview = user?.id === review.userId;
  const isMyReview = false;

  return (
    <div className="rounded-lg border bg-background p-6">
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <h3 className="font-semibold">{review.title}</h3>
          <p className="text-sm text-muted-foreground">{new Date(review.createdAt).toLocaleDateString()}</p>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-sm text-muted-foreground">{review.userNickname}</span>
          {isMyReview && (
            <Badge className="rounded-full border-teal-500 text-teal-600 bg-teal-50 hover:bg-teal-50 px-4! py-2!">
              내 관람평
            </Badge>
          )}
          <Button variant="outline" size="sm" className="rounded-full cursor-default">
            {review.positive ? "좋았어요" : "아쉬워요"}
          </Button>
          {isMyReview && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <MoreVertical className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>수정</DropdownMenuItem>
                <DropdownMenuItem className="text-destructive">삭제</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>

      <p className="mt-4 text-sm">{review.content}</p>

      {/* 포인트 배지 표시 */}
      {(review.charmPoints?.length > 0 || review.emotionPoints?.length > 0) && (
        <div className="mt-4 flex flex-wrap gap-2">
          {review.charmPoints?.map((point) => (
            <Badge key={`charm-${point}`} variant="secondary" className="rounded-md font-normal">
              #{REVIEW_POINTS[point]?.label || point}
            </Badge>
          ))}
          {review.emotionPoints?.map((point) => (
            <Badge key={`emotion-${point}`} variant="secondary" className="rounded-md font-normal">
              #{REVIEW_POINTS[point]?.label || point}
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
}
