"use client";

// import { useAuthStore } from "@/features/auth/store/useAuthStore";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ShowReviewItem({ review }: { review: Review }) {
  // const user = useAuthStore((state) => state.user);
  // const isMyReview = user?.id === review.userId;
  const isMyReview = null;

  return (
    <div className="rounded-lg border bg-background p-6">
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <h3 className="font-semibold">{review.title}</h3>
          <p className="text-sm text-muted-foreground">{review.date}</p>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-sm text-muted-foreground">
            {review.author} {review.round && `| ${review.round}`}
          </span>
          {isMyReview && (
            <Badge className="rounded-full border-teal-500 text-teal-600 bg-teal-50 hover:bg-teal-50 px-4! py-2!">
              내 관람평
            </Badge>
          )}
          <Button variant="outline" size="sm" className="rounded-full">
            {review.sentiment}
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
    </div>
  );
}
