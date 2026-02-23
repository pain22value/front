import { Users, TrendingUp } from "lucide-react";

export default function ShowReviewMeta() {
  return (
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
  );
}
