import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function ShowReviewPagination({
  currentPage,
  totalPages,
  onPageChange,
  isLoading = false,
}: {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  isLoading?: boolean;
}) {
  return (
    <div className="flex items-center justify-end gap-2 pt-4">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
        disabled={currentPage === 1 || isLoading}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>
      <span className="text-sm text-muted-foreground">
        {String(currentPage).padStart(2, "0")} | {String(totalPages).padStart(2, "0")}
      </span>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
        disabled={currentPage === totalPages || isLoading}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
}
