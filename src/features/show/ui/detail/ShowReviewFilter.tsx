import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function ShowReviewFilter({
  isWriting,
  sentimentFilter,
  onSentimentFilterChange,
  onWriteButtonClick,
}: {
  isWriting: boolean;
  sentimentFilter: string;
  onSentimentFilterChange: (value: string) => void;
  onWriteButtonClick: () => void;
}) {
  return (
    <div className="flex items-center justify-end gap-4">
      <Select value={sentimentFilter} onValueChange={onSentimentFilterChange}>
        <SelectTrigger className="w-[120]">
          <SelectValue placeholder="전체보기" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">전체보기</SelectItem>
          <SelectItem value="good">좋았어요</SelectItem>
          <SelectItem value="bad">아쉬워요</SelectItem>
        </SelectContent>
      </Select>
      <Button onClick={onWriteButtonClick}>{isWriting ? "작성 취소" : "관람평 작성"}</Button>
    </div>
  );
}
